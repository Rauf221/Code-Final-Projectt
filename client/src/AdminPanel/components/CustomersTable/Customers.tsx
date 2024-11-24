"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import { Users, Trash2, Plus, Search, ChevronDown, Settings, Download, Mail, Edit2 } from 'lucide-react';
import { useDarkMode } from '../../../DarkMode/Darkmode';

interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

interface CreateUserForm {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export default function AdvancedUserManagementTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [newUser, setNewUser] = useState<CreateUserForm>({
    username: '',
    email: '',
    password: '',
    isAdmin: false
  });

  const { darkMode } = useDarkMode();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:2000/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleSort = (key: string) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    
    const sorted = [...filteredUsers].sort((a, b) => {
      if (key === 'createdAt') {
        return direction === 'asc' 
          ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
          : new Date(b[key]).getTime() - new Date(a[key]).getTime();
      }
      return direction === 'asc'
        ? a[key as keyof User] > b[key as keyof User] ? 1 : -1
        : a[key as keyof User] < b[key as keyof User] ? 1 : -1;
    });
    setFilteredUsers(sorted);
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user._id));
    }
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
      try {
        await Promise.all(selectedUsers.map(userId => 
          fetch(`http://localhost:2000/users/${userId}`, { method: 'DELETE' })
        ));
        setUsers(users.filter(user => !selectedUsers.includes(user._id)));
        setSelectedUsers([]);
        alert('Users deleted successfully');
      } catch (error) {
        alert('Failed to delete users');
      }
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <p className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            User Management
          </h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and monitor user accounts
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[300px] max-w-md relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="flex gap-3">
            {selectedUsers.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </button>
            )}
         
          </div>
        </div>

        <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  {['Username', 'Email', 'Role', 'Created At'].map((header, index) => (
                    <th
                      key={index}
                      className={`px-6 py-4 text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                    >
                      <button
                        onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}
                        className="flex items-center space-x-1 hover:opacity-80"
                      >
                        <span>{header}</span>
                        <ChevronDown className={`w-4 h-4 transform ${
                          sortConfig.key === header.toLowerCase().replace(' ', '') &&
                          sortConfig.direction === 'desc' ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </th>
                  ))}
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`
                      ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                      ${index !== filteredUsers.length - 1 ? (darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200') : ''}
                    `}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleSelectUser(user._id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        user.isAdmin
                          ? (darkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800')
                          : (darkMode ? 'bg-green-900/50 text-green-200' : 'bg-green-100 text-green-800')
                      }`}>
                        {user.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-3">
                       
                        <button
                          onClick={() => handleDelete(user._id)}
                          className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}