import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';

const UserDetails = ({ userId, onEdit, onDelete }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const users = await getUsers();
        const selectedUser = users.find((u) => u.id === userId);
        setUser(selectedUser);
      } catch (error) {
        console.error("Erreur lors du chargement des détails de l'utilisateur :", error);
      }
    };

    if (userId) {
      loadUser();
    }
  }, [userId]);

  const handleDelete = async () => {
    if (window.confirm(`Voulez-vous vraiment supprimer ${user.nom} ${user.prenom} ?`)) {
      try {
        await deleteUser(user.id);
        onDelete(user.id); // Notify the parent component about the deletion
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    }
  };

  if (!user) {
    return <div>Chargement des détails...</div>;
  }

  return (
    <div style={styles.userDetails}>
      <h2>Détails de l'utilisateur</h2>
      <p><strong>Nom:</strong> {user.nom}</p>
      <p><strong>Prenom:</strong> {user.prenom}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Telephone:</strong> {user.telephone}</p>
      <button onClick={() => onEdit(user)} style={styles.button}>Modifier</button>
      <button onClick={handleDelete} style={{ ...styles.button, backgroundColor: '#dc3545' }}>Supprimer</button>
    </div>
  );
};

const styles = {
  userDetails: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginRight: '10px',
  },
};

export default UserDetails;
