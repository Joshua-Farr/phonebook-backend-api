const data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const express = require("express");

const app = express();

const getNumberOfEntries = () => {
  return data.length;
};

app.get("/api/persons", (request, response) => {
  response.send(data);
});

app.get("/info", (request, response) => {
  const timeStamp = new Date();
  const utcTime = timeStamp.toUTCString(); // Formatting time to UTC
  const html = `<p>Phonebook has info for ${getNumberOfEntries()} people.</p><p>${utcTime}</p>`; // Raw HTML that is sent back as a response
  response.send(html);
});

// Finding individual person
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = data.find((person) => {
    return person.id === Number(id); // Changing param to number instead of string
  });

  console.log("Here is the person: ", person);

  if (person) {
    response.json(person);
  } else {
    response.status(400).end();
    console.log(`Unable to find person with id of ${id}`);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  const newListOfPeople = data.filter((note) => {
    return Number(note.id) !== Number(id);
  });

  console.log("Here is the new list of numbers: ", newListOfPeople);

  response.json(newListOfPeople);
});

app.set("port", 3001);

app.listen(3001);
