// Floating Buttons Click Events

document.addEventListener("DOMContentLoaded", () => {
  const aiButton = document.getElementById("aiButton");
  const helpButton = document.getElementById("helpButton");

  aiButton.addEventListener("click", () => {
    alert("Hello! How can I assist you today?");
    // Replace with chatbot modal or desired functionality
  });

  helpButton.addEventListener("click", () => {
    alert("Need help? Contact our support team!");
    // Replace with help modal or desired functionality
  });
});

// Progress Circle Chart

const progressData = [
  { value: 58 },
  { value: 75 },
  { value: 28 },
  { value: 97 },
];

const container = document.getElementById("progressContainer");

progressData.forEach((progress) => {
  const progressElement = document.createElement("div");
  progressElement.classList.add("progress-circle");

  const color = progress.value > 50 ? "violet" : "red";
  progressElement.style.background = `conic-gradient(${color} ${progress.value}%, #e6e6e6 ${progress.value}%)`;

  progressElement.innerHTML = `
        <div class="progress-text">${progress.value}%</div>
    `;

  container.appendChild(progressElement);
});
