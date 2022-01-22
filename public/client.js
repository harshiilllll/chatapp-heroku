const socket = io();

const textarea = document.querySelector("#textarea");
const messageArea = document.querySelector(".message__area");
const sendBtn = document.querySelector(".send__btn");
const themeDayBtn = document.querySelector(".day");
const themeNightBtn = document.querySelector(".night");
const sound = new Audio("ting.mp3");

let name;

do {
  name = prompt("Enter your Name...");
} while (!name);
sendMessage(`<b>${name}</b> joined the chat !!`);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (textarea.value !== "") {
      sendMessage(e.target.value);
    } else console.log(e.target.value);
  }
});

textarea.addEventListener("dblclick", (e) => {
  sendMessage(e.target.value);
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message,
    time:
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
  };

  // Append

  appendMessage(msg, "outgoing");
  textarea.value = "";

  // Send to Server

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        <time>${msg.time}</time>
    `;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
  scrollToBottom();
}

// Recieve Messages

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  sound.play();
});

// Scroll to Bottom

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

// Theme Change

themeDayBtn.addEventListener("click", () => {
  themeDayBtn.style.display = "none";
  themeNightBtn.style.display = "block";
  document.body.style.backgroundColor = "#131c21";
  document.querySelector(".brand").style.backgroundColor = "#2a2f32";
  document.querySelector(".brand h1").style.color = "#b1b3b5";
  textarea.style.backgroundColor = "#2a2f32";
  textarea.style.color = "#fff";
  messageArea.style.backgroundColor = "#0d1418";
});

themeNightBtn.addEventListener("click", () => {
  themeDayBtn.style.display = "block";
  themeNightBtn.style.display = "none";
  document.body.style.backgroundColor = "#e5ddd5";
  document.querySelector(".brand").style.backgroundColor = "#ededed";
  document.querySelector(".brand h1").style.color = "#51585c";
  textarea.style.backgroundColor = "#f0f0f0";
  textarea.style.color = "#000";
  messageArea.style.backgroundColor = "#ccebdc";
});
