var headers = ["Livro","Autores","Linguagem","Publicado em", "Vendas"];
var data = [
    ["Don Quixote","Miguel de Cervantes","Espanhol","1612","500 milhões"],
    ["Um Conto de Duas Cidades","Charles Dickens","Inglês","1859","200 milhões"],
    ["O Senhor dos Anéis","J. R. R. Tolkien","Inglês","1954–1955","150 milhões"],
    ["O Pequeno Príncipe","Antoine de Saint-Exupéry","Francês","1943","140 milhões"],
    ["Harry Potter e a Pedra Filosofal","J. K. Rowling","Inglês","1997","107 milhões"],
    ["O Hobbit","J. R. R. Tolkien","Inglês","1937","100 milhões"],
    ["O Caso dos Dez Negrinhos","Agatha Christie","Inglês","1939","100 milhões"],
    ["O Sonho da Câmara Vermelha","Cao Xueqin","Chinês","1754–1791","100 milhões"],
    ["Ela, a Feiticeira","H. Rider Haggard","Inglês","1887","100 milhões"]
];

var Excel = React.createClass({

    getInitialState : function(){
        return {
            data : this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, //{row: index, cell: index}
            search: false
        };
    },

    // Apresenta nome do componente em possiveis logs.
    // Não é necessário quando usado o JSX
    displayName : 'Excel',

    propTypes : {
        headers : React.PropTypes.arrayOf(
            React.PropTypes.string
        ),
        initialData : React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.string
            )
        )
    },

    //Metodo privado para ordenação
    _sort : function(e){

        var index = e.target.cellIndex;
        var descending = this.state.sortby === index && !this.state.descending;
        var data = this.state.data.slice().sort(function (a, b) {
            return descending ? (a[index] < b[index] ? 1 : -1) : (a[index] > b[index] ? 1 : -1);
        });

        this.setState({
            sortby : index,
            descending : descending,
            data : data
        });
    },

    //Metodo para edição
    _showEditor : function(e){
        this.setState({
            edit : {
                row: parseInt(e.target.dataset.row, 10), //dataset refere-se ao attr data-*
                cell: e.target.cellIndex
            }
        });
    },

    _save : function(e){
        e.preventDefault();
        var input = e.target.firstChild;
        var data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            data: data,
            edit: null
        });
    },

    render : function(){
        return React.DOM.div(
            null,
            this._renderToolbar(),
            this._renderTable()
        );
    },

    _renderToolbar : function(){
        return React.DOM.button(
            {
                className:'toolbar'
            },
            'search'
        );
    },

    _renderTable : function(){
        var sortby = this.state.sortby,
            descending = this.state.descending,
            edit = this.state.edit
            save = this._save;
        return (
            React.DOM.table(
                null,
                React.DOM.thead(
                    {onClick: this._sort},
                    React.DOM.tr(
                        null,
                        this.props.headers.map(function(title, index){
                            if(sortby === index){
                                title += descending ? '\u2191' : '\u2193';
                            }
                            return React.DOM.th({key:index}, title)
                        })
                    )
                ),
                React.DOM.tbody(
                    {onDoubleClick: this._showEditor},
                    this.state.data.map(function(row, rowIndex){
                        return (
                            React.DOM.tr(
                                {key: rowIndex},
                                row.map(function(cell, cellIndex){

                                    var content = cell;
                                    if(edit && edit.row === rowIndex && edit.cell === cellIndex){
                                        content = React.DOM.form(
                                            { onSubmit : save },
                                            React.DOM.input({
                                                type: 'text',
                                                defaultValue : cell
                                            })
                                        );
                                    }

                                    return React.DOM.td(
                                        {
                                            key: cellIndex,
                                            'data-row': rowIndex
                                        },
                                        content
                                    )
                                })
                            )
                        );
                    })
                )
            )
        );
    }
});

ReactDOM.render(
    React.createElement(Excel, {
        headers: headers,
        initialData: data
    }),
    document.querySelector(".main")
);