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
            descending: false
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

    render : function(){
        var sortby = this.state.sortby, descending = this.state.descending;
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
                    null,
                    this.state.data.map(function(row, index){
                        return (
                            React.DOM.tr(
                                {key: index},
                                row.map(function(cell, index){
                                    return React.DOM.td({key: index}, cell)
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