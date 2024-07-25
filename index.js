//building https server
//try doing async programmming..Non-blockable

//const http = require("http");

const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");

const app = express();

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/newdb")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo err", err));

//schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastNmae: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});

//model

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("This is aweesome");
  req.name = "Example Name"; // available in any middleware below it
  //return res.json({status : "sent"});
  next();
});

app.use((req, res, next) => {
  console.log(req.name); //using the upper middleware name;
  next();
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.get("/api/  users", (req, res) => {
  return res.json(users);
});

//app.delete("/api/users/:id", (req, res) => {
// const id = Number(req.params.id);
// const user = users.find((user) => user.id === id);

// if(user){
//   users = users.filter((e) => e.id !==id);
// }
// return res.json(user);
//});

app.get("/users", (req, res) => {
  const html = `<ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`;
  res.send(html);
});

app.post("/users", async (req, res) => {
  
  const body = req.body;
  if (!body || !body.first_name || !body.last_name || !body.email) {
    res.status(400).json({ msg: "all fiels are required..." });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastNmae: body.last_name,
    email: body.email,
  });

  console.log("result", result);

  return res.status(201).json({ msg: "success" });
});

//const myServer = http.createServer(app);

app.listen(3000, () => {
  console.log("served stared");
});
