import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import { getUsers, addUser, updateUser } from './services/api'; // Importer les fonctions de l'API

const App = () => {
  const [users, setUsers] = useState([]); // Liste des utilisateurs récupérés de l'API
  const [selectedUserId, setSelectedUserId] = useState(null); // ID de l'utilisateur sélectionné
  const [isEditing, setIsEditing] = useState(false); // Mode édition
  const [userToEdit, setUserToEdit] = useState(null); // Données de l'utilisateur à modifier

  // Charger les utilisateurs à partir de l'API au chargement du composant
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers(); // Récupérer les utilisateurs via l'API
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs :', error);
    }
  };

  // Fonction appelée lorsqu'un utilisateur est sélectionné
  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    setIsEditing(false); // Sort du mode modification
  };

  // Fonction appelée lorsqu'on clique sur le bouton "Modifier"
  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsEditing(true); // Active le mode modification
  };

  // Fonction pour soumettre le formulaire (ajout ou modification)
  const handleFormSubmit = async (user) => {
    try {
      if (user.id) {
        // Modification
        await updateUser(user.id, user);
      } else {
        // Ajout
        await addUser(user);
      }
      setIsEditing(false); // Sort du mode modification
      setSelectedUserId(null); // Réinitialise la sélection
      setUserToEdit(null); // Réinitialise l'utilisateur à modifier
      loadUsers(); // Recharger la liste des utilisateurs
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      padding: '10px',
    },
    leftColumn: {
      width: '30%',
      padding: '10px',
      borderRight: '1px solid #ccc',
      boxSizing: 'border-box',
    },
    rightColumn: {
      flex: 1,
      padding: '10px',
      boxSizing: 'border-box',
    },
    button: {
      padding: '10px 15px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      marginBottom: '20px',
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
    },
  };

  return (
    <div style={styles.container}>
      {/* Liste des utilisateurs */}
      <div style={styles.leftColumn}>
        <button
          style={styles.button}
          onClick={() => {
            setIsEditing(true);
            setUserToEdit(null); // Réinitialise les données de l'utilisateur à ajouter
          }}
        >
          Ajouter un utilisateur
        </button>
        <UserList users={users} onSelectUser={handleSelectUser} />
      </div>

      {/* Détails de l'utilisateur ou formulaire */}
      <div style={styles.rightColumn}>
        {isEditing ? (
          <UserForm user={userToEdit} onSubmit={handleFormSubmit} />
        ) : selectedUserId ? (
          <UserDetails userId={selectedUserId} onEdit={handleEditUser} />
        ) : (
          <div>Sélectionnez un utilisateur pour voir les détails ou ajoutez-en un.</div>
        )}
      </div>
    </div>
  );
};

export default App;
