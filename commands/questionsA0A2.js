const questions = [
    {
      question: "1️⃣ ¿Cómo se dice 'стіл' en español?",
      options: ["a) silla", "b) mesa", "c) ventana"],
      answer: "b",
    },
    {
      question: "2️⃣ ¿Cómo se dice 'книга' en español?",
      options: ["a) cuaderno", "b) libro", "c) lápiz"],
      answer: "b",
    },
    {
      question: "3️⃣ ¿Cómo se dice 'собака' en español?",
      options: ["a) perro", "b) gato", "c) pájaro"],
      answer: "a",
    },
    {
      question: "4️⃣ Completa la frase: 'Me llamo Ana y ____ 12 años.'",
      options: ["a) soy", "b) tengo", "c) estoy"],
      answer: "b",
    },
    {
      question: "5️⃣ ¿Cuál es la forma correcta del plural de 'flor'?",
      options: ["a) flores", "b) floras", "c) flor"],
      answer: "a",
    },
    {
      question: "6️⃣ Elige la opción correcta: 'Mi casa ____ cerca de la universidad.'",
      options: ["a) es", "b) está", "c) hay"],
      answer: "b",
    },
    {
      question: "7️⃣ Elige la opción correcta: 'Ellos ____ en Madrid.'",
      options: ["a) viven", "b) son", "c) hay"],
      answer: "a",
    },
    {
      question: "8️⃣ Elige la opción correcta: '____ gusta bailar salsa.'",
      options: ["a) A me", "b) Mi", "c) Me"],
      answer: "c",
    },
    {
      question: "9️⃣ Elige la opción correcta: '____ muy cansada hoy.'",
      options: ["a) Estoy", "b) Soy", "c) Era"],
      answer: "a",
    },
    {
      question: "🔟 ¿Cuál es la forma correcta del verbo 'ser' en la frase: 'Nosotros ____ estudiantes'?",
      options: ["a) somos", "b) son", "c) soy"],
      answer: "a",
    },
    {
      question: "1️⃣1️⃣ Elige la opción correcta: 'Voy ____ supermercado para comprar frutas.'",
      options: ["a) en el", "b) a el", "c) al"],
      answer: "c",
    },
    {
      question: "1️⃣2️⃣ Elige la opción correcta: 'Ayer ____ a mi amiga en el parque.'",
      options: ["a) vi", "b) veo", "c) veré"],
      answer: "a",
    },
    {
      question: "1️⃣3️⃣ Completa la frase: 'Necesito ____ más para el examen de mañana.'",
      options: ["a) estudio", "b) estudiar", "c) estudiando"],
      answer: "b",
    },
    {
      question: "1️⃣4️⃣ Elige la opción correcta: 'Mi hermano ____ a estudiar inglés el próximo mes.'",
      options: ["a) va", "b) fue", "c) ido"],
      answer: "a",
    },
    {
      question: "1️⃣5️⃣ Elige la opción correcta: '¿Dónde ____ el baño?'",
      options: ["a) está", "b) es", "c) está siendo"],
      answer: "a",
    },
    {
      question: "1️⃣6️⃣ Elige la opción correcta: 'A mí me gusta ____ chocolate.'",
      options: ["a) -", "b) el", "c) un"],
      answer: "b",
    },
    {
      question: "1️⃣7️⃣ Elige la forma correcta del verbo irregular en presente: 'Yo ____ (hacer) la tarea todos los días.'",
      options: ["a) hago", "b) hago", "c) hize"],
      answer: "a",
    },
    {
      question: "1️⃣8️⃣ Elige la forma correcta del verbo irregular en presente: 'Ellos siempre ____ (decir) la verdad.'",
      options: ["a) dicen", "b) decen", "c) dijieron"],
      answer: "a",
    },
    {
      question: "1️⃣9️⃣ Elige la forma correcta: 'Ahora mismo mis amigos ____ (trabajar) en el jardín.'",
      options: ["a) están trabajando", "b) trabajan", "c) trabajaron"],
      answer: "a",
    },
    {
      question: "2️⃣0️⃣ Elige la forma correcta: 'Ahora mismo ____ (leer) un libro muy interesante.'",
      options: ["a) estoy leyendo", "b) leo", "c) estaba leyendo"],
      answer: "a",
    },
    {
      question: "2️⃣1️⃣ Elige la opción correcta en Futuro: 'La próxima semana nosotros ____ (visitar) a mis abuelos.'",
      options: ["a) visitaremos", "b) visitamos", "c) hemos visitado"],
      answer: "a",
    },
    {
      question: "2️⃣2️⃣ Elige la forma correcta del verbo en Futuro: 'El próximo mes ____ (tener) una reunión importante.'",
      options: ["a) tendré", "b) tuve", "c) tengo"],
      answer: "a",
    },
    {
      question: "2️⃣3️⃣ Elige la forma correcta del verbo en Futuro: 'Mañana ____ (ir) al cine con mis amigos.'",
      options: ["a) iré", "b) fui", "c) voy"],
      answer: "a",
    },
    {
      question: "2️⃣4️⃣ Elige la opción correcta: 'Mañana ____ (hacer) frío.'",
      options: ["a) hará", "b) hago", "c) hice"],
      answer: "a",
    },
    {
      question: "2️⃣5️⃣ Elige la forma correcta: 'Esta semana ya ____ (comer) tres veces en ese restaurante.'",
      options: ["a) he comido", "b) comí", "c) comeré"],
      answer: "a",
    },
    {
      question: "2️⃣6️⃣ Elige la forma correcta del verbo: 'Hoy no ____ (hacer) nada interesante.'",
      options: ["a) he hacido", "b) hice", "c) he hecho"],
      answer: "c",
    },
    {
      question: "2️⃣7️⃣ Elige la forma correcta: 'Ayer ____ (ir) al supermercado.'",
      options: ["a) fui", "b) he ido", "c) iba"],
      answer: "a",
    },
    {
      question: "2️⃣8️⃣ Elige la forma correcta en Pretérito Perfecto: 'Nunca ____ (viajar) a España.'",
      options: ["a) viajé", "b) he viajado", "c) viajo"],
      answer: "b",
    },
    {
      question: "2️⃣9️⃣ Elige la forma correcta: 'El sábado pasado nosotros ____ (comer) en casa de mis abuelos.'",
      options: ["a) comimos", "b) hemos comido", "c) comemos"],
      answer: "a",
    },
    {
      question: "3️⃣0️⃣ Elige la forma correcta: 'Este mes ya ____ (ir) dos veces al cine.'",
      options: ["a) he ido", "b) fue", "c) voy"],
      answer: "a",
    },
  ];
  
  module.exports = questions;
  