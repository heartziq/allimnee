import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';

ReactDOM.hydrate(<AppRouter />, document.getElementById('root'));
