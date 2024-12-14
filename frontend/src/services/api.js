import axios from 'axios';

// Configuration de base pour Axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Assurez-vous que cette URL pointe vers votre backend
});

// Récupérer tous les étudiants
export const getUsers = async () => {
  const response = await api.get('/etudiants');
  return response.data; // Retourne uniquement les données
};

// Récupérer un étudiant par son ID
export const getUserById = async (id) => {
  const response = await api.get(`/etudiants/${id}`);
  return response.data; // Retourne uniquement les données
};

// Ajouter un nouvel étudiant
export const addUser = async (user) => {
  const response = await api.post('/etudiants', user);
  return response.data; // Retourne uniquement les données de l'utilisateur créé
};

// Mettre à jour un étudiant existant
export const updateUser = async (id, user) => {
  const response = await api.put(`/etudiants/${id}`, user);
  return response.data; // Retourne uniquement les données de l'utilisateur mis à jour
};

// Supprimer un étudiant par son ID
export const deleteUser = async (id) => {
  await api.delete(`/etudiants/${id}`);
};
