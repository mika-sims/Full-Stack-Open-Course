import React, { useEffect, useState } from "react";
import "./index.css";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [messages, setMessages] = useState();

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => handleMessages(error.message));
  }, []);

  const handleMessages = (message, timeout = 3000) => {
    setMessages(message);
    setTimeout(() => {
      setMessages(null);
    }, timeout);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const personToUpdate = persons.find((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (personToUpdate) {
      const result = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );

      if (result) {
        updatePerson(e, personToUpdate, newNumber);
        return;
      } else {
        return;
      }
    }

    personService
      .create(newPerson)
      .then((updatedPerson) => {
        setPersons([...persons, updatedPerson]);
        setNewName("");
        setNewNumber("");
        handleMessages("Person added successfully");
      })
      .catch((error) => handleMessages(error.message));
  };

  const updatePerson = (e, personToUpdate, newNumber) => {
    e.preventDefault();
    const updatedPerson = { ...personToUpdate, number: newNumber };

    personService
      .update(personToUpdate.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id !== personToUpdate.id ? person : returnedPerson
          )
        );
        setNewName("");
        setNewNumber("");
        handleMessages("Person updated successfully");
      })
      .catch((error) => {
        handleMessages(error.message, 3000);
        console.log(error);
      });
    setPersons(persons.filter((p) => p.id !== personToUpdate.id));
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const result = window.confirm(`Delete ${person.name}?`);

    if (result) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
          handleMessages("Person deleted successfully");
        })
        .catch((error) => {
          handleMessages(error.message, 3000);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  const handleSearch = (e) => {
    setSearchPerson(e.target.value);
    setShowAll(false);
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchPerson.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messages} />

      <Filter searchPerson={searchPerson} handleSearch={handleSearch} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
