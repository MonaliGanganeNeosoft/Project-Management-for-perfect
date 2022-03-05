import React,{useState} from 'react'
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container,Form,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { registerService } from '../config/userService';
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FormControl } from 'react-bootstrap';

const styled = {
    margin: 0,
    fontSize: "small",
    color: "red",
  };
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[A-Za-z]{3,30}$/);
const regForpassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

  
export default function Registeration() {
    const [errors,setErrors] = useState({errFirstname:"",errLastname:"",errEmail:"",errPassword:"",errConfirmpassword:"",pass:null,submit_error:''})
    const [user,setUser] = useState({firstname:"",lastname:"",email:"",password:"",confirmpassword:"",profile:"",showpassword:false,showconfirmpassword:false});
    const navigate = useNavigate();

    //For validation
    const handler=(e)=>{
        const {name,value}=e.target;
        let error = ''
        switch(name){
            case "firstname":error = regForName.test(value) ? "" : "Invalid fisrt name";
                setErrors({...errors,errFirstname:error});
                break;
            case "lastname":error = regForName.test(value) ? "" : "Invalid last name";
                setErrors({...errors,errLastname:error});
                break;
            case "email":error = regForEmail.test(value) ? "" : "Invali email";
                setErrors({...errors,errEmail:error});
                break;
            case "password":error = regForpassword.test(value) ? "" : "Enter strong pasword";
                setErrors({...errors,errPassword:error, pass:value});
                break;
            case "confirmpassword":error = value === errors.pass ? "" : "Password does not match";
                setErrors({...errors,errConfirmpassword:error});
                break;
        }
        console.log(errors);
        setUser({...user,[name]:value})
    }

    //New User Registeration
    const validate=()=>{
        if(user.firstname !== '' && user.lastname !== '' && user.email !== '' && user.password !== '' && user.confirmpassword !=='' && user.profile !==''){
            const formData = new FormData()
            formData.append('firstname',user.firstname)
            formData.append('lastname',user.lastname)
            formData.append('email',user.email)
            formData.append('password',user.password)
            formData.append('profile',user.profile)

            registerService(formData).then(res=>{
                if(res.data.err == 0){
                    console.log(res.data.msg,"line 48");
                    console.log(res.data)
                    navigate("/")
                }
                else{
                    setErrors({...errors,submit_error:res.data.msg})
                }
            })
        }
        else{
            setErrors({...errors,submit_error:"Enter all register data"})
        }
    }
  return (
    <>
    <Container>
        <h2 className='text-center'>Register here</h2>
        {errors.submit_error.length != 0 && <Alert severity="error" >{errors.submit_error}</Alert>}

        {/* //1-row for first and last name 2-col */}
        <Form.Group>
            <Row className="justify-content-md-center">
                <Col xs lg="3">
                    <Form.Control type='text' placeholder='firstname' name='firstname' onBlur={handler} ></Form.Control>
                    <Form.Text style={styled}>{errors.errFirstname}</Form.Text>
                </Col>
                <Col xs lg="3">
                    <Form.Control type='text' placeholder='lastname' name='lastname' onBlur={handler} ></Form.Control>
                    <Form.Text style={styled}>{errors.errLastname}</Form.Text>
                </Col>
            </Row>
        </Form.Group>

        {/* //-->email */}
        <Form.Group>
            <Row className='justify-content-md-center'>
                <Col xs lg="6">
                    <Form.Control type='email' placeholder='email' name='email' onBlur={handler} ></Form.Control>
                    <Form.Text style={styled}>{errors.errEmail}</Form.Text>
                </Col>
            </Row>
        </Form.Group>

        {/* //-->password 1-row 2-col */}
        <Form.Group>
            <Row className='justify-content-md-center'>
                <Col xs lg="3">
                    <Form.Control type={user.showpassword ? "text" : "password"}  placeholder="password" name="password" onBlur={handler} ></Form.Control>
                    {user.showpassword ? (<BsEyeFill className="iconLogin" onClick={()=>setUser({...user,showpassword:false})}></BsEyeFill>):(<BsEyeSlashFill className='iconlogin' onClick={()=>setUser({...user,showpassword:true})}></BsEyeSlashFill>)}
                    <Form.Text style={styled}>{errors.errPassword}</Form.Text>
                </Col>
                <Col xs lg="3">
                    <Form.Control type={user.showconfirmpassword ? "text" : "password"} placeholder="confirmpassword" name="confirmpassword" onBlur={handler} ></Form.Control>
                    {user.showconfirmpassword ? (<BsEyeFill className='iconlogin' onClick={()=>setUser({...user,showconfirmpassword:false})} ></BsEyeFill>):(<BsEyeSlashFill className='iconlogin' onClick={()=>setUser({...user,showconfirmpassword:true})} ></BsEyeSlashFill>)}
                    <Form.Text style={styled}>{errors.errConfirmpassword}</Form.Text>

                </Col>
            </Row>
        </Form.Group>

        {/* //-->for profile */}
        <Form.Group>
            <Row className='justify-content-md-center'>
                <Col xs lg="6">
                    <FormControl type="file" placeholder='image' name='profile' onChange={(e)=>setUser({...user,profile:e.target.files[0]})} ></FormControl>
                    <Form.Text style={styled}>{errors.contact}</Form.Text>

                </Col>
            </Row>
        </Form.Group>

        <div className='text-center'>
            <Button varient="primary" onClick={()=>validate()}>Register</Button>
            <span>Alreday have an account ? 
                <Link to="/" className="font-weight-bold" style={{textDecoration : "none"}}>Login here</Link>
            </span>
        </div>
    </Container>
    </>
  )
}
