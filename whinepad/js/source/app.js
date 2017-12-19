'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ExcelOne from './components/ExcelOne';
import Logo from './components/Logo';
import schema from './schema';


var data = JSON.parse(localStorage.getItem("data"));
if(!data){
    data = {};
    schema.forEach(item=> data[item.id] = item.sample);
    data = [data];
}

ReactDOM.render(
    <div>
        <div className="app-header">
            <Logo /> Welcome to Whinepad!
        </div>
        <ExcelOne initialData={data} schema={schema} />
    </div>,
    document.getElementById('pad')
);

