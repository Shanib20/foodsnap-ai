import React from 'react';
import { createRoot } from 'react-dom/client'; // Make sure this import is correct
import App from './App.jsx'; // Ensure this path is correct
import './index.css';
import './App.css';

const rootElement = document.getElementById('root');
if (rootElement) { // Add a check to ensure rootElement is not null
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found in the document.");
}