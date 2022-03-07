import { Modal } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { fetchprojectServiceAll } from '../config/projectService';

// import { useSelector,useDispatch } from 'react-redux';
const regForName = RegExp(/^[a-zA-Z]/);
const regForURL = RegExp(/^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/);


const Dashboard = () => {
  const[showModel,setShowModel]=useState(false);
  const[state,setState]=useState({title:'',demo:'',github:'',description:'',index:'',alldata:[]})
  const[errors,setErrors] = useState({errtitle:'',errdemo:'',errgithub:'',allError:''})
  const [user,setUser] = useState({});
  const [project,setProject]=useState([])
  const [flag,setflag]=useState({flag1:true,flag2:true})
  // const descRedux = useSelector((state)=>state.editorReducer);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  //closing the model
  const handlecolse=()=>{
    setShowModel(false)
  }

  useEffect(()=>{
    if(localStorage.getItem('_token')!=undefined){
      const token = localStorage.getItem('_token');
      const decode = jwtDecode(token)
      setUser(decode)
      fetchProjectDetails();
    }
    else{
      navigate("/")
    }
  },[])

  //fetching all project which are not soft deleted
  const fetchProjectDetails=()=>{
    fetchprojectServiceAll().then(res => {
      setProject(res.data.data)
      console.log(res.data.data)//-->geting all data 
      setState({...state,alldata: res.data.data,title:"",demo:"",github:""})
    })
   setflag({...flag,flag:true}) 
  }

  //filter for all self and other by comparing email
  const ApplyFilter = (value)=>{
    if(value === "Self"){
      const result = state.alldata.filter(ele => ele.user_email == user.email);
      setProject(result)
      console.log(result)//no data becuse not user creating data
      setflag({...flag,flag1:true})
    }
    else if(value === "Other"){
      const result = state.alldata.filter(ele => ele.user_email != user.email)
      setProject(result)
      console.log(result)
      setflag({...flag,flag1:false})
    }
    else{
      fetchProjectDetails();
      setflag({...flag,flag1:true})
    }
  }
  return (
    <>
    {localStorage.getItem('_token')!= undefined ?
    <>
      <Navbar/>
      <div className='container-fluid row mt-3'>
        {flag.flag1 ? //-->btn display in all and self tag because of flag is true
          <div className='col-6'>
            <button className='button btn-info' onClick={()=>setShowModel(true)}>Add new project</button>

          </div>
          :
          <div className='col-6'></div>
          }
          <div className='col-6 d-flex justify-content-end'>
            <p className='font-weight-bold mr-2'>Sort By:</p>
            <span><input type="radio" name="filter" onClick={()=>ApplyFilter("All")} />All</span>
            <span className='mx-1'><input type="radio" name='filter' onClick={()=>ApplyFilter("Self")}/>Self</span>
            <span><input type="radio" name='filter' onClick={()=>ApplyFilter("Other")}/>Other</span>
          </div>
      </div>
    </>:<Navigate to="/"></Navigate>//-->navigate to login 
    }

    <Modal show={showModel} onHide={handlecolse}>
    </Modal>
    </>
  )
}

export default Dashboard