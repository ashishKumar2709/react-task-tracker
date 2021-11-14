import React from 'react'
import PropTypes from 'prop-types'


function Button({text, color, onClick}) {

    


    return (
        <div>
            <button className="btn" style={{backgroundColor:color}} onClick={onClick}>{text}</button>
        </div>
    )
}

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    color: PropTypes.string,
}
export default Button
