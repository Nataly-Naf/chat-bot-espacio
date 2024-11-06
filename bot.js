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
const path = require('path');

const teachers = {
  'Олександр': {
    photo: path.join(__dirname, 'pictures', 'Oleksandr.jpeg'),
    description: 'Я професійний викладач англійської та іспанської мов із 7-річним досвідом, здебільшого працюю онлайн. Проводжу різноманітні курси для учнів різного віку, використовуючи сучасні комунікативні методики, орієнтовані на результат.'
  },
  'Олександра': {
    photo: path.join(__dirname, 'pictures', 'Oleksandra.jpeg'),
    description: 'Я експерт з багатьох дисциплін.'
  },
  'Аня': {
    photo: path.join(__dirname, 'pictures', 'Anya.jpeg'),
    description: 'Аня - молода та енергійна викладачка.'
  },
  // Додайте інші викладачів за потребою
};


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
  ctx.reply(
    "👩‍🏫 Наші викладачі - це професіонали з багаторічним досвідом. Оберіть викладача для перегляду інформації:",
    Markup.keyboard([
      ...Object.keys(teachers).map(name => [name]),
      ['Головне меню 🔙']
    ]).resize()
  );
});

// Обробка кнопок для кожного викладача
Object.keys(teachers).forEach(name => {
  bot.hears(name, (ctx) => {
    const teacher = teachers[name];
    // Відправляємо фото та опис викладача з новою клавіатурою
    ctx.replyWithPhoto(
      { source: teacher.photo }, 
      {
        caption: `${teacher.description}`,
        reply_markup: Markup.keyboard([
          ...Object.keys(teachers).map(name => [name]),
          ["Головне меню 🔙"]
        ]).resize() 
      }
    );
  });
});


bot.hears("Отримати бонус 🎁", (ctx) => {
  ctx.reply("🎁 Ви отримаєте бонусний матеріал після першого уроку!");
});




bot.hears("Написати адміністратору 📨", (ctx) => {
  console.log("Обробник для 'Зв'язатися з менеджером' спрацював");
  ctx.reply("💬 Якщо у вас є запитання, ви можете зв'язатися з нашим менеджером у чаті @espacioescuela (https://t.me/espacioescuela).");
});

bot.hears("Наші контакти 📞", (ctx) => {
  ctx.reply("📞 Наші контакти:\n🌐 di-espacio.com\n📧 espacio.school@gmail.com\n https://t.me/espacioescuela");
});
bot.hears("Головне меню 🔙", (ctx) => {
  ctx.reply(
    "Ви повернулися в головне меню. Оберіть опцію:",
    mainMenu() 
  );
});


require("./commands/start")(bot);
registerInfoSchoolHandlers(bot);
registerEducationMenuHandlers(bot); 
registerTestHandlers(bot);

registerRequestHandlers(bot);


const createMainMenuKeyboard = () => {
  return Markup.keyboard([
    ["Перезагрузить 🔄"], 
  ]).resize();
};

bot.command("menu", (ctx) => {
  ctx.reply("Головне меню:", createMainMenuKeyboard());
});

bot.hears("Перезагрузить 🔄", (ctx) => {
  ctx.reply("Перезавантажую меню...");
  ctx.reply("Ви повернулися в головне меню. Оберіть опцію:", createMainMenuKeyboard());
});


bot.launch();
console.log("Бот запущен");

