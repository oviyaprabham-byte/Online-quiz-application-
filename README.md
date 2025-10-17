<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Online Quiz App</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f7fa; margin:0; padding:0; display:flex; justify-content:center; }
    .container { max-width: 700px; width: 100%; padding: 20px; }
    header { text-align: center; margin-bottom: 20px; }
    h1 { margin: 0; font-size: 28px; color: #0b79d0; }
    .card { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 20px; }
    button { background: #0b79d0; color: #fff; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-size: 16px; }
    button:hover { background: #095a99; }
    .options label { display: block; margin: 8px 0; padding: 8px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
    .options input { margin-right: 8px; }
    .hidden { display: none; }
    .result { text-align: center; }
    .result h2 { color: #0b79d0; }
    .score { font-size: 20px; font-weight: bold; color: green; }
    input[type="text"] { width: 100%; padding: 8px; margin: 5px 0 10px 0; box-sizing: border-box; }
    label { font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Online Quiz</h1>
    </header>

    <!-- Quiz Card -->
  <div id="quiz-card" class="card">
      <h2 id="question">Question text</h2>
      <div class="options" id="options"></div>
      <button onclick="nextQuestion()">Next</button>
    </div>

    <!-- Result Card -->
   <div id="result-card" class="card hidden result">
      <h2>Quiz Completed!</h2>
      <p class="score" id="score"></p>
      <p id="summary"></p>
      <button onclick="restartQuiz()">Restart Quiz</button>
    </div>

    <!-- Add Question Form -->
  <div class="card">
      <h2>Add New Question</h2>
      <label>Question:</label>
      <input type="text" id="new-question" placeholder="Enter question here">

  <label>Option A:</label>
      <input type="text" id="new-opt-a" placeholder="Option A">

   <label>Option B:</label>
      <input type="text" id="new-opt-b" placeholder="Option B">

  <label>Option C:</label>
      <input type="text" id="new-opt-c" placeholder="Option C (optional)">

  <label>Option D:</label>
      <input type="text" id="new-opt-d" placeholder="Option D (optional)">

   <label>Correct Option (A/B/C/D):</label>
      <input type="text" id="new-correct" placeholder="Correct option">

   <button onclick="addQuestion()">Add Question</button>
    </div>
  </div>

  <script>
    // Initial quiz
    let quiz = [
      {question:"What does HTML stand for?", options:["Hyper Text Markup Language","Home Tool Markup Language","Hyperlinks and Text Markup Language"], correct:0},
      {question:"Which language is used for styling web pages?", options:["HTML","JQuery","CSS"], correct:2}
    ];

    let currentIndex = 0;
    let score = 0;
    let answers = [];

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const quizCard = document.getElementById("quiz-card");
    const resultCard = document.getElementById("result-card");
    const scoreEl = document.getElementById("score");
    const summaryEl = document.getElementById("summary");

    function loadQuestion() {
      const current = quiz[currentIndex];
      questionEl.textContent = current.question;
      optionsEl.innerHTML = "";
      current.options.forEach((opt, idx) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="option" value="${idx}"> ${opt}`;
        optionsEl.appendChild(label);
      });
    }

    function nextQuestion() {
      const selected = document.querySelector('input[name="option"]:checked');
      if (!selected) { alert("Please select an option!"); return; }
      const answer = parseInt(selected.value);
      answers.push(answer);
      if (answer === quiz[currentIndex].correct) score++;
      currentIndex++;
      if (currentIndex < quiz.length) loadQuestion();
      else showResult();
    }

    function showResult() {
      quizCard.classList.add("hidden");
      resultCard.classList.remove("hidden");
      scoreEl.textContent = `You scored ${score} out of ${quiz.length}`;
      let details = quiz.map((q,i)=>{
        let isCorrect = answers[i]===q.correct?"✅ Correct":"❌ Wrong";
        return `Q${i+1}: ${q.question} - ${isCorrect}`;
      }).join("<br>");
      summaryEl.innerHTML = details;
    }

    function restartQuiz() {
      currentIndex = 0;
      score = 0;
      answers = [];
      resultCard.classList.add("hidden");
      quizCard.classList.remove("hidden");
      loadQuestion();
    }

    function addQuestion() {
      const q = document.getElementById("new-question").value.trim();
      const a = document.getElementById("new-opt-a").value.trim();
      const b = document.getElementById("new-opt-b").value.trim();
      const c = document.getElementById("new-opt-c").value.trim();
      const d = document.getElementById("new-opt-d").value.trim();
      const correct = document.getElementById("new-correct").value.trim().toUpperCase();

      if (!q || !a || !b || !["A","B","C","D"].includes(correct)) {
        alert("Please enter valid question, options and correct answer!");
        return;
      }

      const options = [a,b];
      if(c) options.push(c);
      if(d) options.push(d);

      const correctIndex = {"A":0,"B":1,"C":2,"D":3}[correct];
      if(correctIndex>=options.length) { alert("Correct option index out of range!"); return; }

      quiz.push({question:q, options:options, correct:correctIndex});
      alert("Question added successfully!");

      // Clear form
      document.getElementById("new-question").value="";
      document.getElementById("new-opt-a").value="";
      document.getElementById("new-opt-b").value="";
      document.getElementById("new-opt-c").value="";
      document.getElementById("new-opt-d").value="";
      document.getElementById("new-correct").value="";
    }

    // Start quiz
    loadQuestion();
  </script>
</body>
</html>
