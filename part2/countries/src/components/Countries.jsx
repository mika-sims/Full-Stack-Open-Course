const Countries = ({ filteredCountries, searchQuery, showCountryDetails }) => {
  if (!searchQuery) {
    return <p>Please enter a country name.</p>;
  } else if (filteredCountries.length > 10) {
    return <p>Too many matches, please make your query more specific.</p>;
  } else if (filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <div className="container" key={country.id}>
            <li>{country.name} </li>
            <button
              className="button"
              onClick={() => showCountryDetails(country)}
            >
              Show Details
            </button>
          </div>
        ))}
      </ul>
    );
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} square kilometers</p>
        <p>Population: {country.population}</p>
        <p>Languages: {country.languages.join(", ")}</p>
        <img
          src={country.flag}
          alt={country.flag_alt}
          style={{ width: "100px" }}
        />
      </div>
    );
  } else {
    return <p>No matches found.</p>;
  }
};

export default Countries;
