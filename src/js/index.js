import '../css/index.scss';
import '../assets/js-libs/auto-fix-screen.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/Main';

ReactDOM.render(
	<div className="app">
		<h1>my test react app</h1>
		<App />
	</div>,
	document.getElementById('app')
);