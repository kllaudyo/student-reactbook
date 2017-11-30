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
    _log: [],
    _indexState : 0,

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

    componentDidMount: function(){
        document.onkeydown = function(me){
            return function(e){
                if(e.altKey && e.shiftKey && e.keyCode === 82){ //ALT+SHIFT+R
                    me._replay();
                    return;
                }

                if(e.altKey  && e.shiftKey && e.keyCode === 90){ //ALT+SHIFT+Z
                    me._redo();
                    return;
                }

                if(e.altKey && e.keyCode === 90){ //ALT+Z
                    me._undo();
                }
            };
        }(this); //Atenção para esta antiga técnica de passar o {this} de um contexto para outro.
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
        this._logSetState({
            edit : {
                row: parseInt(e.target.dataset.row, 10), //dataset refere-se ao attr data-*
                cell: e.target.cellIndex
            }
        });
    },

    _toggleSearch : function(){
        if(this.state.search) {
            this._logSetState({
                data: this._preSearchData,
                search: false
            });
            this._preSearchData = null;
        }else{
            this._preSearchData = this.state.data;
            this._logSetState({
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
        this._logSetState({
            sortby : index,
            descending : descending,
            data : data
        });
    },

    _search : function(e){
        var text = e.target.value.toLowerCase();
        if(!text){
            this._logSetState({
                data: this._preSearchData
            });
            return;
        }
        var idx = e.target.dataset.idx; //refere-se ao attr data-idx
        var searchData = this._preSearchData.filter(function(row){
            return row[idx].toString().toLowerCase().indexOf(text) > -1;
        });
        this._logSetState({
            data:searchData
        })
    },

    _save : function(e){
        e.preventDefault();
        var input = e.target.firstChild;
        var data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this._logSetState({
            data: data,
            edit: null
        });
    },

    _logSetState : function(newState){
        this._log.push(
            JSON.parse(
                JSON.stringify(
                    this._log.length===0 ? this.state: newState
                )
            )
        );
        this.setState(newState);
        this._indexState++;
    },

    _redo : function() {
        if(this._indexState >= this._log.length){
            return;
        }
        this.setState(this._log[this._indexState++]);
    },

    _undo : function(){
        if(this._indexState===0){
            return;
        }
        this.setState(this._log[--this._indexState]);
    },

    _replay : function(){
        if(this._log.length === 0){
            console.warn('Não existe estado para apresentar repetição!');
            return;
        }
        var idx = -1;
        var interval = setInterval(function () {
            idx++;
            if(idx === this._log.length - 1){
                clearInterval(interval);
            }
            this.setState(this._log[idx]);
        }.bind(this),2000); //passando o contexto {this} com bind que tem suporte apartir do MSIE-9
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
            this.state.search?'fechar pesquisa':'abrir pesquisa'
        );
    },

    _renderSearch : function(){
        if(!this.state.search){
            return null;
        }
        return (
            React.DOM.tr(
                {onChange: this._search}, //Mágica demonstração de propagação de eventos React
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