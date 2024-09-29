// const { Telegraf } = require("telegraf");
// https://t.me/EspanolConDiana_bot
// const bot = new Telegraf("8072199106:AAEMULXtqKgDhfEaGmNLwWv2D7ELTZSDY6E");

const { Telegraf, Markup } = require("telegraf");

// Ініціалізація ботаno
const bot = new Telegraf("8072199106:AAEMULXtqKgDhfEaGmNLwWv2D7ELTZSDY6E");

// Команда /start
bot.start((ctx) => {
  ctx.reply(
    "Вітаю вас у школі ESPAcio! Оберіть одну з опцій:",
    Markup.keyboard([
      ["Тест 📝", "Про школу ℹ️"], // перший ряд кнопок
      ["Записатися на консультацію 📅", "Залишити заявку 📨"], // другий ряд кнопок
    ]).resize() // Робить клавіатуру адаптивною до екрана
  );
});

// Обробка вибору "Тест"
bot.hears("Тест 📝", (ctx) => {
  ctx.reply(
    "Оберіть тест, який вам цікавий:\n1. Тест на рівень A1\n2. Тест на рівень A2..."
  );
  // Далі ви можете додати логіку для тесту
});

// Обробка вибору "Про школу"
bot.hears("Про школу ℹ️", (ctx) => {
  ctx.reply(
    "Школа ESPAcio пропонує заняття з іспанської мови з досвідченими викладачами..."
  );
  // Можете додати більше інформації про школу
});

// Обробка вибору "Записатися на консультацію"
bot.hears("Записатися на консультацію 📅", (ctx) => {
  ctx.reply(
    "Щоб записатися на консультацію, будь ласка, надішліть нам своє ім’я та номер телефону."
  );
  // Далі можна обробляти відправлені дані
});

// Обробка вибору "Залишити заявку"
bot.hears("Залишити заявку 📨", (ctx) => {
  ctx.reply(
    "Залиште, будь ласка, свою заявку у форматі:\n1. Ім'я\n2. Контактний телефон\n3. Коментар (якщо потрібно)"
  );
  // Можете додати логіку обробки заявки
});

// Запуск бота
bot.launch();
