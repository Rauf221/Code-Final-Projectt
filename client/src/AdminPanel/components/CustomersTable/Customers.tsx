"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { Users, Trash2, Plus } from 'lucide-react';
import { useDarkMode } from '../../../DarkMode/Darkmode'; // Adjust import path as needed

// User interface to define the structure of user data
interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

// New interface for creating a user
interface CreateUserForm {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export default function UserManagementTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<CreateUserForm>({
    username: '',
    email: '',
    password: '',
    isAdmin: false
  });

  const { darkMode } = useDarkMode();

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:2000/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  // Create User
  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });
      
      if (response.ok) {
        const createdUser = await response.json();
        setUsers([...users, createdUser]);
        setIsCreateModalOpen(false);
        // Reset form
        setNewUser({
          username: '',
          email: '',
          password: '',
          isAdmin: false 
        });
        alert('User created successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create user');
    }
  };

  // Delete User
  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:2000/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Remove the user from the local state
        setUsers(users.filter(user => user._id !== userId));
        alert('User deleted successfully');
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete user');
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className={`
        flex justify-center items-center h-screen
        ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}
      `}>
        <div className="flex items-center">
          <Users className="mr-2 animate-pulse" />
          <span>Loading users...</span>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={`
        flex justify-center items-center h-screen
        ${darkMode ? 'bg-gray-900 text-red-400' : 'bg-white text-red-600'}
      `}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button 
            onClick={fetchUsers}
            className={`
              mt-4 px-4 py-2 rounded
              ${darkMode 
                ? 'bg-blue-700 text-white hover:bg-blue-600' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }
            `}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 
      ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}
    `}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className={`
            flex items-center px-4 py-2 rounded
            ${darkMode 
              ? 'bg-green-700 text-white hover:bg-green-600' 
              : 'bg-green-500 text-white hover:bg-green-600'
            }
          `}
        >
          <Plus className="mr-2 h-5 w-5" /> Create User
        </button>
      </div>

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className={`
              relative flex flex-col w-[400px] border-0 rounded-lg shadow-lg
              ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}
            `}>
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                <h3 className="text-2xl font-semibold">Create New User</h3>
                <button
                  className={`
                    ml-auto bg-transparent border-0  opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none
                    ${darkMode ? 'text-white' : 'text-black'}
                  `}
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleCreateUser} className="relative p-6 flex-auto">
                <div className="mb-4">
                  <label 
                    htmlFor="username" 
                    className="block text-sm font-medium mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    required
                    className={`
                      w-full px-3 py-2 rounded
                      ${darkMode 
                        ? 'bg-gray-700 text-gray-200 border-gray-600' 
                        : 'bg-gray-100 text-gray-800 border-gray-300'
                      }
                    `}
                  />
                </div>
                <div className="mb-4">
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    required
                    className={`
                      w-full px-3 py-2 rounded
                      ${darkMode 
                        ? 'bg-gray-700 text-gray-200 border-gray-600' 
                        : 'bg-gray-100 text-gray-800 border-gray-300'
                      }
                    `}
                  />
                </div>
                <div className="mb-4">
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    required
                    className={`
                      w-full px-3 py-2 rounded
                      ${darkMode 
                        ? 'bg-gray-700 text-gray-200 border-gray-600' 
                        : 'bg-gray-100 text-gray-800 border-gray-300'
                      }
                    `}
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    checked={newUser.isAdmin}
                    onChange={(e) => setNewUser({...newUser, isAdmin: e.target.checked})}
                    className="mr-2"
                  />
                  <label 
                    htmlFor="isAdmin" 
                    className="text-sm font-medium"
                  >
                    Admin User
                  </label>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className={`
                      mr-4 px-4 py-2 rounded
                      ${darkMode 
                        ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }
                    `}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`
                      px-4 py-2 rounded
                      ${darkMode 
                        ? 'bg-blue-700 text-white hover:bg-blue-600' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                      }
                    `}
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className={`
          w-full shadow-md rounded-lg overflow-hidden
          ${darkMode 
            ? 'bg-gray-800 text-gray-200 border-gray-700' 
            : 'bg-white text-gray-800'
          }
        `}>
          <thead className={`
            ${darkMode 
              ? 'bg-gray-700 text-gray-200' 
              : 'bg-gray-100 text-gray-700'
            }
          `}>
            <tr>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user._id} 
                className={`
                  border-b
                  ${darkMode 
                    ? 'hover:bg-gray-700 border-gray-700' 
                    : 'hover:bg-gray-50 border-gray-200'
                  }
                `}
              >
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`
                    px-2 py-1 rounded text-xs
                    ${user.isAdmin === true 
                      ? (darkMode ? 'bg-red-800 text-red-200' : 'bg-red-200 text-red-800')
                      : (darkMode ? 'bg-green-800 text-green-200' : 'bg-green-200 text-green-800')
                    }
                  `}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex justify-center space-x-2">
                  <button 
                    onClick={() => handleDelete(user._id)}
                    className={`
                      ${darkMode 
                        ? 'text-red-400 hover:text-red-300' 
                        : 'text-red-500 hover:text-red-700'
                      }
                    `}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}