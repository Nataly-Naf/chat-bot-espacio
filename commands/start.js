const { Telegraf } = require("telegraf");
const mainMenu = require("./mainMenu"); // Імпортуємо функцію mainMenu
const path = require("path");

module.exports = (bot) => {
  bot.start((ctx) => {
    // Спочатку надсилаємо текст
    ctx.reply("👋 Вітаємо в нашій школі іспанської мови! 🎉 Тут ти знайдеш усе необхідне, щоб вивчати цю прекрасну мову весело та ефективно. 🇪🇸 Ми підготували для тебе курси, інтерактивні матеріали та персональну підтримку. Давай розпочнемо цю пригоду разом! 🚀")
      .then(() => {
        // Вказуємо шлях до відео в папці "videos" (переконайтесь, що відео є у вашій папці проекту)
        const videoPath = path.join(__dirname, "video", "welcome.mp4");
        console.log(videoPath)

        // Надсилаємо відео
        ctx.replyWithVideo({ source: videoPath }).then(() => {
          // Після відео надсилаємо меню
          ctx.reply("Оберіть, що хочете зробити далі:", mainMenu());
        });
      });
  });
};
