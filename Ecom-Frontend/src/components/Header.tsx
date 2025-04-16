
import { useState } from 'react';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {Link} from "react-router-dom"

const Header = () => {
    const user={_id:"",role: ""};
    const [isOpen, setisOpen] = useState <boolean> (false)
    const logOutHandler=()=>{
        setisOpen(false)
    }
  return (
    <nav className='header'>
        <Link 
        onClick={()=> setisOpen(false)}
        to="/">Home</Link>

        <Link 
        onClick={()=> setisOpen(false)}
        to={"/search"}>
            <FaSearch />
        </Link>


        <Link 
        onClick={()=> setisOpen(false)}
        to="/cart">
            <FaShoppingBag/>
        </Link>

        {
            user?._id?
            <>
                <button onClick={()=> setisOpen(!isOpen)}>
                    <FaUser />
                </button>
                <dialog open={isOpen}>
                    <div>
                        {user.role === "admin" && (
                            <Link onClick={()=> setisOpen(false)} to={"/admin/dashboard"}>Admin</Link>
                        )}
                        <Link onClick={()=> setisOpen(false)} to={"/orders"} > Orders </Link>
                        <button onClick={logOutHandler}>
                            <FaSignOutAlt />
                        </button>
                    </div>
                </dialog>
            </>
            :
            <Link to="/login">
                <FaSignInAlt />
            </Link>
        }
    </nav>
  )
}

export default Header