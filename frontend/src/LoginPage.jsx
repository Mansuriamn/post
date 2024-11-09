// import axios from 'axios';
// import React, { useState } from 'react';

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState(''); // New state for the response message
  
//   const handleLogin = (e) => {
//     e.preventDefault();
//     const loginData = { username, password };

//     axios
//       .post('http://localhost:5000/login', loginData)
//       .then((res) => {
//         if (res.data.success) {
//           setMessage(res.data.message); // Show success message
//         } else {
//           setMessage("Login failed. Please try again."); // Show failure message
//         }
//       })
//       .catch((err) => setMessage(err.response ? err.response.data : err.message)); // Handle errors
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin} style={styles.form}>
//         <div style={styles.inputGroup}>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.inputGroup}>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </div>
//         <button type="submit" style={styles.button}>Login</button>
//       </form>
//       {message && <p style={styles.message}>{message}</p>} {/* Display message if exists */}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     width: '300px',
//     margin: '50px auto',
//     padding: '20px',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     textAlign: 'center',
//     backgroundColor: '#f9f9f9'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   inputGroup: {
//     marginBottom: '15px',
//   },
//   input: {
//     width: '100%',
//     padding: '8px',
//     marginTop: '5px',
//     borderRadius: '4px',
//     border: '1px solid #ccc'
//   },
//   button: {
//     padding: '10px',
//     color: 'white',
//     backgroundColor: '#4CAF50',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer'
//   },
//   message: {
//     marginTop: '15px',
//     color: '#333'
//   }
// };

// export default LoginPage;

import axios from 'axios';
import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/login', 
        { username, password },
        { 
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      setMessage(response.data.message);
      if (response.data.success) {
        // Handle successful login (e.g., redirect or store token)
        console.log('Login successful');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 
        'An error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
            disabled={isLoading}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && (
        <p style={{
          ...styles.message,
          color: message.includes('successful') ? '#4CAF50' : '#f44336'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    color: 'white',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  message: {
    marginTop: '15px',
    color: '#333'
  }
};

export default LoginPage;