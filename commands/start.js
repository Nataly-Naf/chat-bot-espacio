const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");
const mainMenu = require("./mainMenu");
const FILE = './users.json';

const loadUsers = () =>
  fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE)) : [];

const saveUser = (id) => {
  const users = new Set(loadUsers());
  users.add(id);
  fs.writeFileSync(FILE, JSON.stringify([...users], null, 2));
};

module.exports = (bot) => {
  bot.start((ctx) => {
    saveUser(ctx.chat.id);
    ctx.reply("👋 !Вітаємо в нашій школі іспанської мови! 🎉 Тут ти знайдеш усе необхідне, щоб вивчати цю прекрасну мову весело та ефективно. 🇪🇸 Ми підготували для тебе курси, інтерактивні матеріали та персональну підтримку. Давай розпочнемо цю пригоду разом! 🚀")
      .then(() => {
        const videoPath = path.resolve(__dirname, 'video', 'welcome512.mp4');
        
        if (fs.existsSync(videoPath)) {
          ctx.replyWithVideo({ source: videoPath })
            .then(() => {
              ctx.reply("Оберіть, що хочете зробити далі:", mainMenu());
            });
        } else {
          ctx.reply("Вибачте, відео не знайдено.");
        }
      });
  });
};
