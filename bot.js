

const { Telegraf, Markup, session } = require("telegraf");
const registerTestHandlers = require("./commands/test");
const registerInfoSchoolHandlers = require("./commands/info");
const mainMenu = require("./commands/mainMenu");
const registerEducationMenuHandlers = require("./commands/courses"); 
const registerContactManagerHandlers = require("./commands/manager"); 
const registerRequestHandlers = require("./commands/request"); 
const path = require('path');
require('dotenv').config(); 


const teachers = {
  'Олександр': {
    photo: path.join(__dirname, 'pictures', 'Oleksandr.jpeg'),
    description: 'Я професійний викладач англійської та іспанської мов із 7-річним досвідом, здебільшого працюю онлайн. Проводжу різноманітні курси для учнів різного віку, використовуючи сучасні комунікативні методики, орієнтовані на результат.'
  },
  'Олександра': {
    photo: path.join(__dirname, 'pictures', 'Oleksandra.jpeg'),
    description: `Викладаю іспанську з 2014 року. Працюю як із дітьми, так і з дорослими.

Завжди намагаюсь створювати гарний настрій на уроці, і вважаю, що основою гарного навчання є задоволення від процесу.`
  },
 'Анна': {
    photo: path.join(__dirname, 'pictures', 'Anna.jpeg'),
    description: `Закінчила Харківський національний педагогічний університет ім. Сковороди, факультет іноземної філології.
Досвід викладання — 8 років.
Люблю іноземні мови з дитинства, в іспанську мову закохалася з перших слів і рада, що моя професія пов'язана саме з викладання цієї неймовірно гарної мови. Колись, випадково обравши іспанську, я зробила правильний вибір, і моя робота приносить мені задоволення. Обожнюю навчати людей, особливо відкривати для них світ іспанської мови та культури. Люблю іспанську музику, фільми та серіали, кухню та стиль життя ❤️.`
  },
  'Ольга': {
    photo: path.join(__dirname, 'pictures', 'Olga.jpeg'),
    description: `¡Hola, soy Olha! 
Маю профільну освіту філолога іспанської мови у Львівському Національному Університеті імені Івана Франка. Проживала та навчалась в Іспанії. Отримала міжнародний диплом DELE C1.
Відповідальна та віддана своїй роботі, маю індивідуальний підхід до кожного учня та проводжу насичені заняття для швидкого засвоєння мови.`
  },
  
  'Марія Г': {
    photo: path.join(__dirname, 'pictures', 'Maria.jpeg'),
    description: `Мене звати Марія. Вивчаю іспанську понад 15 років, а навчаю 4. 
Люблю подорожі, фотографувати на плівку та спостерігати за результами моїх учнів.`
  },
  'Анастасія': {
    photo: path.join(__dirname, 'pictures', 'Anastasia.jpeg'),
    description: `¡Hola, soy Anastasia! Маю багатий досвід викладання іспанської мови та любов до цієї культури. Навчання для мене — це не лише передача знань, а й можливість розділити свою любов до мови та традицій Іспанії. Індивідуально підходжу до кожного учня, щоб заняття були максимально ефективними та цікавими. Радію можливості допомагати вам на шляху до вільного володіння іспанською!`
  },
  'Юлія Швець': {
    photo: path.join(__dirname, 'pictures', 'Shvets.jpeg'),
    description: `Мене звати Юлія, мені 29 років, проживаю в Іспанії більше 6-ти років.
Мій досвід у викладанні 3,5 роки, викладала у двох іспанських школах, а також у Червоному Хресті.
Мій підхід до навчання легкий та цікавий.
Я зважаю на індивідуальні потреби кожного, працюючи на результат і надихаючи на подальше вивчення мови.`
  },
  'Марія С': {
    photo: path.join(__dirname, 'pictures', 'MariiaS.jpeg'),
    description: `Привіт! 😊 Мене звати Марія, і я викладач іспанської.
Я люблю досліджувати мови і моя ціль допомагати студентам вивчати іспанську легко та зрозуміло.
На моїх уроках багато практики, живих прикладів і трохи гумору – бо вивчати мову має бути цікаво!
Я пояснюю все просто, без складних правил, щоби у тебе почалося заговорити вже з першого заняття.
Головне – дисциплінована практика, впевненість і дрібка терпіння, а я допоможу тобі заговорити без страху і з задоволенням!
Хочеш вивчати іспанську легко і з користю? Тоді запрошую тебе на мої уроки! ✨💡`
  },
'Олена': {
  photo: path.join(__dirname, 'pictures', 'Lena.jpeg'),
  description: '¡Hola! Me llamo Olena. Soy de Ucrania, pero llevo 9 años viviendo en España. En Madrid, en la Universidad Carlos III (UC3M), hice mi máster y doctorado en Ciencias Sociales. Actualmente trabajo en la universidad como investigadora y profesora, dando clases en español e inglés. En 2019 obtuve el certificado DELE B2 y en 2023 el C1 de la Escuela Oficial de Idiomas.'
},


  'Susana': {
    photo: path.join(__dirname, 'pictures', 'Susana.jpeg'),
    description: `Soy Susi, profesora de español e inglés, nacida en Colombia y actualmente viviendo en España. El español es mi lengua materna y enseñar es mi gran pasión. Disfruto cada momento de guiar a mis estudiantes en su camino hacia la fluidez. Además, me encanta viajar y explorar nuevas culturas, lo que enriquece mi forma de enseñar con historias y perspectivas del mundo.`
  },


  
};


const bot = new Telegraf(process.env.BOT_TOKEN);

const channelId = process.env.CHANNEL_ID;

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
const chunkArray = (arr, chunkSize) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

bot.hears("Наші викладачі 👩‍🏫", (ctx) => {
  ctx.reply(
    "👩‍🏫 Наші викладачі - це професіонали з багаторічним досвідом. Оберіть викладача для перегляду інформації:",
    Markup.keyboard([
      ...chunkArray(Object.keys(teachers), 2), // Каждая строка будет содержать по 2 имени
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


// bot.hears("Отримати бонус 🎁", (ctx) => {
//   ctx.reply("🎁 Ви отримаєте бонусний матеріал після першого уроку!");
// });



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

