import React,{useEffect,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Navbar() {
    const [user,setUser] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('_token')!=undefined){
            let token = localStorage.getItem('_token');
            let decode = jwtDecode(token)
            setUser(decode)//-->token is decoded
            console.log(decode)
        }
        else{
            navigate("/")
        }
    },[])

    const logout=()=>{
        localStorage.removeItem('_token');//-->Token is removed
    }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Project Management</a>
            <div>
                <Link className='navbar-brand' to="/dashboard">
                    <img src={`../images/${user.profile}`} alt='profile' className='profile_img' style={{height:"40px"}} />
                    <span className='text-white font-weight-bold ml-2'>{user.firstname} {' '} {user.lastname}</span>
                </Link>
            </div>
            <form className='form-inline'>
                <button className='btn-primary' onClick={()=>logout()}>Logout</button>
            </form>
        </div>
    </nav>
    </>
  )
}

export default Navbar