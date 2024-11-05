import React, { useState } from 'react';
import './wings.css';

const UserManagement = ({ users, setUsers }) => {
    const [newUser, setNewUser] = useState({ username: '', password: '' });
    const [editUser, setEditUser] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editUser) {
            const updatedUsers = users.map(user => 
                user.username === editUser.username ? {user,newUser } : user
            );
            setUsers(updatedUsers);
            setEditUser(null);
        } else {
            setUsers([...users, newUser]);
        }
        setNewUser({ username: '', password: '' });
    };

    const handleDelete = (username) => {
        setUsers(users.filter(user => user.username !== username));
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setNewUser({ username: user.username, password: user.password });
    };

    return (
        <div>
            <h1>User Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={e => setNewUser({newUser, username: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={e => setNewUser({newUser, password: e.target.value })}
                    required
                />
                <button type="submit">{editUser ? 'Update User' : 'Add User'}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.username)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default UserManagement;