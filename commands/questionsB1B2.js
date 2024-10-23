const questions = [
  {
    question: '1️⃣ Elige la opción correcta: "Mañana yo ____ temprano para llegar a tiempo."',
    options: ["a) saldré", "b) salía", "c) salgo"],
    answer: "a",
  },
  {
    question: '2️⃣ Elige la opción correcta: "Ayer ____ una película muy interesante."',
    options: ["a) he visto", "b) vi", "c) veré"],
    answer: "b",
  },
  {
    question: '3️⃣ Elige la opción correcta: "Nosotros ____ estudiar para el examen."',
    options: ["a) tenemos que", "b) tenemos de", "c) tenemos"],
    answer: "a",
  },
  {
    question: '4️⃣ Completa la frase: "Yo ____ una carta a mi amigo la semana pasada."',
    options: ["a) escribí", "b) he escrito", "c) escribo"],
    answer: "a",
  },
  {
    question: '5️⃣ Elige la forma correcta del futuro: "Ellos ____ (viajar) a España el próximo mes."',
    options: ["a) viajaron", "b) viajan", "c) viajarán"],
    answer: "c",
  },
  {
    question: '6️⃣ Elige la opción correcta: "Cuando era niño, ____ en bicicleta todos los días."',
    options: ["a) montaba", "b) monto", "c) monté"],
    answer: "a",
  },
  {
    question: '7️⃣ Elige la opción correcta: "Ahora mismo nosotros ____ un examen."',
    options: ["a) hacemos", "b) estamos haciendo", "c) hicimos"],
    answer: "b",
  },
  {
    question: '8️⃣ Completa la frase: "Es probable que ____ mañana."',
    options: ["a) llueva", "b) lloverá", "c) llueve"],
    answer: "a",
  },
  {
    question: '9️⃣ Completa la frase: "Es importante que tú ____ la verdad."',
    options: ["a) dices", "b) digas", "c) dirás"],
    answer: "b",
  },
  {
    question: '🔟 Elige la forma correcta: "El año pasado ____ (comprar) una casa en la playa."',
    options: ["a) he comprado", "b) compré", "c) compro"],
    answer: "b",
  },
  {
    question: '1️⃣1️⃣ Elige la opción correcta: "Me ____ los deportes extremos."',
    options: ["a) encantan", "b) encantan de", "c) encanta"],
    answer: "a",
  },
  {
    question: '1️⃣2️⃣ Elige la opción correcta: "Si tuviera más tiempo, ____ más idiomas."',
    options: ["a) aprenderé", "b) aprendía", "c) aprendería"],
    answer: "c",
  },
  {
    question: '1️⃣3️⃣ Completa la frase: "Espero que ____ el trabajo a tiempo."',
    options: ["a) terminas", "b) termines", "c) terminarás"],
    answer: "b",
  },
  {
    question: '1️⃣4️⃣ Elige la opción correcta: "Mi hermana ____ (trabajar) en esa empresa durante tres años."',
    options: ["a) ha trabajado", "b) trabajó", "c) trabaja"],
    answer: "a",
  },
  {
    question: '1️⃣5️⃣ Elige la opción correcta: "Es necesario que ____ más temprano mañana."',
    options: ["a) te levantas", "b) te levantes", "c) levantarte"],
    answer: "b",
  },
  {
    question: '1️⃣6️⃣ Completa la frase: "Juan dijo que ____ la reunión."',
    options: ["a) ha cancelado", "b) cancelará", "c) había cancelado"],
    answer: "c",
  },
  {
    question: '1️⃣7️⃣ Elige la opción correcta: "Si ____ más tiempo, iría al gimnasio cada día."',
    options: ["a) tengo", "b) tuviera", "c) tendría"],
    answer: "b",
  },
  {
    question: '1️⃣8️⃣ Completa la frase: "No ____ que llegues tarde a clase."',
    options: ["a) quieres", "b) quiero", "c) querría"],
    answer: "b",
  },
  {
    question: '1️⃣9️⃣ Elige la opción correcta: "Marta ____ que estudiar mucho para el examen."',
    options: ["a) tendrá", "b) ha tenido", "c) tenía"],
    answer: "a",
  },
  {
    question: '2️⃣0️⃣ Completa la frase: "Es mejor que tú ____ a tiempo."',
    options: ["a) llegues", "b) llegarás", "c) llegas"],
    answer: "a",
  },
  {
    question: '2️⃣1️⃣ Elige el sinónimo de "feliz":',
    options: ["a) contento", "b) triste", "c) enojado"],
    answer: "a",
  },
  {
    question: '2️⃣2️⃣ Elige el sinónimo de "grande":',
    options: ["a) pequeño", "b) enorme", "c) minúsculo"],
    answer: "b",
  },
  {
    question: '2️⃣3️⃣ ¿Cuál es la palabra más apropiada para completar la frase?: "Ana tiene una ____ personalidad."',
    options: ["a) fuerte", "b) alta", "c) larga"],
    answer: "a",
  },
  {
    question: '2️⃣4️⃣ ¿Cuál es la palabra más adecuada para esta frase?: "Es una decisión muy ____ para todos."',
    options: ["a) importante", "b) triste", "c) bajo"],
    answer: "a",
  },
  {
    question: '2️⃣5️⃣ Elige el sinónimo de "rápido":',
    options: ["a) lento", "b) veloz", "c) pesado"],
    answer: "b",
  },
  {
    question: '2️⃣6️⃣ Elige la opción correcta: "Aunque ____ tarde, lo terminó todo."',
    options: ["a) llegara", "b) llegaría", "c) llegaba"],
    answer: "a",
  },
  {
    question: '2️⃣7️⃣ Completa la frase: "No creo que ellos ____ de acuerdo."',
    options: ["a) están", "b) estuvieran", "c) estarían"],
    answer: "b",
  },
  {
    question: '2️⃣8️⃣ Elige la forma correcta: "Si lo ____ antes, lo habría cambiado."',
    options: ["a) sabré", "b) sabría", "c) hubiera sabido"],
    answer: "c",
  },
  {
    question: '2️⃣9️⃣ Completa la frase: "Espero que el proyecto ____ un éxito."',
    options: ["a) sea", "b) será", "c) es"],
    answer: "a",
  },
  {
    question: '3️⃣0️⃣ Elige la opción correcta: "No ____ que me ayudaras con la tarea."',
    options: ["a) pensé", "b) pensaba", "c) hubiera pensado"],
    answer: "a",
  },
];

module.exports = questions;
