jest
    .dontMock('../source/components/Rating')
    .dontMock('classnames')
;

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Rating from '../source/components/Rating';

describe('works', () => {
    it('handles user actions', () => {
        const input = ReactTestUtils.renderIntoDocument(<Rating/>);
        const stars = ReactTestUtils.scryRenderedDOMComponentsWithTag(input, 'span');

        ReactTestUtils.Simulate.mouseOver(stars[3]);
        expect(stars[0].className).toBe('RatingOn');
        expect(stars[3].className).toBe('RatingOn');
        expect(stars[4].className).toBeFalsy();
        expect(input.state.rating).toBe(0);
        expect(input.state.tmpRating).toBe(4);

        ReactTestUtils.Simulate.mouseOut(stars[3]);
        expect(stars[0].className).toBeFalsy();
        expect(stars[3].className).toBeFalsy();
        expect(stars[4].className).toBeFalsy();
        expect(input.state.rating).toBe(0);
        expect(input.state.tmpRating).toBe(0);

        ReactTestUtils.Simulate.click(stars[3]);
        expect(input.getValue()).toBe(4);
        expect(stars[0].className).toBe('RatingOn');
        expect(stars[3].className).toBe('RatingOn');
        expect(stars[4].className).toBeFalsy();
        expect(input.state.rating).toBe(4);
        expect(input.state.tmpRating).toBe(4);
    })
});