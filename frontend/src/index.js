import React ,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
localStorage.setItem("Lng", "th");
ReactDOM.render(
  <Suspense fallback="loading">
    <App />
  </Suspense>
,
  document.getElementById('root')
);

reportWebVitals();
