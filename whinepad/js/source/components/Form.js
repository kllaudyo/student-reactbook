import React , { Component } from 'react';
import PropTypes from 'prop-types';
import FormInput from "./FormInput";
import Rating from "./Rating";

class Form extends Component{

    constructor(props){
        super(props);
    }

    getData(){
        let data = {};
        this.props.fields.forEach(field =>
            data[field.id] = this.refs[field.id].getValue()
        );
        return data;
    }

    render(){
        return (
            <form className="Form">
                {this.props.fields.map(field => {
                    const prefiled = this.props.initialData && this.props.initialData[field.id];
                    if(!this.props.readonly){
                        return (
                            <div className="FormRow" key={field.id}>
                                <label className="FormLabel" htmlFor={field.id}>
                                    {field.label}
                                </label>
                                <FormInput {...field} ref={field.id} defaultValue={prefiled} />
                            </div>
                        )
                    }
                    if(!prefiled){
                        return null;
                    }
                    return (
                        <div className="FormRow" key={field.id}>
                            <span className="FormLabel">{field.label}</span>
                            {
                                field.type === 'rating'
                                    ? <Rating readonly={true} defaultValue={parseInt(prefiled,10)} />
                                    : <div>{prefiled}</div>
                            }
                        </div>
                    )
                },this)}
            </form>
        )
    }
}

Form.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string)
    })).isRequired,
    initialData: PropTypes.object,
    readonly: PropTypes.bool
};

export default Form;