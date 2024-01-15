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

app.use(express.json());

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

const checkContainsName = (name, phonelist) => {
  let contains = false;

  phonelist.forEach((number) => {
    if (number.name === name) {
      contains = true;
    }
  });

  return contains;
};

app.post("/api/persons", (request, response) => {
  const randomID = Math.floor(Math.random() * 1000000);

  const body = request.body;

  if (checkContainsName(body.name, data)) {
    return response
      .status(400)
      .send({ error: "Entry already exists in the phonebook!" });
  } else if (body.name && body.number) {
    const newEntry = {
      id: randomID,
      name: body.name,
      number: body.number,
    };

    const updatedData = data.concat(newEntry);
    console.log(`Successfully added ${newEntry.name} to the phonelist!`);
    return response.json(updatedData);
  } else {
    return response.status(400).send({ error: "Missing name or number!" });
  }
});

app.set("port", 3001);

app.listen(3001);
