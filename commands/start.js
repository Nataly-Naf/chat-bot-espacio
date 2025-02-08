const mainMenu = require("./mainMenu"); // Імпорт головного меню
const path = require("path");

module.exports = (bot) => {
  bot.start((ctx) => {
    // Спочатку відправляємо текст
    ctx.reply(
      "👋 Вітаємо в нашій школі іспанської мови! 🎉 Тут ти знайдеш усе необхідне, щоб вивчати цю прекрасну мову весело та ефективно. 🇪🇸 Ми підготували для тебе курси, інтерактивні матеріали та персональну підтримку. Давай розпочнемо цю пригоду разом! 🚀",
      mainMenu() // Використовуємо mainMenu()
    ).then(() => {
      // Після тексту надсилаємо відео
      const videoPath = path.join(__dirname, "video", "welcome.mp4");

      ctx.replyWithVideo({ source: videoPath });
    });
  });
};
