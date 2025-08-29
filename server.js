const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

const userData = [
  {
    id: 0,
    username: "jane doe",
    age: 50,
    password: "password",
    zipcode: 12345,
  },
  {
    id: 12,
    username: "john smith",
    age: 34,
    password: "newpassword",
    zipcode: 54321,
  },
  {
    id: 2,
    username: "mike jones",
    age: 100,
    password: "newerpassword",
    zipcode: 13243,
  },
];

// get request
app.get("/", (req, res) => {
  res.json("Hi, welcome to our server.");
});

app.get("/users", (req, res) => {
  // retrun the users data
  res.json(userData);
});

// create a get route to only get one rout based on the id
app.get("/users/:id", (req, res) => {
  // we grab the id the client entered from the parameters
  let id = req.params.id;

  // we access our array of objects to find the id entered.
  let result = userData.filter((i) => i.id == id);
  res.json(result);
});

// post request
app.post("/", (req, res) => {
  res.json("This is a post request");
});

// put request
app.put("/:id", (req, res) => {
  res.json("This is a put request");
});
// delete request
app.delete("/:id", (req, res) => {
  res.json("This is a delete request");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
