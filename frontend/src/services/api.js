import axios from 'axios';

const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api'; // This will be proxied or handled by the hosting provider

// Character APIs
export const getCharacters = () => axios.get(`${API_BASE}/characters`);
export const getCharacter = (id) => axios.get(`${API_BASE}/characters/${id}`);
export const createCharacter = (data) => axios.post(`${API_BASE}/characters`, data);
export const updateCharacter = (id, data) => axios.put(`${API_BASE}/characters/${id}`, data);
export const deleteCharacter = (id) => axios.delete(`${API_BASE}/characters/${id}`);

// Story APIs
export const getStories = () => axios.get(`${API_BASE}/stories`);
export const getStory = (id) => axios.get(`${API_BASE}/stories/${id}`);
export const createStory = (data) => axios.post(`${API_BASE}/stories`, data);
export const updateStory = (id, data) => axios.put(`${API_BASE}/stories/${id}`, data);
export const deleteStory = (id) => axios.delete(`${API_BASE}/stories/${id}`);

// User APIs
export const signup = (data) => axios.post(`${API_BASE}/signup`, data);
export const login = (data) => axios.post(`${API_BASE}/login`, data);
export const getUsers = () => axios.get(`${API_BASE}/users`);
export const deleteUser = (id) => axios.delete(`${API_BASE}/users/${id}`);
export const updateUser = (id, data) => axios.put(`${API_BASE}/users/${id}`, data);