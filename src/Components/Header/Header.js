import React from 'react'
import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import Button from '../Button'



const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()
    return (
        <header className="header">
        <h2>{title}</h2>

        {location.pathname==='/' && (<Button text={showAdd ? "Close" : "Add"} color ="black" onClick={onAdd}/>)}
        
        </header>
    )
}
Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes ={
    title: PropTypes.string,

}

export default Header;
