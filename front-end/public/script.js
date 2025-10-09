// script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("flashcard-form");
  const questionInput = document.getElementById("question");
  const answerInput = document.getElementById("answer");
  const flashcardContainer = document.getElementById("flashcard-container");
  const subjectDropdown = document.getElementById("subject-dropdown");

  let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

  // Render cards on load
  renderFlashcards();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (!question || !answer) return;

    const newCard = {
      id: Date.now(),
      question,
      answer,
      subject: subjectDropdown.value || "general"
    };

    flashcards.push(newCard);
    saveFlashcards();
    renderFlashcards();

    form.reset();
  });

  function saveFlashcards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }

  function renderFlashcards() {
    flashcardContainer.innerHTML = "";

    const selectedSubject = subjectDropdown.value;

    const filtered = selectedSubject
      ? flashcards.filter(card => card.subject === selectedSubject)
      : flashcards;

    filtered.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("flashcard");
      cardDiv.innerHTML = `
        <div class="question">${card.question}</div>
        <div class="answer">${card.answer}</div>
      `;

      cardDiv.addEventListener("click", () => {
        cardDiv.classList.toggle("flipped");
      });

      flashcardContainer.appendChild(cardDiv);
    });
  }

  subjectDropdown.addEventListener("change", () => {
    renderFlashcards();
  });
});
