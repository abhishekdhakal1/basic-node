//building https server
//try doing async programmming..Non-blockable

//const http = require("http");

const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("This is aweesome");
  req.name = "Abhishek Dhakal"; // available in any middleware below it
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

app.post("/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

//const myServer = http.createServer(app);

app.listen(3000, () => {
  console.log("served stared");
});
