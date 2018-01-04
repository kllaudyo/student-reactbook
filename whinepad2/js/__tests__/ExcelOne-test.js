jest.autoMockOff();

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ExcelOne from '../source/components/ExcelOne';
import schema from '../source/schema';

let data = [{}];
schema.forEach(item => data[0][item.id] = item.sample);

describe('Editing data', () => {
    it('saves new data', () => {
        const callback = jest.genMockFunction();
        const table = ReactTestUtils.renderIntoDocument(
            <ExcelOne
                schema={schema}
                initialData={data}
                onDataChange={callback}
            />
        );

        const newname = '$2.99 chuck';
        const cell = ReactTestUtils.scryRenderedDOMComponentsWithTag(table, 'td')[0];

        ReactTestUtils.Simulate.doubleClick(cell);
        cell.getElementsByTagName('input')[0].value=newname;
        ReactTestUtils.Simulate.submit(cell.getElementsByTagName('form')[0]);
        //TODO - ReactTestUtils.Simulate.keyDown() Pesquisar keyDown com enter
        //expect(cell.textContent).toEqual(newname);
        expect(cell.textContent).toBe(newname);

        /*
            Verifica se callback onDataChange foi chamada
            que é Whinepad._onExcelDataChange(data)

            [0][0][0] nas palavaras do livro é:
            ...significa que a primeira chamada para a função
            simulada tem como primeiro argumento um array em
            que o primeiro elemento é um objeto(correspondendo
            a um registro da tabela) com uma propriedade name...
         */
        expect(callback.mock.calls[0][0][0].name).toBe(newname);

    });

    it('delete data', () => {
        const callback = jest.genMockFunction();
        const table = ReactTestUtils.renderIntoDocument(
            <ExcelOne
                schema={schema}
                initialData={data}
                onDataChange={callback}
            />
        );
        ReactTestUtils.Simulate.click(
            ReactTestUtils.findRenderedDOMComponentWithClass(table, 'ActionDelete')
        );
        ReactTestUtils.Simulate.click(
            ReactTestUtils.findRenderedDOMComponentWithClass(table, 'Button')
        );

        expect(callback.mock.calls[0][0].length).toBe(0);
    })
});

