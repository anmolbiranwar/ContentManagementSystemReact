import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Update() {
  const {id}=useParams();

  const [values,setValues]=useState({
    name:'',
    email:'',
    phone:''
  })

  const navigate=useNavigate();

  useEffect(()=>{ 
    axios.get('http://localhost:3000/user/'+id)
    .then(response=>{
      setValues(response.data);
    })
    .catch(err=>console.log(err));
  },[])
 
  const handleUpdate=(e)=>{
    e.preventDefault();
    axios.put("http://localhost:3000/user/"+ id,values)
    .then(res=>{
      console.log(res);
      // setValues(res.data)
      navigate('/');
    })
    .catch(err=>console.log(err));
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border rounded bg-white shadow px-5 pt-3 pb-3'>
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
          <div className='mb-2'>
            <label htmlFor='name'>Name:</label>
            <input type="text" name='name' className='form-control' required placeholder='Enter Name' value={values.name} onChange={e=>setValues({...values,name:e.target.value})}/>
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email:</label>
            <input type="email" name='email' className='form-control' required placeholder='Enter Email' value={values.email} onChange={e=>setValues({...values,email:e.target.value})}/>
          </div>
          <div className='mb-3'>
            <label htmlFor='phone'>Phone:</label>
            <input type="number" name='phone' className='form-control' required placeholder='Enter Phone' value={values.phone} onChange={e=>setValues({...values,phone:e.target.value})}/>
          </div>
          <button className='btn btn-success'>Update</button>
          <Link to="/" className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  )
}

export default Update
