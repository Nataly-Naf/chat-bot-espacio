const { Markup } = require("telegraf");
const questionsA0A2 = require("./questionsA0A2");
const questionsB1B2 = require("./questionsB1B2");

let currentQuestionIndex = 0;
let score = 0;
let isTestActive = false;
let currentTestLevel = null;

module.exports = (bot) => {
  bot.hears("Дізнатися свій рівень 📊", (ctx) => {
    ctx.reply(
      "Оберіть рівень тестування:",
      Markup.keyboard([["Рівень A0-A2", "Рівень B1-B2"], ["Головне меню 🔙"]]).resize()
    );
  });

  bot.hears("Рівень A0-A2", (ctx) => {
    startTest(ctx, "A0A2");
  });

  bot.hears("Рівень B1-B2", (ctx) => {
    startTest(ctx, "B1B2");
  });

  const startTest = (ctx, level) => {
    currentQuestionIndex = 0;
    score = 0;
    isTestActive = true;
    currentTestLevel = level;
    ctx.reply("Давайте почнемо тест! Оберіть правильну відповідь.");
    askQuestion(ctx);
  };

  const askQuestion = (ctx) => {
    let questions;

    if (currentTestLevel === "A0A2") {
      questions = questionsA0A2;
    } else if (currentTestLevel === "B1B2") {
      questions = questionsB1B2;
    }

    if (currentQuestionIndex < questions.length) {
      // Display motivational message *before* showing question 11
      if (currentQuestionIndex === 10) {
        ctx.reply("*🌟 Так тримати! Вже є 10 питань! 🌟*", { parse_mode: "Markdown" });
        setTimeout(() => {
          showQuestion(ctx, questions); // Proceed to the next question after delay
        }, 1000);
      } else if (currentQuestionIndex === 20) {
        ctx.reply("*🎉 Більше половини позаду. Так тримати! 🎉*", { parse_mode: "Markdown" });
        setTimeout(() => {
          showQuestion(ctx, questions); // Proceed to the next question after delay
        }, 1000);
      } else {
        showQuestion(ctx, questions); // Show the question immediately if no message
      }
    } else {
      finishTest(ctx); // End the test after the last question
    }
  };

  const showQuestion = (ctx, questions) => {
    const { question, options } = questions[currentQuestionIndex];
    ctx.reply(
      `${question}\n${options.join("\n")}`,
      Markup.keyboard([["a", "b", "c"]]).resize()
    );
  };

  bot.hears(/^(a|b|c)$/i, (ctx) => {
    if (!isTestActive) return;

    const userAnswer = ctx.message.text.toLowerCase();
    let questions;

    if (currentTestLevel === "A0A2") {
      questions = questionsA0A2;
    } else if (currentTestLevel === "B1B2") {
      questions = questionsB1B2;
    }

    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
      score++;
      ctx.reply("¡Respuesta correcta! ✅");
    } else {
      ctx.reply(`¡Respuesta incorrecta! ❌ Правильна відповідь: ${correctAnswer}`);
    }

    currentQuestionIndex++;
    setTimeout(() => askQuestion(ctx), 1000);
  });

  const finishTest = (ctx) => {
    isTestActive = false;

    ctx.reply("*🎊 Вітаю! Ти справився! 🎊*", { parse_mode: "Markdown" });

    let resultMessage;
    if (currentTestLevel === "A0A2") {
      if (score <= 10) {
        resultMessage = `Ваш рівень: A1.1 (початковий) — ${score}/30 правильних відповідей. Estudiantes que cometen muchos errores en estructuras básicas y tienen problemas para reconocer vocabulario esencial.`;
      } else if (score <= 18) {
        resultMessage = `Ваш рівень: A1 (базовий) — ${score}/30 правильних відповідей. Estudiantes que dominan el presente de indicativo y algunas frases comunes, pero todavía tienen dificultades con tiempos pasados y estructuras más complejas.`;
      } else if (score <= 25) {
        resultMessage = `Ваш рівень: A2.1 — ${score}/30 правильних відповідей. Estudiantes con buen control del presente, capaces de utilizar estructuras como el pretérito perfecto e indefinido, aunque con errores.`;
      } else {
        resultMessage = `Ваш рівень: A2.2 — ${score}/30 правильних відповідей. Estudiantes con buen control del presente, pasado y futuro, capaces de utilizar correctamente estructuras como el pretérito perfecto e indefinido, aunque con algunos errores ocasionales.`;
      }
    } else if (currentTestLevel === "B1B2") {
      if (score <= 10) {
        resultMessage = `Ваш рівень: B1.1 — ${score}/30 правильних відповідей. Estudiantes que tienen control básico del pasado y presente, pero aún tienen problemas con formas verbales complejas y estructuras avanzadas.`;
      } else if (score <= 18) {
        resultMessage = `Ваш рівень: B1.2 — ${score}/30 правильних відповідей. Estudiantes con buen manejo de tiempos pasados, que pueden mantener conversaciones en situaciones cotidianas con algunos errores.`;
      } else if (score <= 25) {
        resultMessage = `Ваш рівень: B2.1 — ${score}/30 правильних відповідей. Estudiantes con muy buen control de tiempos verbales, capaces de mantener conversaciones complejas aunque con algunos errores ocasionales.`;
      } else {
        resultMessage = `Ваш рівень: B2.2 — ${score}/30 правильних відповідей. Estudiantes que dominan tiempos verbales complejos y pueden comunicarse de manera fluida en casi cualquier situación.`;
      }
    }

    const keyboard = Markup.keyboard([
      ["Головне меню 🔙"],
      ["Курси 📚"],
    ]).resize();

    ctx.reply(resultMessage);
    ctx.reply("Оберіть наступну дію:", keyboard);
  };
};
