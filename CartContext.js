import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container empty-state">
      <h3>This page isn't on the menu.</h3>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back to menu</Link>
    </div>
  );
}
