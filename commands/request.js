const { Markup } = require("telegraf");
const mainMenu = require("./mainMenu");
require('dotenv').config();  // Додає підтримку для завантаження .env файлу

const channelId = process.env.CHANNEL_ID;

module.exports = (bot) => {
    // Обробник для кнопки "Хочу навчатись"
    bot.hears("Хочу навчатись 👨‍🎓", (ctx) => {
        console.log("Хочу навчатися натиснута");

        ctx.reply(
            "📋 *Будь ласка, залиште свою заявку у такому форматі:* \n\n" +
            "1️⃣ *Ім'я*\n" +
            "2️⃣ *Ваш контакт в телеграмі (або інший контакт для зв'язку)*\n" +
            "3️⃣ *Коментар* _(за бажанням)_\n\n" +
            "📞 Наш менеджер зв'яжеться з вами найближчим часом!",
            { parse_mode: "Markdown" }
        );

        // Ініціалізація сесії, якщо її ще немає
        if (!ctx.session) ctx.session = {};

        // Встановлюємо стан сесії
        ctx.session.state = "awaiting_application";
    });

    // Обробник для тексту
    bot.on("text", (ctx) => {
        // Якщо сесія не активна або немає стану "awaiting_application", виходимо
        if (!ctx.session || ctx.session.state !== "awaiting_application") {
            console.log("Стан сесії не 'awaiting_application'. Виконується інша дія.");
            ctx.reply("Ви зараз не надсилаєте заявку. Натисніть 'Хочу навчатись 👨‍🎓', щоб почати.");
            return;
        }

        const application = ctx.message.text;

        // Надсилаємо заявку до каналу
        bot.telegram.sendMessage(channelId, `Нова заявка:\n${application}`)
            .then(() => {
                ctx.reply("Дякуємо! Ваша заявка надіслана.", mainMenu());
                ctx.session.state = null; // Скидаємо стан сесії після обробки заявки
            })
            .catch(error => {
                console.error("Помилка надсилання заявки до каналу:", error);
                ctx.reply("Сталася помилка при надсиланні заявки. Спробуйте ще раз.");
            });
    });
};
