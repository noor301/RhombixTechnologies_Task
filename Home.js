import React from 'react';
import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import MenuManager from './MenuManager';
import OrderTracker from './OrderTracker';
import './Admin.css';

export default function AdminDashboard() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Admin dashboard</h1>
        <p>Manage the menu and keep an eye on incoming orders.</p>
      </div>

      <div className="admin-tabs">
        <NavLink to="/admin/menu" className={({ isActive }) => `admin-tab ${isActive ? 'admin-tab-active' : ''}`}>
          Menu manager
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => `admin-tab ${isActive ? 'admin-tab-active' : ''}`}>
          Order tracker
        </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="menu" replace />} />
        <Route path="menu" element={<MenuManager />} />
        <Route path="orders" element={<OrderTracker />} />
      </Routes>
    </div>
  );
}
