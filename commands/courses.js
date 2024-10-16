const { Markup } = require("telegraf");

// Функция, возвращающая клавиатуру меню "Про навчання"
function educationMenu() {
  return Markup.keyboard([["Курси 📚", "Формати навчання 🧠"], ["Головне меню 🔙"]]).resize();
}
function coursesMenu() {
  return Markup.keyboard([
    ["Загальний курс", "Індивідуальний курс"],
    ["Курс для початківців в записі", "Підготовка до DELE"],
    ["Назад 🔙"],
  ]).resize();
}
// Обработчик для кнопки "Про навчання 📖"
function handleEducation(ctx) {
  ctx.reply("Оберіть опцію для перегляду інформації про навчання:", educationMenu());
}
function handleCourses(ctx) {
  ctx.reply("Оберіть курс для отримання додаткової інформації:", coursesMenu());
}
module.exports = { handleEducation, handleCourses };
