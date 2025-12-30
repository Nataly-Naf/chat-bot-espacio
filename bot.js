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
// const path = require('path');

const teachers = {
  'Олександр': {
    photo: path.join(__dirname, 'pictures', 'Oleksandr.jpeg'),
    description: 'Я професійний викладач англійської та іспанської мов із 7-річним досвідом, здебільшого працюю онлайн. Проводжу різноманітні курси для учнів різного віку, використовуючи сучасні комунікативні методики, орієнтовані на результат.'
  },
  'Олександра': {
    photo: path.join(__dirname, 'pictures', 'Oleksandra.jpeg'),
    description: 'Викладаю іспанську з 2014 року. Працюю як із дітьми, так і з дорослими. Завжди намагаюсь створювати гарний настрій на уроці, і вважаю, що основою гарного навчання є задоволення від процесу.'
  },
  'Анна': {
    photo: path.join(__dirname, 'pictures', 'Anna.jpeg'),
    description: 'Закінчила Харківський національний педагогічний університет ім. Сковороди, факультет іноземної філології. Досвід викладання — 8 років. Люблю іноземні мови з дитинства, і в іспанську мову закохалася з перших слів. Рада, що моя професія пов\'язана саме з викладанням цієї неймовірно гарної мови. Колись, випадково обравши іспанську, я зробила правильний вибір. Моя робота приносить мені задоволення. Обожнюю навчати людей, особливо відкривати для них світ іспанської мови та культури. Люблю іспанську музику, фільми та серіали, кухню та стиль життя ❤️.'
  },
  'Марія Г': {
    photo: path.join(__dirname, 'pictures', 'Maria.jpeg'),
    description: 'Мене звати Марія. Вивчаю іспанську понад 15 років, а навчаю 4. Люблю подорожі, фотографувати на плівку та спостерігати за результатами моїх учнів.'
  },
  'Анастасія': {
    photo: path.join(__dirname, 'pictures', 'Anastasia.jpeg'),
    description: '¡Hola, soy Anastasia! Маю багатий досвід викладання іспанської мови та любов до цієї культури. Навчання для мене — це не лише передача знань, а й можливість розділити свою любов до мови та традицій Іспанії. Індивідуально підходжу до кожного учня, щоб заняття були максимально ефективними та цікавими. Радію можливості допомагати вам на шляху до вільного володіння іспанською!'
  },
  'Катерина': {
    photo: path.join(__dirname, 'pictures', 'Kateryna.jpg'),
    description: 'Hola, amig@s! Soy Kateryna de la hermosa ciudad de Odesa. Я викладаю іспанську мову й закохую у неї своїх учнів, тому що для мене іспанська стала для не просто мовою, а частиною життя. Моя мета - показати, що вчитися можна легко та з любовʼю 🤍'
  },
  'Марія С': {
    photo: path.join(__dirname, 'pictures', 'MariiaS.jpeg'),
    description: 'Привіт! 😊 Мене звати Марія, і я викладач іспанської. Я люблю досліджувати мови і моя ціль — допомагати студентам вивчати іспанську легко та зрозуміло. На моїх уроках багато практики, живих прикладів і трохи гумору – бо вивчати мову має бути цікаво! Я пояснюю все просто, без складних правил, щоби у тебе почалося заговорити вже з першого заняття. Головне — дисциплінована практика, впевненість і дрібка терпіння, а я допоможу тобі заговорити без страху і з задоволенням! Хочеш вивчати іспанську легко і з користю? Тоді запрошую тебе на мої уроки! ✨💡'
  },
  'Олена': {
    photo: path.join(__dirname, 'pictures', 'Lena.jpeg'),
    description: '¡Hola! Me llamo Olena. Soy de Ucrania, pero llevo 9 años viviendo en España. В Мадриді, в Universidad Carlos III (UC3M), зробила свій магістерський та докторський ступінь у соціальних науках. Наразі працюю в університеті як дослідниця та викладачка, даю заняття іспанською та англійською. У 2019 отримала сертифікат DELE B2, а в 2023 — C1 Escuela Oficial de Idiomas.'
  },
  'Susana': {
    photo: path.join(__dirname, 'pictures', 'Susana.jpeg'),
    description: 'Soy Susi, profesora de español e inglés, nacida en Colombia y actualmente viviendo en España. El español es mi lengua materna y enseñar es mi gran pasión. Disfruto cada momento de guiar a mis estudiantes en su camino hacia la fluidez. Además, me encanta viajar y explorar nuevas culturas, lo que enriquece mi forma de enseñar con historias y perspectivas del mundo.'
  }
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
