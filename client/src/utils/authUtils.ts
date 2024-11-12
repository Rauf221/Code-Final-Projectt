// authUtils.ts
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/'; // Or handle this however you prefer
      throw new Error('Session expired');
    }
  
    return response;
  };
  
  // Example of using the utility
  export const getUserProfile = async () => {
    const response = await fetchWithAuth('http://localhost:2000/users/profile');
    return response.json();
  };
  
  // Check if user is authenticated
  export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  // Get current user
  export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };
  
  // Logout utility
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; // Or handle this however you prefer
  };