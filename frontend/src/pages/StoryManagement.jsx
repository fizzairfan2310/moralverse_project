import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ParticleBackground from '../components/ParticleBackground';
import { getStories, createStory, updateStory, deleteStory, getCharacters } from '../services/api';
import './Management.css';
import './Dashboard.css';

function StoryManagement() {
  const [stories, setStories] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    moral_lesson: '',
    story_text: '',
    character_id: ''
  });

  useEffect(() => {
    fetchStories();
    fetchCharacters();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await getStories();
      setStories(response.data || []);
    } catch (error) {
      console.error('Error:', error);
      setStories([]);
    }
  };

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
        await updateStory(currentId, formData);
      } else {
        await createStory(formData);
      }
      resetForm();
      fetchStories();
    } catch (error) {
      alert('Error saving story');
    }
  };

  const handleEdit = (story) => {
    setFormData({
      title: story.title,
      moral_lesson: story.moral_lesson,
      story_text: story.story_text,
      character_id: story.character_id
    });
    setCurrentId(story.story_id);
    setEditMode(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', moral_lesson: '', story_text: '', character_id: '' });
    setShowForm(false);
    setEditMode(false);
    setCurrentId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await deleteStory(id);
        fetchStories();
      } catch (error) {
        alert('Error deleting story');
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
            <h1>Story Archive</h1>
            <p>Write and moderate magical moral stories.</p>
          </div>
          <button className="btn-primary-pro" onClick={showForm ? resetForm : handleAddNew}>
            {showForm ? '✕ Close Form' : '+ Write Story'}
          </button>
        </header>

        <div className="dashboard-scroll-area">
          {showForm && (
            <div className="form-card-pro">
              <h3>{editMode ? 'Edit Story' : 'New Moral Story'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row-pro">
                  <div className="form-group-pro">
                    <label>Story Title</label>
                    <input type="text" name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="form-group-pro">
                    <label>Assign Narrator</label>
                    <select name="character_id" value={formData.character_id} onChange={(e) => setFormData({...formData, character_id: e.target.value})} required>
                      <option value="">Select Character</option>
                      {characters.map(c => <option key={c.character_id} value={c.character_id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group-pro">
                  <label>Moral Lesson</label>
                  <input type="text" name="moral_lesson" value={formData.moral_lesson} onChange={(e) => setFormData({...formData, moral_lesson: e.target.value})} required />
                </div>
                <div className="form-group-pro">
                  <label>Story Content</label>
                  <textarea name="story_text" value={formData.story_text} onChange={(e) => setFormData({...formData, story_text: e.target.value})} rows="8" required />
                </div>
                <div className="form-actions-pro">
                  <button type="submit" className="btn-primary-pro">Publish Story</button>
                  <button type="button" className="btn-secondary-pro" onClick={resetForm}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="table-card-pro">
            <h2 className="table-title-pro">Published Stories</h2>
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Narrator</th>
                  <th>Moral</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((story) => (
                  <tr key={story.story_id}>
                    <td><strong>{story.title}</strong></td>
                    <td>{characters.find(c => c.character_id === story.character_id)?.name || 'Unknown'}</td>
                    <td><span className="moral-tag-pro">{story.moral_lesson}</span></td>
                    <td>
                      <button className="btn-edit-pro" onClick={() => handleEdit(story)}>Edit</button>
                      <button className="btn-delete-pro" onClick={() => handleDelete(story.story_id)}>Delete</button>
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

export default StoryManagement;