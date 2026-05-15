import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ParticleBackground from '../components/ParticleBackground';
import { getUsers, deleteUser, updateUser } from '../services/api';
import './Dashboard.css';
import './Management.css';

function UserBase() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setError('Failed to load users');
    }
  };

  const handleDeleteUser = async (id, username) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        alert('Error deleting user.');
      }
    }
  };

  const handleEditUser = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Change role of "${user.username}" to "${newRole}"?`)) {
      try {
        await updateUser(user.user_id, { role: newRole }); // 👈 Ab ye function sahi chalega
        fetchUsers();
      } catch (err) {
        alert('Error updating user role.');
      }
    }
  };

  return (
    <div className="admin-root-container">
      <ParticleBackground count={10} />
      <Sidebar />
      <main className="admin-main-wrapper">
        <header className="admin-page-header">
          <div className="header-text">
            <h1>User Management</h1>
            <p>Monitor and control platform access for all users.</p>
          </div>
        </header>

        <div className="dashboard-scroll-area">
          {error && <p className="error-message-pro">{error}</p>}
          <div className="table-card-pro">
            <h2 className="table-title-pro">Platform Users ({users.length})</h2>
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.user_id}>
                    <td>
                      <div className="user-cell-pro">
                        <div className="user-avatar-small">
                          {u.username ? u.username[0].toUpperCase() : 'U'}
                        </div>
                        <strong>{u.username}</strong>
                      </div>
                    </td>
                    <td><span className="badge-pro">{u.role}</span></td>
                    <td><span className="status-dot-small"></span> Active</td>
                    <td>
                      <button className="btn-edit-pro" onClick={() => handleEditUser(u)}>Edit Role</button>
                      <button className="btn-delete-pro" onClick={() => handleDeleteUser(u.user_id, u.username)}>Delete</button>
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

export default UserBase;
