
import { signOut, User } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {Link} from "react-router-dom"
import { auth } from '../firebase';


interface PropsType {
    user: User | null ;
}

const Header = ({user}: PropsType) => {
    
    const [isOpen, setisOpen] = useState <boolean> (false)
    const logOutHandler= async()=>{
        try {
            await signOut(auth);
            toast.success("Sign out successfully");
            setisOpen(false);
            
        } catch (error) {
            toast.error("Sign out failed ",);
        }
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