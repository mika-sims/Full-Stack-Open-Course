import React from "react";
import Weather from "./Weather";

const CountryDetails = ({ country, goBack, handleMessages }) => {
  const [lat, lon] = country.capitalInfo;
  if (country === null) {
    return null;
  }
  return (
    <div>
      <button className="button" onClick={goBack}>
        Go Back
      </button>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} &#13218;</p>
      <p>Population: {country.population}</p>
      <p>Languages: {country.languages.join(", ")}</p>
      <img
        src={country.flag}
        alt={country.flag_alt}
        style={{ width: "100px" }}
      />
      <Weather lat={lat} lon={lon} handleMessages={handleMessages} />
    </div>
  );
};

export default CountryDetails;
