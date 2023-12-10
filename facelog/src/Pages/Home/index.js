import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <h1>Welcome to Facelog Attendance System</h1>
        <button>
            <Link to="/register">Setup System</Link>
        </button>
        <button>
            <Link to="/login">login</Link>
        </button>
    </div>
  );
}

export default Home
