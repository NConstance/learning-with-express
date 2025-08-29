const { error } = require("console");
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
    id: 1,
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

// get request - grab existing data
app.get("/", (req, res) => {
  res.json("Hi, welcome to our server.");
});

app
  .route("/users")
  .get((req, res) => {
    // retrun the users data
    res.json(userData);
  })
  .post((req, res) => {
    try {
      // grab the data the client enter through req.body
      let data = req.body;

      // push data from client into the userData
      userData.push(data);
      res.json(userData);
    } catch (err) {
      console.log("Error: ", err);
      res.json("An error has occurred");
    }
  });

app
  .route("/users/:id")
  .get((req, res) => {
    // we grab the id the client entered from the parameters
    try {
      let id = req.params.id;

      // we access our array of objects to find the id entered.
      let result = userData.filter((i) => i.id == id);
      res.json(result);
    } catch (err) {
      console.log("Error: ", err);
      res.json("An error has occurred");
    }
  })
  .put((req, res) => {
    try {
      //   res.json("This is a put request");
      // get the id of the data the client wants to change/update
      let id = req.params.id;
      let data = req.body;

      // find the data that matches the id entered by the client
      let oldDataIndex = userData.findIndex((i) => i.id == id);
      //   res.json(oldData);

      // change/update the data
      userData[oldDataIndex] = data;

      // send data back to client
      res.json(userData[oldDataIndex]);
      //   console.log(userData);
    } catch (err) {
      console.log("Error:", err);
      res.json("An error has occurred");
    }
  })
  .delete((req, res) => {
    try {
      //   res.json("This is a delete request");
      // grab the id of the data the client wants to delete
      let id = req.params.id;
      // find the index of the data
      let oldDataIndex = userData.findIndex((i) => i.id == id);
      // remove the data
      userData.splice(oldDataIndex, 1);

      res.json(`${id} has been delated current database`);

      console.log(userData);
    } catch (err) {
      console.log("Error:", err);
      res.json("An error has occurred");
    }
  });

// app.get("/users", (req, res) => {
//   // retrun the users data
//   res.json(userData);
// });

// // post request - create new data
// app.post("/users", (req, res) => {
//   try {
//     // grab the data the client enter through req.body
//     let data = req.body;

//     // push data from client into the userData
//     userData.push(data);
//     res.json(userData);
//   } catch (err) {
//     console.log("Error: ", err);
//     res.json("An error has occurred");
//   }
// });

// create a get route to only get one rout based on the id
// app.get("/users/:id", (req, res) => {
//   // we grab the id the client entered from the parameters
//   try {
//     let id = req.params.id;

//     // we access our array of objects to find the id entered.
//     let result = userData.filter((i) => i.id == id);
//     res.json(result);
//   } catch (err) {
//     console.log("Error: ", err);
//     res.json("An error has occurred");
//   }
// });

// // put request- updating exist data
// app.put("/users/:id", (req, res) => {
//   try {
//     //   res.json("This is a put request");
//     // get the id of the data the client wants to change/update
//     let id = req.params.id;
//     let data = req.body;

//     // find the data that matches the id entered by the client
//     let oldDataIndex = userData.findIndex((i) => i.id == id);
//     //   res.json(oldData);

//     // change/update the data
//     userData[oldDataIndex] = data;

//     // send data back to client
//     res.json(userData[oldDataIndex]);
//     //   console.log(userData);
//   } catch (err) {
//     console.log("Error:", err);
//     res.json("An error has occurred");
//   }
// });
// // delete request- deleting esixting
// app.delete("/users/:id", (req, res) => {
//   try {
//     //   res.json("This is a delete request");
//     // grab the id of the data the client wants to delete
//     let id = req.params.id;
//     // find the index of the data
//     let oldDataIndex = userData.findIndex((i) => i.id == id);
//     // remove the data
//     userData.splice(oldDataIndex, 1);

//     res.json(`${id} has been delated current database`);

//     console.log(userData);
//   } catch (err) {
//     console.log("Error:", err);
//     res.json("An error has occurred");
//   }
// });

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
