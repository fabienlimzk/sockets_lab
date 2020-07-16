const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const expressLayouts = require("express-ejs-layouts");

require("dotenv").config();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayouts);

//express routes
app.use("/", require("./routes/dashboard.route"));

//socket information
let users = []; // store users

io.on("connection", (socket) => {
  socket.on("set user", (data, next) => {
    if (users.indexOf(data) != -1) {
      next(false);
    } else {
      next(true);
      socket.username = data;
      users.push(data);
      io.emit("users", users);
    }
  });
  
  socket.on("send message", (msg) => {
    io.emit("chat message", { user: socket.username, message: msg});
  });

  socket.on("is typing", (msg) => {
    console.log(socket.username[0]);
    socket.broadcast.emit("typing", { user: socket.username, message: msg});
  });

  socket.on("is not typing", (msg) => {
    socket.broadcast.emit("not typing", msg);
  });
});

http.listen(process.env.PORT, () =>
  console.log(`running express app ${process.env.PORT}`)
);



// const express = require("express");
// const app = express();
// const http = require("http").createServer(app);
// const io = require("socket.io")(http);
// const expressLayouts = require("express-ejs-layouts");

// require("dotenv").config();

// app.use(express.static("public"));
// app.set("view engine", "ejs");
// app.use(expressLayouts);
// //express routes
// app.use("/", require("./routes/dashboard.route"));

// //socket information
// io.on("connection", (socket) => {
//   //only seen by everyone (connected users/apps)
//   socket.emit("testmessage", "SEI 23 is running");

//   // listening for message from front end
//   socket.on("sendmessage", (message) => {
//     // console.log(message);
//     io.emit("chatmessage", message);
//   });

//   // typing message from front end
//   socket.on("typing", (message) => {
//     // console.log(message);
//     socket.broadcast.emit("istyping", message);
//   });

//   // will be sent to everyone but the sender
//   socket.broadcast.emit("testmessage", "Someone new just joined the class");

//   socket.on("disconnect", () => {
//     // to everyone including me
//     io.emit("testmessage", "user has left the room");
//   });
// });

// http.listen(process.env.PORT, () =>
//   console.log(`running express app ${process.env.PORT}`)
// );