/**
 * classe para componente Excel, uma tabela elegante!
 */
var Excel = React.createClass({

    /*======================================================
      PROPRIEDADES
    ======================================================*/
    // Apresenta nome do componente em possiveis logs.
    // Não é necessário quando usado o JSX
    displayName : 'Excel',
    _preSearchData: null,

    /*======================================================
     METODOS REACT
    ======================================================*/

    getInitialState : function(){
        return {
            data : this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, //{row: index, cell: index}
            search: false
        };
    },

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

    render : function(){
        return React.DOM.div(
            null,
            this._renderToolbar(),
            this._renderTable()
        );
    },

    /*======================================================
     METODOS AUXILIARES - Funcionalidades
    ======================================================*/

    _showEditor : function(e){
        this.setState({
            edit : {
                row: parseInt(e.target.dataset.row, 10), //dataset refere-se ao attr data-*
                cell: e.target.cellIndex
            }
        });
    },

    _toggleSearch : function(){
        if(this.state.search) {
            this.setState({
                data: this._preSearchData,
                search: false
            });
            this._preSearchData = null;
        }else{
            this._preSearchData = this.state.data;
            this.setState({
                search:true
            });
        }
    },

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

    /*======================================================
     METODOS AUXILIARES - Renderizadores
    ======================================================*/

    _renderToolbar : function(){
        return React.DOM.button(
            {
                onClick: this._toggleSearch,
                className:'toolbar'
            },
            'search'
        );
    },

    _renderSearch : function(){
        if(!this.state.search){
            return null;
        }
        return (
            React.DOM.tr(
                null,
                this.props.headers.map(function(head, index){
                    return React.DOM.td(
                        { key: index },
                        React.DOM.input(
                            {
                                type: 'text',
                                'data-idx' : index
                            }
                        )
                    )
                })
            )
        );
    },

    _renderTable : function(){
        var sortby = this.state.sortby,
            descending = this.state.descending,
            edit = this.state.edit,
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
                    this._renderSearch(),
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