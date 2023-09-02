import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {
const [list,setList]=useState([]);

function LoadList(){
  axios.get("http://localhost:3000/user")
  .then(response=>{
    // console.log(response);
    setList(response.data);
  })
  .catch(err=>{
    console.log(err);
  })
}
useEffect(()=>{
LoadList();
},[]);

const handleDelete=(id)=>{
const confirm=window.confirm("Would you like to Delete?");
if(confirm){
  axios.delete('http://localhost:3000/user/'+ id)
  .then(res=>{
    window.location.reload()
  })
  .catch(err=>console.log(err));
}
}
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light '>
     <h1>List of Users</h1>
     <div className='w-75 rounded bg-white border shadow p-4'>
      <div className='d-flex justify-content-end'>
      <Link to="/create" className='btn btn-success'>Add +</Link>
      </div>
      <table className='table table-striped'>
        <thead> 
         <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
         </tr>
        </thead>
        <tbody>
         {
           list.map((item,index)=>(
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <Link to={`/read/${item.id}`} className='btn btn-sm btn-info me-2'>Read</Link> 
                <Link to={`/update/${item.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                <button onClick={e=>handleDelete(item.id)} className='btn btn-sm btn-danger'>Delete</button>
              </td>
            </tr>
            )
            )
         }
        </tbody>
      </table>
     </div>
    </div>
  )
}

export default Home
