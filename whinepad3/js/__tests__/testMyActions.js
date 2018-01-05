jest
    .dontMock('../source/components/Actions')
    .dontMock('../source/components/Wrap');

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Actions from '../source/components/Actions';
import Wrap from '../source/components/Wrap';

describe('Clicando em ações',()=>{
    it('Verifica se chama callback', ()=>{
        const callback = jest.genMockFunction();
        const actions = ReactTestUtils.renderIntoDocument(<Wrap><Actions onAction={callback}/></Wrap>);

        const elements = ReactTestUtils.scryRenderedDOMComponentsWithTag(actions, 'span');
        elements.forEach(span => ReactTestUtils.Simulate.click(span));

        const calls = callback.mock.calls;
        expect(calls.length).toEqual(3);
        expect(calls[0][0]).toEqual('info');
        expect(calls[1][0]).toEqual('edit');
        expect(calls[2][0]).toEqual('delete');
    });
});