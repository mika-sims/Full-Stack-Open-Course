import React, { useEffect, useState } from "react";
import axios from "axios";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const personToUpdate = persons.find((person) => person.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (personToUpdate) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
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
        setPersons(persons.concat(updatedPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  const updatePerson = (e, personToUpdate, newNumber) => {
    const updatedPerson = { ...personToUpdate, number: newNumber };

    personService
      .update(personToUpdate.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== personToUpdate.id ? person : returnedPerson
          )
        );
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        alert(
          `the person '${personToUpdate.name}' was already deleted from server`
        );
        setPersons(persons.filter((p) => p.id !== personToUpdate.id));
      });
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const result = window.confirm(`Delete ${person.name} ?`);

    if (result) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`the person '${person.name}' was already deleted from server`);
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
