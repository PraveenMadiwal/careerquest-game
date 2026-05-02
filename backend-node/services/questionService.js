const questions = [
  {
    id: 1,
    question: "Write a function sum(a, b) that returns sum",
    testCases: [
      { input: [2, 3], output: 5 },
      { input: [10, 5], output: 15 },
    ],
    xp: 30,
  },
];

exports.getRandomQuestion = () => {
  return questions[Math.floor(Math.random() * questions.length)];
};