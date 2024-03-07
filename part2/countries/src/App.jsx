import React, { useState, useEffect } from "react";
import "./App.css";

import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";
import countryService from "../services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [messages, setMessages] = useState();
  useEffect(() => {
    countryService
      .getAll()
      .then((data) => {
        const countries = data.map((country) => {
          return {
            id: country.cca3,
            name: country.name.common,
            area: country.area,
            population: country.population,
            flag: country.flags.png,
            flag_alt: country.flags.alt,
            languages:
              country.languages instanceof Object
                ? Object.values(country.languages)
                : [],
            capital: country.capital instanceof Array ? country.capital : [],
            capitalInfo:
              country.capitalInfo.latlng instanceof Array
                ? country.capitalInfo.latlng
                : [],
          };
        });
        setCountries(countries);
      })
      .catch((error) => {
        handleMessages(error.message);
      });
  }, []);

  const handleMessages = (message, timeout = 3000) => {
    setMessages(message);
    setTimeout(() => {
      setMessages(null);
    }, timeout);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="App">
      <h1>List of Countries</h1>
      {messages && <div className="info-message">{messages}</div>}
      <input
        className="input"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a country"
      />
      {selectedCountry ? (
        <CountryDetails
          country={selectedCountry}
          goBack={() => setSelectedCountry(null)}
        />
      ) : (
        <Countries
          filteredCountries={filteredCountries}
          searchQuery={searchQuery}
          showCountryDetails={showCountryDetails}
        />
      )}
    </div>
  );
};

export default App;
