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
    displayName : 'Excel',
    render : function(){
        return (
            React.DOM.table(
                null,
                React.DOM.thead(
                    null,
                    React.DOM.tr(
                        null,
                        this.props.headers.map(function(title, index){
                            return React.DOM.th({key:index}, title)
                        })
                    )
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