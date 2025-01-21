import express from "express";

const app = express();
const port = 3000;

// middleware to parse json bodies
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })

// app.get('/ice-tea', (req, res) => {
//     res.send('Chai is ready ');
// })

// taking user side data

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// giving unique id to each tea
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (tea) {
    res.status(200).send(tea);
  } else {
    res.status(404).send("Tea not found");
  }
});

// update a tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (tea) {
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
  } else {
    res.status(404).send("Tea not found");
  }
});


// delete a tea
app.delete("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (tea) {
    const index = teaData.indexOf(tea);
    teaData.splice(index, 1);
    res.status(204).send('Deleted');
  } else {
    res.status(404).send("Tea not found");
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
