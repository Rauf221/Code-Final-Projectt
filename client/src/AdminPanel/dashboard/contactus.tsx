"use client"

import React, { useState, useEffect } from 'react';
import { getSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDarkMode } from '../../DarkMode/Darkmode';
import { Bell, Search, Filter, ChevronDown } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
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


  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const CustomSelect = ({ value, onChange, options }: any) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`appearance-none w-full px-4 py-2 rounded-lg border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700 text-gray-200' 
            : 'bg-white border-gray-200 text-gray-800'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
    </div>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
      resolved: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status as keyof typeof colors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Contact Management</h1>
            <p className="text-gray-500 mt-1">Manage and respond to user inquiries</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} relative`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-200' 
                  : 'bg-white border-gray-200 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <CustomSelect
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
              options={['all', 'pending', 'reviewed', 'resolved']}
            />
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        ) : (
          <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                    {['Name', 'Email', 'Phone', 'Status', 'Actions',' Delete'].map((header) => (
                      <th key={header} className="px-6 py-4 text-left text-sm font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr
                      key={contact._id}
                     
                      className={`${
                        darkMode 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-50'
                      } cursor-pointer transition-colors duration-150`}
                    >
                      <td className="px-6 py-4"  onClick={() => setSelectedContact(contact)}>{contact.name}</td>
                      <td className="px-6 py-4 "  onClick={() => setSelectedContact(contact)}>{contact.email}</td>
                      <td className="px-6 py-4"  onClick={() => setSelectedContact(contact)}>{contact.phoneNumber}</td>
                      <td className="px-6 py-4"  onClick={() => setSelectedContact(contact)}>
                        <StatusBadge status={contact.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-10">
                          <CustomSelect 
                            value={contact.status}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                              updateContactStatus(contact._id, e.target.value as 'pending' | 'reviewed' | 'resolved')
                            }
                            options={['pending', 'reviewed', 'resolved']}
                          />
                        
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDelete(contact._id);
                            }}
                            className="px-3 py-1 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contact Details Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`w-full max-w-2xl rounded-lg shadow-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } p-6 m-4`}>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Contact Details</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                {[
                  ['Name', selectedContact.name],
                  ['Email', selectedContact.email],
                  ['Phone', selectedContact.phoneNumber],
                  ['Message', selectedContact.message],
                  ['Submitted', new Date(selectedContact.createdAt).toLocaleString()]
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-3 gap-4">
                    <span className="font-medium">{label}</span>
                    <span className="col-span-2">{value}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4">
                  <span className="font-medium">Status</span>
                  <div className="col-span-2">
                    <StatusBadge status={selectedContact.status} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`w-full max-w-md rounded-lg shadow-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } p-6 m-4`}>
              <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
              <p className="mb-6">Are you sure you want to delete this contact? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteContact(confirmDelete)}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}