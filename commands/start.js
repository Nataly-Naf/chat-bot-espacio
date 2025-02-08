// const mainMenu = require("./mainMenu"); // Импорт функции mainMenu

// module.exports = (bot) => {
//   bot.start((ctx) => {
//     ctx.reply(
//       "👋 Вітаємо в нашій школі іспанської мови! 🎉 Тут ти знайдеш усе необхідне, щоб вивчати цю прекрасну мову весело та ефективно. 🇪🇸 Ми підготували для тебе курси, інтерактивні матеріали та персональну підтримку. Давай розпочнемо цю пригоду разом! 🚀",
//       mainMenu() // Используем mainMenu()
//     );
//   });
// };

const mainMenu = require("./mainMenu"); 

module.exports = (bot) => {
  bot.start((ctx) => {
    ctx.replyWithVideo("BAACAgIAAxkBAAMDZ6ZYNv6pdVoCn6PqkAmNiW3xu3oAAixhAAKY2OFIYymcOum-nkQ2BA")
      .then(() => {
        ctx.reply(
          "👋 Вітаємо в нашій школі іспанської мови! 🎉 Тут ти знайдеш усе необхідне, щоб вивчати цю прекрасну мову весело та ефективно. 🇪🇸 Ми підготували для тебе курси, інтерактивні матеріали та персональну підтримку. Давай розпочнемо цю пригоду разом! 🚀",
          mainMenu() 
        );
      })
      .catch((err) => {
        console.error("Помилка при надсиланні відео:", err);
      });
  });
};
