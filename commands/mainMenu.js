
const { Markup } = require("telegraf");

function mainMenu() {
  return Markup.keyboard([
    ["Про школу 🏫", "Про навчання 📖"],
    ["Дізнатися свій рівень 📊", "Наші викладачі 👩‍🏫"],
  
    ["Хочу навчатись 👨‍🎓", "Написати адміністратору 📨"],
    ["Наші контакти 📞"],
  ]).resize();
}

module.exports = mainMenu; 
