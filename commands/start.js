const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");
const mainMenu = require("./mainMenu");

module.exports = (bot, pool) => {
  const saveUser = async (ctx) => {
    const { id } = ctx.chat;
    await pool.query(
      `INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING`,
      [id]
    );
  };

  bot.start(async (ctx) => {
    console.log("Chat ID:", ctx.chat.id);
    await saveUser(ctx);

    ctx.reply("👋 !Вітаємо в нашій школі іспанської мови! 🎉 Тут ти знайдеш усе необхідне, щоб вивчати цю прекрасну мову весело та ефективно. 🇪🇸 Ми підготували для тебе курси, інтерактивні матеріали та персональну підтримку. Давай розпочнемо цю пригоду разом! 🚀")
      .then(() => {
        const videoPath = path.resolve(__dirname, 'video', 'welcome512.mp4');
        if (fs.existsSync(videoPath)) {
          ctx.replyWithVideo({ source: videoPath }).then(() => {
            ctx.reply("Оберіть, що хочете зробити далі:", mainMenu());
          });
        } else {
          ctx.reply("Вибачте, відео не знайдено.");
        }
      });
  });
};
