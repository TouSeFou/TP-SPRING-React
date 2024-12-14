import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
  });

  // Fill the form with the user's data in edit mode
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    const url = user ? `http://localhost:8080/api/etudiants/${user.id}` : 'http://localhost:8080/api/etudiants';
    const method = user ? 'PUT' : 'POST'; // PUT for editing, POST for adding

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la soumission du formulaire');
      }

      const savedUser = await response.json(); // Fetch the newly created/updated user from the response

      // Call the parent's onSubmit with the saved user to refresh the list
      onSubmit();

      // Reset the form after submission
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{user ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}</h2>
      <div style={styles.formGroup}>
        <label>Nom :</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label>Prénom :</label>
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label>Téléphone :</label>
        <input
          type="number"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.button}>{user ? 'Modifier' : 'Ajouter'}</button>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default UserForm;
