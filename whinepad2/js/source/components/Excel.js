import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * classe para componente Excel, uma tabela elegante!
 */
class Excel extends Component{

    /*======================================================
      PROPRIEDADES
    ======================================================*/
    // Apresenta nome do componente em possiveis logs.
    // Não é necessário quando usado o JSX

    constructor(props) {
        super(props);
        this.state = {
            data:this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, //{row: index, cell: index}
            search: false
        };

        this._preSearchData= null;
        this._log=[];
        this._indexState=0;

        this._showEditor = this._showEditor.bind(this);
        this._toggleSearch = this._toggleSearch.bind(this);
        this._sort = this._sort.bind(this);
        this._search = this._search.bind(this);
        this._save = this._save.bind(this);
        this._logSetState = this._logSetState.bind(this);
        this._redo = this._redo.bind(this);
        this._undo = this._undo.bind(this);
        this._replay = this._replay.bind(this);
        this._download = this._download.bind(this);
    }

    /*======================================================
     METODOS REACT
    ======================================================*/

    componentDidMount(){
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
    }

    render(){
        return (
            <div className="Excel">
                {this._renderToolbar()}
                {this._renderTable()}
            </div>
        );
    }

    /*======================================================
     METODOS AUXILIARES - Funcionalidades
    ======================================================*/

    _showEditor(e){
        this._logSetState({
            edit : {
                row: parseInt(e.target.dataset.row, 10), //dataset refere-se ao attr data-*
                cell: e.target.cellIndex
            }
        });
    }

    _toggleSearch(){
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
    }

    _sort(e){
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
    }

    _search(e){
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
    }

    _save(e){
        e.preventDefault();
        var input = e.target.firstChild;
        var data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this._logSetState({
            data: data,
            edit: null
        });
    }

    _logSetState(newState){
        this._log.push(
            JSON.parse(
                JSON.stringify(
                    this._log.length===0 ? this.state: newState
                )
            )
        );
        this.setState(newState);
        this._indexState++;
    }

    _redo() {
        if(this._indexState >= this._log.length){
            return;
        }
        this.setState(this._log[this._indexState++]);
    }

    _undo(){
        if(this._indexState===0){
            return;
        }
        this.setState(this._log[--this._indexState]);
    }

    _replay(){
        if(this._log.length === 0){
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
    }

    _download(format, ev){
        var contents = format === 'json'
            ? JSON.stringify(this.state.data)
            : this.state.data.reduce(function(result, row){
                return result + '"' + row.join('","') + '"\n';
            },'')
        ;

        var URL = window.URL || window.webkitURL;
        var blob = new Blob([contents], {type: 'text/' + format});
        ev.target.href = URL.createObjectURL(blob);
        ev.target.download = 'data.'+format;
    }

    /*======================================================
     METODOS AUXILIARES - Renderizadores
    ======================================================*/

    _renderToolbar(){
        return (
            <div className="toolbar">
                <button onClick={this._toggleSearch}>{this.state.search?'fechar pesquisa':'abrir pesquisa'}</button>
                <a onClick={this._download.bind(this, 'json')} href="data.json">Exportar Json</a>
                <a onClick={this._download.bind(this, 'csv')} href="data.csv">Exportar CSV</a>
            </div>
        );
    }

    _renderSearch(){
        if(!this.state.search){
            return null;
        }
        return (
            <tr onChange={this._search}>
                {this.props.headers.map((head, index)=>(
                    <td key={index}>
                        <input type="text" data-idx={index} />
                    </td>
                ))}
            </tr>
        );
    }

    _renderTable(){
        var sortby = this.state.sortby,
            descending = this.state.descending,
            edit = this.state.edit,
            save = this._save;

        return (
            <table>
                <thead onClick={this._sort}>
                    <tr>
                        {this.props.headers.map((title, index) => {
                            if(sortby === index){
                                title += descending ? '\u2191' : '\u2193';
                            }
                            return <th key={index}>{title}</th>;
                        })}
                    </tr>
                </thead>
                <tbody onDoubleClick={this._showEditor}>
                    {this._renderSearch()}
                    {this.state.data.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {row.map( (cell, cellIndex)=> {
                                    var content = cell;
                                    if(edit && edit.row === rowIndex && edit.cell === cellIndex){
                                        content = <form onSubmit={save}>
                                            <input type="text" defaultValue={cell} />
                                        </form>;
                                    }

                                    return (<td key={cellIndex} data-row={rowIndex}>{content}</td>);
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

Excel.propTypes = {
    headers : PropTypes.arrayOf(
        PropTypes.string
    ),
    initialData : PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.string
        )
    )
};

export default Excel;