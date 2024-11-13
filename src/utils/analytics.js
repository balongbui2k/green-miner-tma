// src/analytics.ts
import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = (trackingId) => {
  ReactGA.initialize(trackingId);
};

// Log a page view
export const logPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};