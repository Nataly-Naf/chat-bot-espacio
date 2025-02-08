const mainMenu = require("./mainMenu"); // Імпорт головного меню
const path = require("path");

module.exports = (bot) => {
  bot.start((ctx) => {
    // Вказуємо шлях до відео
    const videoPath = path.join(__dirname, "video", "welcome.mp4");

    // Відправляємо відео
    ctx.replyWithVideo({ source: videoPath }).then(() => {
      // Після відео надсилаємо текстове повідомлення
      ctx.reply(
        "👋 Вітаємо в нашій школі іспанської мови! 🎉 Тут ти знайдеш усе необхідне, щоб вивчати цю прекрасну мову весело та ефективно. 🇪🇸 Ми підготували для тебе курси, інтерактивні матеріали та персональну підтримку. Давай розпочнемо цю пригоду разом! 🚀",
        mainMenu() // Використовуємо mainMenu()
      );
    });
  });
};
