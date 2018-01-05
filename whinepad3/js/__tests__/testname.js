import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

describe('Nos podemos renderizar um botao', () => {
    it('altere o texto apos o clique', () => {
        const button = ReactTestUtils.renderIntoDocument(
            <button
                onClick={ev=>ev.target.innerHTML = 'Bye'}>
                Hello
            </button>
        );
        expect(ReactDOM.findDOMNode(button).textContent).toEqual('Hello');

        ReactTestUtils.Simulate.click(button);
        expect(ReactDOM.findDOMNode(button).textContent).toEqual('Bye');
    })
});