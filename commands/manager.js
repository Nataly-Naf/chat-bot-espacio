const { Markup } = require("telegraf");

module.exports = (bot) => {
    bot.hears("Зв´язатися з менеджером 📨", (ctx) => {
      console.log("Кнопка 'Зв'язатися з менеджером' натиснута");
      ctx.reply(
        "💬 Якщо у вас є запитання, ви можете зв'язатися з нашим менеджером у чаті @espacioescuela (https://t.me/espacioescuela)."
      );
    });
  };
  
 