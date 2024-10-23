
const { Markup } = require("telegraf");

function mainMenu() {
  return Markup.keyboard([
    ["Про школу 🏫", "Про навчання 📖"],
    ["Дізнатися свій рівень 📊"],
    ["Наші викладачі 👩‍🏫", "Отримати бонус 🎁"],
    ["Хочу навчатись 👨‍🎓", "Написати адміністратору 📨"],
    ["Наші контакти 📞"],
  ]).resize();
}

module.exports = mainMenu; 
