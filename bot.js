const { Telegraf, Markup, session } = require("telegraf");
const path = require("path");
require('dotenv').config();
const { Pool } = require("pg");

// --- PostgreSQL ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// --- Telegram Bot ---
const bot = new Telegraf(process.env.BOT_TOKEN);
const channelId = process.env.CHANNEL_ID;
const ADMIN_ID = 7292502498;

// --- Глобальний стан для тесту ---
const globalState = { pendingResultMessage: null };

// --- Створення таблиці users ---
const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT PRIMARY KEY
    );
  `);
  console.log("Таблиця users готова ✅");
};

// --- Меню та хендлери ---
const mainMenu = require("./commands/mainMenu");
const registerTestHandlers = require("./commands/test");
const registerInfoSchoolHandlers = require("./commands/info");
const registerEducationMenuHandlers = require("./commands/courses");
const registerRequestHandlers = require("./commands/request");

// --- Викладачі ---
const teachers = {
  'Олександр': { photo: path.join(__dirname, 'pictures', 'Oleksandr.jpeg'), description: '...' },
  'Олександра': { photo: path.join(__dirname, 'pictures', 'Oleksandra.jpeg'), description: '...' },
  'Анна': { photo: path.join(__dirname, 'pictures', 'Anna.jpeg'), description: '...' },
  'Марія Г': { photo: path.join(__dirname, 'pictures', 'Maria.jpeg'), description: '...' },
  'Анастасія': { photo: path.join(__dirname, 'pictures', 'Anastasia.jpeg'), description: '...' },
  'Катерина': { photo: path.join(__dirname, 'pictures', 'Kateryna.jpg'), description: '...' },
  'Марія С': { photo: path.join(__dirname, 'pictures', 'MariiaS.jpeg'), description: '...' },
  'Олена': { photo: path.join(__dirname, 'pictures', 'Lena.jpeg'), description: '...' },
  'Susana': { photo: path.join(__dirname, 'pictures', 'Susana.jpeg'), description: '...' },
};

// --- Middleware ---
bot.use(session({
  getSessionKey: (ctx) => ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`,
}));

// --- Тестове повідомлення в канал ---
bot.command("test_channel", async (ctx) => {
  try {
    await bot.telegram.sendMessage(channelId, "Тестове повідомлення в канал");
    ctx.reply("Повідомлення надіслано в канал.");
  } catch (error) {
    console.error("Помилка при відправці:", error);
    ctx.reply("Не вдалося надіслати повідомлення в канал.");
  }
});

// --- Викладачі ---
const chunkArray = (arr, chunkSize) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) result.push(arr.slice(i, i + chunkSize));
  return result;
};

bot.hears("Наші викладачі 👩‍🏫", (ctx) => {
  ctx.reply(
    "👩‍🏫 Наші викладачі - це професіонали. Оберіть викладача:",
    Markup.keyboard([...chunkArray(Object.keys(teachers), 2), ['Головне меню 🔙']]).resize()
  );
});

Object.keys(teachers).forEach(name => {
  bot.hears(name, (ctx) => {
    const teacher = teachers[name];
    ctx.replyWithPhoto({ source: teacher.photo }, {
      caption: teacher.description,
      reply_markup: Markup.keyboard([...Object.keys(teachers).map(n => [n]), ["Головне меню 🔙"]]).resize()
    });
  });
});

// --- Контакти та адміністратор ---
bot.hears("Написати адміністратору 📨", (ctx) => {
  ctx.reply("💬 Якщо у вас є запитання, напишіть менеджеру: @espacioescuela");
});
bot.hears("Наші контакти 📞", (ctx) => {
  ctx.reply("📞 Наші контакти:\n🌐 di-espacio.com\n📧 espacio.school@gmail.com\nhttps://t.me/espacioescuela");
});
bot.hears("Головне меню 🔙", (ctx) => {
  ctx.reply("Ви повернулися в головне меню. Оберіть опцію:", mainMenu());
});

// --- Обробник контакту з результатом тесту ---
bot.on("contact", (ctx) => {
  const contact = ctx.message.contact;
  ctx.telegram.sendMessage(
    ADMIN_ID,
    `Новий контакт з тесту:\nІм'я: ${contact.first_name}\nТелефон: ${contact.phone_number}\nUsername: @${ctx.from.username || "немає"}`
  );
  if (globalState.pendingResultMessage) {
    ctx.reply(globalState.pendingResultMessage).then(() => {
      globalState.pendingResultMessage = null;
      ctx.reply("Дякуємо! Адміністратор скоро зв'яжеться з вами 🙌", Markup.keyboard([["Головне меню 🔙"]]).resize());
    });
  } else {
    ctx.reply("Дякуємо! Адміністратор скоро зв'яжеться з вами 🙌", Markup.keyboard([["Головне меню 🔙"]]).resize());
  }
});

// --- Підключення модулів ---
require("./commands/start")(bot, pool);
registerInfoSchoolHandlers(bot);
registerEducationMenuHandlers(bot);
registerTestHandlers(bot, globalState);
registerRequestHandlers(bot);

// --- Меню /menu ---
const createMainMenuKeyboard = () => Markup.keyboard([["Перезагрузить 🔄"]]).resize();
bot.command("menu", (ctx) => ctx.reply("Головне меню:", createMainMenuKeyboard()));
bot.hears("Перезагрузить 🔄", (ctx) => {
  ctx.reply("Перезавантажую меню...");
  ctx.reply("Ви повернулися в головне меню. Оберіть опцію:", createMainMenuKeyboard());
});

// --- Запуск ---
(async () => {
  await createTable();
  bot.launch();
  console.log("Бот запущено 🚀");
})();

module.exports = { pool, bot, createTable };
