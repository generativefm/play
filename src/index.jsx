import React from 'react';
import { render } from 'react-dom';
import App from './app/app';
import './styles/base.scss';

const rootElement = document.getElementById('root');

render(<App />, rootElement);
