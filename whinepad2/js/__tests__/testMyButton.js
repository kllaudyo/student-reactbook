jest
    .dontMock('../source/components/Button')
    .dontMock('classnames');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Button from '../source/components/Button';

describe("Renderiza componente Button", () => {
    it("renderiza <a> vs <button>", () => {
        const button = ReactTestUtils.renderIntoDocument(
            <div>
                <Button>Hello</Button>
            </div>
        );
        expect(ReactDOM.findDOMNode(button).children[0].nodeName).toEqual('BUTTON');

        const a = ReactTestUtils.renderIntoDocument(
            <div>
                <Button href="#">Hello</Button>
            </div>
        );
        expect(ReactDOM.findDOMNode(a).children[0].nodeName).toEqual('A');
    });

    it("permite classCss personalizadas", ()=> {
        const button = ReactTestUtils.renderIntoDocument(<div><Button className="good bye">Hello</Button></div>);
        const buttonNode = ReactDOM.findDOMNode(button).children[0];
        expect(buttonNode.getAttribute('class')).toEqual('Button good bye');
    });

});
