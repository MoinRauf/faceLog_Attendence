import React from 'react'
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Welcome Admin, its your dashboard</h1>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}

export default AdminDashboard;
