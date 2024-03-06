const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, addPerson }) => (
    <form onSubmit={addPerson}>
        <div>
            <label htmlFor="nameInput">Name:</label>
            <input id="nameInput" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
            <label htmlFor="numberInput">Number:</label>
            <input
                id="numberInput"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
            />
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
);

export default PersonForm;