import Button from './Button';
import Dialog from './Dialog';
import ExcelOne from './ExcelOne';
import Form from './Form';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Store from "../flux/Store";

class Whinepad extends Component{

    constructor(props){
        super(props);
        this.state = {
            addnew: false,
            count: Store.getCount()
        };
        this._preSearchData = null;
        this._updateCount = this._updateCount.bind(this);
    }

    componentDidMount(){
        Store.addListener('change', this._updateCount);
    }

    shouldComponentUpdate(newProps, newState){
        return newState.addnew !== this.state.addnew || newState.count !== this.state.count;
    }

    _updateCount(){
        this.setState({count:Store.getCount()});
    }

    _addNewDialog(){
        this.setState({addnew:true});
    }

    _addNew(action){
        if(action === 'dismiss'){
            this.setState({addnew:false});
            return;
        }
        // let data = Array.from(this.state.data);
        let data = Array.from(Store.getData());
        data.unshift(this.refs.form.getData());
        this.setState({
            addnew: false
        });
    }

    // _onExcelDataChange(data){
    //     this.setState({data:data});
    //     this._commitToStorage(data);
    // }

    // static _commitToStorage(data){
    //     localStorage.setItem('data',JSON.stringify(data));
    // }

    _startSearching(){
        //this._preSearchData = this.state.data;
        this._preSearchData = Store.getData();
    }

    _doneSearching(){
        this.setState({
            data: this._preSearchData
        });
    }

    _search(e){
        const needle = e.target.value.toLowerCase();
        if(!needle){
            this.setState({data:this._preSearchData});
            return;
        }
        const fields = this.props.schema.map(item => item.id);
        const searchdata = this._preSearchData.filter(row => {
            for(let f=0; f<fields.length; f++){
                if(row[fields[f]].toString().toLowerCase().indexOf(needle)>1){
                    return true;
                }
            }
            return false;
        });
        this.setState({data: searchdata});
    }

    render(){
        const {count} = this.state;
        return (
            <div className="Whinepad">
                <div className="WhinepadToolbar">
                    <div className="WhinepadToolbarAdd">
                        <Button
                            onClick={this._addNewDialog.bind(this)}
                            className="WhinepadToolbarAddButton">
                            + add
                        </Button>
                    </div>
                    <div className="WhinepadToolbarSearch">
                        <input
                            placeholder={
                                count === 1 ? 'Search 1 record...' : `Search ${count} records...`
                            }
                            onChange={this._search.bind(this)}
                            onFocus={this._startSearching.bind(this)}
                            onBlur={this._doneSearching.bind(this)} />
                    </div>
                </div>
                <div className="WhinepadDatagrid">
                    <ExcelOne />
                </div>
                {
                    this.state.addnew
                        ? <Dialog
                            modal={true}
                            header="Add new item"
                            confirmLabel="Add"
                            onAction={this._addNew.bind(this)}>
                            <Form
                                ref="form"
                                fields={this.props.schema} />
                          </Dialog>
                        : null
                }
            </div>
        );
    }
}

Whinepad.propTypes = {
    schema: PropTypes.arrayOf(
        PropTypes.object
    ),
    initialData: PropTypes.arrayOf(
        PropTypes.object
    )
};

export default Whinepad;