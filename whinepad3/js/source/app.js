'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import schema from './schema';
import Store from './flux/Store';
import Whinepad from "./components/Whinepad";

Store.init(schema);

ReactDOM.render(
    <div>
        <div className="app-header">
            <Logo /> Welcome to Whinepad!
        </div>
        <Whinepad />
    </div>,
    document.getElementById('pad')
);

