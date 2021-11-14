import {Link} from 'react-router-dom'

function Footer() {
    return (
        <footer className="foot">
            <Link to="/about">About</Link>
            <p>Copyright &copy; 2021</p>
            
        </footer>
    )
}

export default Footer
