const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");
const mainMenu = require("./mainMenu");

module.exports = (bot) => {
  bot.start((ctx) => {
    // Надсилаємо текст
    ctx.reply("👋 !Вітаємо в нашій школі іспанської мови! 🎉 Тут ти знайдеш усе необхідне, щоб вивчати цю прекрасну мову весело та ефективно. 🇪🇸 Ми підготували для тебе курси, інтерактивні матеріали та персональну підтримку. Давай розпочнемо цю пригоду разом! 🚀")
      .then(() => {
        // Вказуємо відносний шлях до відео
        const videoPath = path.resolve(__dirname, 'video', 'welcome512.mp4');
        
        // Перевірка, чи існує відео
        if (fs.existsSync(videoPath)) {
          // Надсилаємо відео з локальної папки
          ctx.replyWithVideo({ source: videoPath })
            .then(() => {
              // Після відео надсилаємо меню
              ctx.reply("Оберіть, що хочете зробити далі:", mainMenu());
            });
        } else {
          ctx.reply("Вибачте, відео не знайдено.");
        }
      });
  });
};
