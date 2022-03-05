import { Alert } from 'bootstrap';
import React,{useState} from 'react';
import { Container,Form,Col,Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../config/userService';
import { IoMdMail } from 'react-icons/io'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom";


function Login() {
  const [user,setUser] = useState({email:'',password:'',error:''})
  const [showpassword,setShowpassword] = useState(false);
  const navigate = useNavigate();

  const loginUser=()=>{
    if(user.email !== '' && user.password !== ''){
      loginService({email:user.email,password:user.password}).then(res=>{
        if(res.data.err == 0){
          console.log(res.data)//-->login data comes registered user
          localStorage.setItem("_token",res.data.token);
          console.log(res.data.token)//-->user login token
          navigate("/dashboard")
        }
        else{
          setUser({...user,error:'Email and password does not match'})
        }
      })
    }
    else{
      setUser({...user,error:'Pls enter login details'})
    }
  }
  return (
    <>
    <Container>
      <h2 className='text-center'>Login here</h2>
      {user.error.length != 0 && <Alert severity="error" >{user.error}</Alert>}

      {/* //-->Email */}
      <Form.Group>
        <Row className="justify-content-md-center">
          <Col xs lg="3">
            <Form.Control type='email' placeholder='email address' name='email' onChange={(e)=>setUser({...user,email:e.target.value})} value={user.email} ></Form.Control>
            <IoMdMail className='iconlogin'/>
          </Col>
        </Row>
      </Form.Group>

      {/* //-->password */}
      <Form.Group>
        <Row className="justify-content-md-center">
          <Col xs lg="3">
            <Form.Control name="password" placeholder='password' type={showpassword ? "text" : "password"} onChange={(e)=>setUser({...user,password:e.target.value})} value={user.password} ></Form.Control>
            {showpassword ? <BsEyeFill className='iconlogin' onClick={()=>setShowpassword(false)}></BsEyeFill> : <BsEyeSlashFill className='iconlogin' onClick={()=>setShowpassword(true)}/>}
            <IoMdMail className='iconlogin'/>
          </Col>
        </Row>
      </Form.Group>

      <div className='text-center'>
        <Button variant="primary" onClick={()=>loginUser()}>Login</Button>
      </div>
      <div className='d-flex justify-content-between'>
        <span>Dont have an account?
          <Link to="/registration" style={{textDecoration:"none"}} >Register here</Link>
        </span>
      </div>
    </Container>
    </>
  )
}

export default Login