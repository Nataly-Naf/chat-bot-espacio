// const { Telegraf } = require("telegraf");
//  https://t.me/espacioescuela_bot
// const bot = new Telegraf("7788598442:AAHv6stx2aDV-zyyeAkIA7ZbAMnyN56kKRM");
// const channelId = "-4539289526"; // Заміни на ID твого каналу

const { Telegraf, Markup, session } = require("telegraf");
const config = require("./config");
const registerTestHandlers = require("./commands/test");
const registerInfoSchoolHandlers = require("./commands/info");
const mainMenu = require("./commands/mainMenu");
const registerEducationMenuHandlers = require("./commands/courses"); 
const registerContactManagerHandlers = require("./commands/manager"); 
const registerRequestHandlers = require("./commands/request"); 


const bot = new Telegraf(config.BOT_TOKEN);
const channelId = config.CHANNEL_ID;

bot.use(
  session({
    getSessionKey: (ctx) => ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`,
  })
);

// Підключення сесії


bot.command("test_channel", async (ctx) => {
  console.log("Команда /test_channel отримана");

  try {
    await bot.telegram.sendMessage(channelId, "Тестове повідомлення в канал");
    ctx.reply("Повідомлення надіслано в канал.");
  } catch (error) {
    console.error("Помилка під час відправки тестового повідомлення в канал:", error);
    ctx.reply("Не вдалося надіслати повідомлення в канал.");
  }
});
bot.hears("Наші викладачі 👩‍🏫", (ctx) => {
  ctx.reply("👩‍🏫 Наші викладачі - це професіонали з багаторічним досвідом...");
});

bot.hears("Отримати бонус 🎁", (ctx) => {
  ctx.reply("🎁 Ви отримаєте бонусний матеріал після першого уроку!");
});


// bot.hears("Хочу навчатись 👨‍🎓", (ctx) => {
//   ctx.reply(
//     "📋 *Будь ласка, залиште свою заявку у такому форматі:* \n\n" +
//     "1️⃣ *Ім'я*\n" +
//     "2️⃣ *Ваш контакт в телеграмі (або інший контакт для зв'язку)*\n" +
//     "3️⃣ *Коментар* _(за бажанням)_\n\n" +
//     "📞 Наш менеджер зв'яжеться з вами найближчим часом!",
//     { parse_mode: "Markdown" }
//   );

//   // Ініціалізація сесії, якщо її ще немає
//   if (!ctx.session) ctx.session = {};

//   // Встановлюємо стан сесії
//   ctx.session.state = "awaiting_application";
//   console.log(ctx.session.state);
//   console.log(ctx.message.text);


// });

// bot.hears(/.+/, async (ctx) => { // Використовуємо регулярний вираз для будь-якого тексту
//   console.log("Обробка тексту");

//   // Обробляємо заявку, тільки якщо стан сесії - "awaiting_application"
//   if (ctx.session.state === "awaiting_application") {
//     const application = ctx.message.text;
//     console.log(`Заявка: ${application}`);

//     try {
//       await bot.telegram.sendMessage(channelId, `Нова заявка:\n${application}`);
//       ctx.reply("Дякуємо! Ваша заявка надіслана.", mainMenu());
//     } catch (error) {
//       console.error("Помилка надсилання заявки до каналу:", error);
//       ctx.reply("Сталася помилка при надсиланні заявки. Спробуйте ще раз.");
//     }

//     // Скидаємо стан сесії після обробки заявки
//     ctx.session.state = null;
//     console.log("Стан сесії скинутий після заявки");
//   } else {
//     console.log("Стан сесії не 'awaiting_application'. Виконується інша дія.");
//     ctx.reply("Ви зараз не надсилаєте заявку. Натисніть відповідну кнопку, щоб почати.");
//   }
// });





bot.hears("Написати адміністратору 📨", (ctx) => {
  console.log("Обробник для 'Зв'язатися з менеджером' спрацював");
  ctx.reply("💬 Якщо у вас є запитання, ви можете зв'язатися з нашим менеджером у чаті @espacioescuela (https://t.me/espacioescuela).");
});

bot.hears("Наші контакти 📞", (ctx) => {
  ctx.reply("📞 Наші контакти:\nТелефон: +380123456789\nEmail: contacto@espacio.com");
});


require("./commands/start")(bot);
registerInfoSchoolHandlers(bot);
registerEducationMenuHandlers(bot); 
registerTestHandlers(bot);

registerRequestHandlers(bot);







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


// bot.hears("Про школу 🏫", (ctx) => {
//   ctx.reply("🏫 Наша школа пропонує сучасні методики навчання...");
// });

// bot.hears("Про навчання 📖", (ctx) => {
//   ctx.reply("📖 Програми навчання адаптовані до ваших потреб...");
// });


// bot.hears("Дізнатися свій рівень 📊", (ctx) => {
//   ctx.reply("📖 Програми навчання адаптовані до ваших потреб...");
// });






// bot.hears("Зв'язатися з менеджером 📨", (ctx) => {
//   console.log("pushed")
//   ctx.reply(
//     "💬 Якщо у вас є запитання, ви можете зв'язатися з нашим менеджером у чаті @espacioescuela (https://t.me/espacioescuela)."
//   );
// });
// bot.hears("Головне меню 🔙", (ctx) => {
//   ctx.reply(
//     "Ви повернулися в головне меню. Оберіть опцію:",
//     mainMenuKeyboard 
//   );
// });
bot.hears("Головне меню 🔙", (ctx) => {
  ctx.reply(
    "Ви повернулися в головне меню. Оберіть опцію:",
    mainMenu() // Використовуємо функцію mainMenu()
  );
});



bot.launch();
console.log("Бот запущен");

