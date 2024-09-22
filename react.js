import React, { useState } from 'react';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setJsonData(e.target.value);
  };

  const handleOptionChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const handleSubmit = async () => {
    try {
      if (!jsonData) {
        setError('Please provide valid JSON data.');
        return;
      }

      const parsedData = JSON.parse(jsonData); // Parse input as JSON
      const response = await fetch('http://127.0.0.1:5000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: parsedData }), // Send as JSON
      });
      const data = await response.json();
      setResponseData(data);
      setError(null); // Clear error if successful
    } catch (error) {
      setError('Invalid input or server error');
    }
  };

  return (
    <div className="App">
      <h1>Frontend Application</h1>
      <textarea
        value={jsonData}
        onChange={handleInputChange}
        placeholder="Enter JSON here"
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <select multiple={true} onChange={handleOptionChange}>
        <option value="numbers">Numbers</option>
        <option value="alphabets">Alphabets</option>
        <option value="highest_lowercase_alphabet">
          Highest Lowercase Alphabet
        </option>
      </select>

      {responseData && (
        <div>
          <h3>Response Data:</h3>
          {selectedOptions.includes('numbers') && (
            <p>Numbers: {responseData.numbers.join(', ')}</p>
          )}
          {selectedOptions.includes('alphabets') && (
            <p>Alphabets: {responseData.alphabets.join(', ')}</p>
          )}
          {selectedOptions.includes('highest_lowercase_alphabet') && (
            <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
