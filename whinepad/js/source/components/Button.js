import className from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

function Button(props){
    const cssclass = className('Button', props.className);
    return props.href
         ? <a {...props} className={cssclass} />
         : <button {...props} className={cssclass}></button>;
}

Button.propTypes = {
    href: PropTypes.string
};

export default Button;