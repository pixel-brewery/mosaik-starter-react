import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { initializeMosaik } from './mosaik';
import './styles.css';

initializeMosaik();

const host = document.getElementById('root');

if (!host) {
    throw new Error('The application root is missing.');
}

createRoot(host).render(
    <StrictMode>
        <App />
    </StrictMode>
);
