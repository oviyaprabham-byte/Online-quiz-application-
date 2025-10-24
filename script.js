// JavaScript Quiz Logic
document.getElementById("quiz-form").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent form refresh

  // Correct Answers
  const correctAnswers = {
    q1: "c", // Paris
    q2: "b", // Einstein
    q3: "b", // Jupiter
    q4: "b", // JavaScript
    q5: "c"  // da Vinci
  };

  let score = 0;
  const total = Object.keys(correctAnswers).length;

  // Check answers
  for (let key in correctAnswers) {
    const selected = document.querySelector(`input[name="${key}"]:checked`);
    if (selected && selected.value === correctAnswers[key]) {
      score++;
    }
  }

  // Display result
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `🎉 You scored ${score} out of ${total} marks!`;

  // Optional: scroll to result
  resultDiv.scrollIntoView({ behavior: "smooth" });
});