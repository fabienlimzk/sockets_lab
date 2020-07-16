const socket = io();
const $sendBtn = document.querySelector(".send");
const $messageContainer = document.querySelector(".messageContainer");
const $inputMessage = document.querySelector(".inputMessage");
const $inputUsername = document.querySelector(".username");
const $createUser = document.querySelector(".createUsername");
const $userList = document.querySelector(".usersList");
const $usernameContainer = document.querySelector(".usernameInput");
const $messageBoxContainer = document.querySelector(".messageBox");

// listen for a message
socket.on("chat message", (msg) => {
  display(msg);
});

socket.on("typing", (msg) => {
  document.querySelector(".typing").textContent = msg.user + " " + msg.message;
});

socket.on("not typing", (msg) => {
  document.querySelector(".typing").textContent = msg;
});

socket.on("users", (users) => {
  console.log(users);
  let html = ""
  users.forEach((user) => {
    html += `<li>${user}</li>`;
  });
  $userList.innerHTML = html;
});

// for setting username
$createUser.addEventListener("click", () => {
  let inputValue = $inputUsername.value;

  socket.emit("set user", inputValue, function(boolean) {
    if (boolean) {
      $usernameContainer.style.display = "none";
      $messageBoxContainer.style.display = "block";
    } else {
      alert("Username already exist.")
    }
  });

  // clear input field
  $inputUsername.value = "";
});

// for chat messages
$sendBtn.addEventListener("click", () => {
  let inputValue = $inputMessage.value;

  socket.emit("send message", inputValue);

  // clear input field
  $inputMessage.value = "";
});

$inputMessage.addEventListener("keydown", (data) => {
  socket.emit("is typing", "is typing now");
});

$inputMessage.addEventListener("keyup", () => {
  socket.emit("is not typing", "");
});

function display(data) {
  // let $div = document.createElement("div");
  // $div.classList.add("message");

  // let $textNode = document.createTextNode(data.message);

  // $div.appendChild($textNode);

  // $messageContainer.appendChild($div);

  let html = `<div class="message"> <strong>${data.user}</strong>: ${data.message} </div>`

  $messageContainer.innerHTML += html;
}

// socket.on("send me something", (msg) => {
//   console.log(msg);
// });

// socket.emit("listen to me", "listening to you ");




// console.log("This is main.js");
// const socket = io();

// let $sendButton = document.querySelector(".send");

// let $messageContainer = document.querySelector(".messageContainer");

// let $inputMessage = document.querySelector(".inputMessage");

// let $typing = document.querySelector(".typing");

// let listOfThingsIlike = {
//   ":isupportyou" : "&#129327;",
// }

// // listening to sockets for testmessage event
// socket.on("testmessage", (message) => {
//   console.log(message);
// });

// // listening to sockets for chatmessage event
// socket.on("chatmessage", (message) => {
//   console.log(message);
//   displayMessages(message);
// });


// // listening to sockets for typing message
// socket.on("istyping", (message) => {
//   // console.log(message);
//   $typing.innerHTML = message;
// });

// // "someone is typing..." message
// $inputMessage.addEventListener("keyup", () => {

//   socket.emit("typing", "someone is typing...");
// });

// // input message
// $sendButton.addEventListener("click", () => {
//   let inputValue = document.querySelector(".inputMessage").value;
  
//   socket.emit("sendmessage", inputValue);
// });

// // function displayMessages(message) {
// //   let $div = document.createElement("div"); // <div></div>
// //   let $textNode = document.createTextNode(message); // "message"
  
// //   $div.appendChild($textNode); // <div>"message"</div>
// //   $messageContainer.appendChild($div); // <div class="messageContainer"><div>"message"</div></div>
// // }

// function displayMessages(message) {
//   let correctedMsg = message.replace(
//     ":isupportyou",
//     listOfThingsIlike[":isupportyou"]
//   );

//   $messageContainer.insertAdjacentHTML(
//     "beforeend",
//     `<div> ${correctedMsg} </div>`
//   );
// }

// // function displayMessages(message) {
// //   let correctedMsg = message.replace(
// //     ":isupportyou",
// //     listOfThingsIlike[":isupportyou"]
// //   );

// //   $messageContainer.insertAdjacentHTML(
// //     "beforeend",
// //     `<div> ${correctedMsg} </div>`
// //   );
// // }