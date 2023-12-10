import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1>Here admin and employee will login to their dashboards</h1>
      <button>
        <Link to="/admindashboard">Login</Link>
      </button>
    </div>
  );
}

export default Login
