function startAnimation() {
  const name = document.getElementById("nameInput").value;
  const message = document.getElementById("messageInput").value;

  if (!name || !message) {
    alert("Fill everything first!");
    return;
  }

  // hide start screen
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("mainContent").style.display = "block";

  // set text
  document.getElementById("topName").innerText = name;
  document.getElementById("bottomName").innerText = name;

  // start rocket
  const rocket = document.querySelector(".rocket");
  rocket.style.display = "block";
  rocket.classList.add("fly");

  startTextAnimation(message);
}

// TEXT + COLORS
const words = [
  { text: "I MISS YOU 💙", color: "skyblue" },
  { text: "I LOVE YOU ❤️", color: "red" },
  { text: "YOU MATTER 💖", color: "pink" },
  { text: "STAY WITH ME 💜", color: "violet" },
  { text: "FOREVER US 💛", color: "gold" }
];

function startTextAnimation(customMessage) {
  let index = 0;
  const mainText = document.getElementById("mainText");

  setInterval(() => {
    if (index === 0) {
      mainText.innerText = customMessage;
      mainText.style.color = "white";
    } else {
      mainText.innerText = words[index - 1].text;
      mainText.style.color = words[index - 1].color;
    }

    index = (index + 1) % (words.length + 1);
  }, 1500);
}
