// const { Telegraf } = require("telegraf");
// https://t.me/espacioescuela_bot
// const bot = new Telegraf("7788598442:AAHv6stx2aDV-zyyeAkIA7ZbAMnyN56kKRM");
// const channelId = "-4539289526"; // Заміни на ID твого каналу

const { Telegraf, Markup, session } = require("telegraf");
const config = require("./config");
const registerTestHandlers = require("./commands/test");
const registerInfoSchoolHandlers = require("./commands/info");
const mainMenu = require("./commands/mainMenu");
const { handleEducation, handleCourses } = require("./commands/courses");

const bot = new Telegraf(config.BOT_TOKEN);
const channelId = config.CHANNEL_ID;
// Підключення сесії
bot.use(
  session({
    getSessionKey: (ctx) => ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`,
  })
);

require("./commands/start")(bot);
registerTestHandlers(bot);
registerInfoSchoolHandlers(bot);

// Функция для создания основного меню с кнопкой "Перезагрузить"
const createMainMenuKeyboard = () => {
  return Markup.keyboard([
    ["Перезагрузить 🔄"], // Кнопка для перезагрузки
  ]).resize();
};

// Обработка команды /menu для отображения основного меню с кнопкой
bot.command("menu", (ctx) => {
  ctx.reply("Головне меню:", createMainMenuKeyboard());
});

// Обработка нажатия на кнопку "Перезагрузить 🔄"
bot.hears("Перезагрузить 🔄", (ctx) => {
  ctx.reply("Перезавантажую меню...");
  ctx.reply("Ви повернулися в головне меню. Оберіть опцію:", createMainMenuKeyboard());
});

// Обробка вибору "Записатися на консультацію"
bot.hears("Зв´язатися з менеджером 📨", (ctx) => {
  ctx.reply(
    "💬 Якщо у вас є запитання, ви можете зв'язатися з нашим менеджером у чаті @espacioescuela (https://t.me/espacioescuela)."
  );
});
bot.hears("Головне меню 🔙", (ctx) => {
  ctx.reply(
    "Ви повернулися в головне меню. Оберіть опцію:",
    mainMenuKeyboard // переключаемся обратно на главное меню
  );
});
bot.hears("Про навчання 📖", handleEducation);
bot.hears("Курси 📚", handleCourses);
// bot.on("text", (ctx) => {
//   if (ctx.session && ctx.session.state === "awaiting_application") {
//     const application = ctx.message.text;
//     bot.telegram.sendMessage(channelId, `Заявка на консультацію:\n${application}`);
//     ctx.reply("Дякуємо! Ваша заявка надіслана.");
//     ctx.session.state = null;
//   }
// });

bot.hears("Хочу навчатись 👨‍🎓", (ctx) => {
  ctx.reply(
    "📋 *Будь ласка, залиште свою заявку у такому форматі:* \n\n" +
      "1️⃣ *Ім'я*\n" +
      "2️⃣ *Ваш контакт в телеграмі (або інший контакт для зв'язку)*\n" +
      "3️⃣ *Коментар* _(за бажанням)_\n\n" +
      "📞 Наш менеджер зв'яжеться з вами найближчим часом!",
    { parse_mode: "Markdown" }
  );

  if (!ctx.session) ctx.session = {};
  ctx.session.state = "awaiting_application";
});

bot.on("text", (ctx) => {
  if (ctx.session && ctx.session.state === "awaiting_application") {
    const application = ctx.message.text;
    bot.telegram.sendMessage(channelId, `Нова заявка:\n${application}`);
    ctx.reply("Дякуємо! Ваша заявка надіслана.", mainMenu());
    ctx.session.state = null;
  }
});

// Запуск бота
bot.launch();
console.log("Бот запущен");
