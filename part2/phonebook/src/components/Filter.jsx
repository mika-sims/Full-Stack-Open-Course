const Filter = ({ searchPerson, handleSearch }) => (
    <div>
        Search:{" "}
        <input
            value={searchPerson}
            onChange={(e) => handleSearch(e)}
            placeholder="Search person"
        />
    </div>
);

export default Filter;