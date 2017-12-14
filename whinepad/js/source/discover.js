'use strict';

import Button from './components/Button';
import Logo from './components/Logo';
import Suggest from './components/Suggest';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div style={{padding:'20px'}}>
        <h1>Component Discover</h1>
        <h2>Logo</h2>
        <div style={{display:'inline-block', background:'purple'}}>
            <Logo />
        </div>
        <h2>Buttons</h2>
        <div>
            Button with onClick: <Button onClick={()=> alert('ouch')}>Click Me</Button>
        </div>
        <div>
            A link: <Button href="http://reactjs.com">Follow me</Button>
        </div>
        <div>
            Custom class name: <Button className="custom">I do nothing</Button>
        </div>
        <h2>Suggest</h2>
        <div>
            <Suggest options={['eenie','meenie','miney','mo']} />
        </div>
    </div>,
    document.querySelector('.root')
);