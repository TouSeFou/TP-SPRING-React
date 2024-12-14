import React, { useState, useEffect } from 'react';

const UserList = ({ onSelectUser }) => {
  const [etudiants, setEtudiants] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch students from the API
  const fetchEtudiants = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/etudiants');
      if (!response.ok) {
        throw new Error('Erreur de chargement des étudiants');
      }
      const data = await response.json();
      setEtudiants(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Erreur lors de la récupération des étudiants:', err);
      setError('Impossible de charger les données.');
    }
  };

  // Fetch data on mount and set up auto-refresh
  useEffect(() => {
    fetchEtudiants(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchEtudiants(); // Auto-refresh every 10 seconds
    }, 10000);

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.list}>
        <h2>Liste des étudiants</h2>
        {error && <p style={styles.error}>{error}</p>}
        <ul style={styles.listItems}>
          {etudiants.map((etudiant) => (
            <li
              key={etudiant.id}
              onClick={() => onSelectUser(etudiant.id)}
              style={styles.listItem}
            >
              <strong>{etudiant.nom} {etudiant.prenom}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  list: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '800px',
  },
  listItems: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    padding: '15px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
};

export default UserList;
