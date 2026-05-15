import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ParticleBackground from '../components/ParticleBackground';
import { getCharacters, createCharacter, updateCharacter, deleteCharacter } from '../services/api';
import AnimatedCharacter from '../components/AnimatedCharacter';
import './Management.css';
import './Dashboard.css';

function CharacterManagement() {
  const [characters, setCharacters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [previewCharacter, setPreviewCharacter] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    animation_type: 'static',
    animation_url: ''
  });

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    if (showForm && formData.name) {
      setPreviewCharacter({
        ...formData,
        character_id: 'preview'
      });
    }
  }, [formData, showForm]);

  const fetchCharacters = async () => {
    try {
      const response = await getCharacters();
      setCharacters(response.data || []);
    } catch (error) {
      console.error('Error:', error);
      setCharacters([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateCharacter(currentId, formData);
      } else {
        await createCharacter(formData);
      }
      resetForm();
      fetchCharacters();
    } catch (error) {
      alert('Error saving character');
    }
  };

  const handleEdit = (character) => {
    setFormData({
      name: character.name,
      role: character.role,
      description: character.description,
      animation_type: character.animation_type || 'static',
      animation_url: character.animation_url || ''
    });
    setCurrentId(character.character_id);
    setEditMode(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', description: '', animation_type: 'static', animation_url: '' });
    setShowForm(false);
    setEditMode(false);
    setCurrentId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      try {
        await deleteCharacter(id);
        fetchCharacters();
      } catch (error) {
        alert('Error deleting character');
      }
    }
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  return (
    <div className="admin-root-container">
      <ParticleBackground count={10} />
      <Sidebar />
      
      <main className="admin-main-wrapper">
        <header className="admin-page-header">
          <div className="header-text">
            <h1>Character Hub</h1>
            <p>Design and manage your magical narrators.</p>
          </div>
          <button className="btn-primary-pro" onClick={showForm ? resetForm : handleAddNew}>
            {showForm ? '✕ Close Form' : '+ New Character'}
          </button>
        </header>

        <div className="dashboard-scroll-area">
          {showForm && (
            <div className="form-card-pro">
              <div className="form-grid-split">
                <div className="form-main">
                  <h3>{editMode ? 'Edit Character' : 'Create New Character'}</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group-pro">
                      <label>Character Name</label>
                      <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="form-row-pro">
                      <div className="form-group-pro">
                        <label>Role</label>
                        <select name="role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required>
                          <option value="">Select Role</option>
                          <option value="Narrator">Narrator</option>
                          <option value="Hero">Hero</option>
                          <option value="Teacher">Teacher</option>
                        </select>
                      </div>
                      <div className="form-group-pro">
                        <label>Type</label>
                        <select name="animation_type" value={formData.animation_type} onChange={(e) => setFormData({...formData, animation_type: e.target.value})}>
                          <option value="static">Static Image</option>
                          <option value="lottie">Lottie Animation</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group-pro">
                      <label>Lottie URL (if type is Lottie)</label>
                      <input type="text" name="animation_url" value={formData.animation_url} onChange={(e) => setFormData({...formData, animation_url: e.target.value})} />
                    </div>
                    <div className="form-actions-pro">
                      <button type="submit" className="btn-primary-pro">Save Character</button>
                      <button type="button" className="btn-secondary-pro" onClick={resetForm}>Cancel</button>
                    </div>
                  </form>
                </div>
                <div className="preview-pane-pro">
                   <h3>Live Preview</h3>
                   <div className="preview-box">
                      {previewCharacter && <AnimatedCharacter character={previewCharacter} size="large" />}
                   </div>
                </div>
              </div>
            </div>
          )}

          <div className="table-card-pro">
            <h2 className="table-title-pro">Existing Characters</h2>
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Visual</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {characters.map((char) => (
                  <tr key={char.character_id}>
                    <td>
                      <div className="table-visual-box">
                        <AnimatedCharacter character={char} size="small" />
                      </div>
                    </td>
                    <td><strong>{char.name}</strong></td>
                    <td><span className="badge-pro">{char.role}</span></td>
                    <td><span className="status-dot-small"></span> Active</td>
                    <td>
                      <button className="btn-edit-pro" onClick={() => handleEdit(char)}>Edit</button>
                      <button className="btn-delete-pro" onClick={() => handleDelete(char.character_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CharacterManagement;