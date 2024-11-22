"use client";

import React, { useState, useEffect } from 'react';
import { getSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDarkMode } from '../../DarkMode/Darkmode';

// Types
interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('next-auth.session-token');
      
      const response = await axios.get('http://localhost:2000/api/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setContacts(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch contacts');
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: 'pending' | 'reviewed' | 'resolved') => {
    try {
      const token = Cookies.get('next-auth.session-token');
      
      await axios.patch(
        `http://localhost:2000/api/contacts/${id}`, 
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setContacts(contacts.map(contact => 
        contact._id === id ? { ...contact, status } : contact
      ));
    } catch (err) {
      setError('Failed to update contact status');
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const token = Cookies.get('next-auth.session-token');
      
      await axios.delete(`http://localhost:2000/api/contacts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setContacts(contacts.filter(contact => contact._id !== id));
      setConfirmDelete(null);
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  const renderStatusBadge = (status: 'pending' | 'reviewed' | 'resolved') => {
    const statusColors = {
      'pending': darkMode 
        ? 'bg-yellow-900 text-yellow-300' 
        : 'bg-yellow-100 text-yellow-800',
      'reviewed': darkMode 
        ? 'bg-blue-900 text-blue-300' 
        : 'bg-blue-100 text-blue-800',
      'resolved': darkMode 
        ? 'bg-green-900 text-green-300' 
        : 'bg-green-100 text-green-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className={`container mx-auto p-6 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-black'}`}>
          User Contacts
        </h1>
      </div>

      {loading ? (
        <div className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Loading...
        </div>
      ) : error ? (
        <div className={`p-4 rounded ${darkMode 
          ? 'bg-red-900 text-red-300' 
          : 'bg-red-100 text-red-800'}`}>
          {error}
        </div>
      ) : (
        <div className={`shadow-md rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <tr>
                {['Name', 'Email', 'Phone', 'Status', 'Actions', 'Delete'].map(header => (
                  <th 
                    key={header} 
                    className={`p-3 text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr 
                  key={contact._id} 
                  className={`border-b ${darkMode 
                    ? 'hover:bg-gray-700 border-gray-600 text-gray-200' 
                    : 'hover:bg-gray-50 border-gray-200 text-gray-800'} cursor-pointer`}
                  onClick={() => setSelectedContact(contact)}
                >
                  {[contact.name, contact.email, contact.phoneNumber].map((value, index) => (
                    <td key={index} className="p-3">{value}</td>
                  ))}
                  <td className="p-3">
                    {renderStatusBadge(contact.status)}
                  </td>
                  <td className="p-3 flex items-center space-x-2">
                    <select
                      value={contact.status}
                      onChange={(e) => updateContactStatus(
                        contact._id, 
                        e.target.value as 'pending' | 'reviewed' | 'resolved'
                      )}
                      className={`p-1 border rounded ${darkMode 
                        ? 'bg-gray-700 text-gray-200 border-gray-600' 
                        : 'bg-white text-black border-gray-300'}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {['pending', 'reviewed', 'resolved'].map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    
                  </td>
                  <td className=' p-3   space-x-2'>
                  <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete(contact._id);
                      }}
                      className={`px-2 py-1 rounded text-xs ${darkMode 
                        ? 'bg-red-900 text-red-300 hover:bg-red-800' 
                        : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg w-1/3 ${darkMode 
            ? 'bg-gray-800 text-gray-200' 
            : 'bg-white text-black'}`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-gray-100' : ''}`}>
              Confirm Deletion
            </h2>
            <p className="mb-4">Are you sure you want to delete this contact?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className={`px-4 py-2 rounded ${darkMode 
                  ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                  : 'bg-gray-500 text-white hover:bg-gray-600'}`}
              >
                Cancel
              </button>
              <button
                onClick={() => deleteContact(confirmDelete)}
                className={`px-4 py-2 rounded ${darkMode 
                  ? 'bg-red-900 text-red-300 hover:bg-red-800' 
                  : 'bg-red-500 text-white hover:bg-red-600'}`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg w-1/2 ${darkMode 
            ? 'bg-gray-800 text-gray-200' 
            : 'bg-white text-black'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : ''}`}>
              Contact Details
            </h2>
            <div className="space-y-2">
              {[
                ['Name', selectedContact.name],
                ['Email', selectedContact.email],
                ['Phone', selectedContact.phoneNumber],
                ['Message', selectedContact.message],
                ['Submitted At', new Date(selectedContact.createdAt).toLocaleString()],
              ].map(([label, value]) => (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
              <p>
                <strong>Status:</strong> {renderStatusBadge(selectedContact.status)}
              </p>
            </div>
            <button 
              onClick={() => setSelectedContact(null)}
              className={`mt-4 px-4 py-2 rounded ${darkMode 
                ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                : 'bg-gray-500 text-white hover:bg-gray-600'}`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}