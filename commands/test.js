const { Markup } = require("telegraf");
const questionsA0A2 = require("./questionsA0A2");
const questionsB1B2 = require("./questionsB1B2");

let currentQuestionIndex = 0;
let score = 0;
let isTestActive = false;
let currentTestLevel = null;

module.exports = (bot, globalState) => {
  bot.hears("Дізнатися свій рівень 📊", (ctx) => {
    ctx.reply(
      "Оберіть рівень тестування:",
      Markup.keyboard([["Рівень A0-A2", "Рівень B1-B2"], ["Головне меню 🔙"]]).resize()
    );
  });

  bot.hears("Рівень A0-A2", (ctx) => startTest(ctx, "A0A2"));
  bot.hears("Рівень B1-B2", (ctx) => startTest(ctx, "B1B2"));

  const startTest = (ctx, level) => {
    currentQuestionIndex = 0;
    score = 0;
    isTestActive = true;
    currentTestLevel = level;
    ctx.reply("Давайте почнемо тест! Оберіть правильну відповідь.");
    askQuestion(ctx);
  };

  const askQuestion = (ctx) => {
    let questions = currentTestLevel === "A0A2" ? questionsA0A2 : questionsB1B2;

    if (currentQuestionIndex < questions.length) {
      showQuestion(ctx, questions);
    } else {
      finishTest(ctx);
    }
  };

  const showQuestion = (ctx, questions) => {
    const { question, options } = questions[currentQuestionIndex];
    ctx.reply(`${question}\n${options.join("\n")}`, Markup.keyboard([["a","b","c"]]).resize());
  };

  bot.hears(/^(a|b|c)$/i, (ctx) => {
    if (!isTestActive) return;

    const userAnswer = ctx.message.text.toLowerCase();
    let questions = currentTestLevel === "A0A2" ? questionsA0A2 : questionsB1B2;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) score++;
    ctx.reply(userAnswer === correctAnswer ? "¡Respuesta correcta! ✅" : `¡Respuesta incorrecta! ❌ Правильна відповідь: ${correctAnswer}`);

    currentQuestionIndex++;
    setTimeout(() => askQuestion(ctx), 500);
  });

  const finishTest = (ctx) => {
    isTestActive = false;

    let resultMessage;
    if (currentTestLevel === "A0A2") {
      if (score <= 1) resultMessage = `Ваш рівень: A1.1 — ${score}/${questionsA0A2.length}`;
      else resultMessage = `Ваш рівень: A2 — ${score}/${questionsA0A2.length}`;
    } else {
      resultMessage = `Ваш рівень: B1/B2 — ${score}/${questionsB1B2.length}`;
    }

    // Зберігаємо результат у глобальній змінній
    globalState.pendingResultMessage = resultMessage;

    ctx.reply(
      "Щоб отримати результат, залиште контакт у Telegram:",
      Markup.keyboard([
        [Markup.button.contactRequest("📱 Поділитися контактом")],
        ["Головне меню 🔙"]
      ]).resize()
    );
  };
};
