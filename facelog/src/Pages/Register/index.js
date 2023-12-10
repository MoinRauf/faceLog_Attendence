import React from 'react'
import { Link } from 'react-router-dom';
const Register = () => {
  return (
    <div>
      <h1>Here admin will register himself</h1>
      <button>
        <Link to="/login">Register</Link>
      </button>
    </div>
  );
}

export default Register
