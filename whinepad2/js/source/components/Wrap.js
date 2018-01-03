import React, {Component} from 'react';

class Wrap extends Component{
    render(){
        return <div>{this.props.children}</div>;
    }
}

export default Wrap;