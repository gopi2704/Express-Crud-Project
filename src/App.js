import './App.css';
import {useEffect, useState} from "react";
import Axios from "axios";

function App() {

  const [users,setUsers]= useState([]);
  const [id, setId] = useState("");
  const [name,setName] = useState("");
  const [Updated,setUpdated]=useState({id:"",name:""})

  useEffect(()=>{
    loadData();
  },[]);



  const loadData = async()=>{
   const response= await Axios.get("http://localhost:3003/users");
   console.log(response.data);
   setUsers(response.data)
  }


  const AddUser = (e)=>{

    e.preventDefault();
    Axios.post(`http://localhost:3003/users`, {
      id, name
    }).then(()=>{
      setId("");setName("");
    }).catch((err)=>{
      console.log(err);
    })

    setTimeout(()=>{
      loadData();
    },500)
  }

  const deletUser=(id)=>{
    Axios.delete(`http://localhost:3003/users/${id}`);

    setTimeout(()=>{
      loadData();
    },500)
  }

  const updateUser=()=>{
    console.log(Updated.id,Updated.name)

    Axios.put(`http://localhost:3003/users/${Updated.id}`,{
      id:Updated.id,name:Updated.name
    }).then((response)=>{
      console.log(response)
    }).catch((e)=>{
      console.log(e)
    })

    setTimeout(()=>{
      loadData();
    },500)
  }
  return (
    <div className="App">
      <div className='gop'>
        <input placeholder='Enter Id ..' value={id} onChange={e=> setId(e.target.value)}/>
        <input placeholder='Enter Name ..' value={name} onChange={e=> setName(e.target.value)}/>
        <button onClick={AddUser}>Add</button>
        </div>
      {users.map(e=>(
      <div key={e.id} className='box'>
       <div className='box-1'>
        <p>ID : {e.id}</p>
        <p>Name : {e.name}</p>   
        <button onClick={()=>{deletUser(e.id)}}>Delete</button>
        </div>
        <div>
          <div className='box-2'>
          <input type='text' placeholder='Enter Updated ID' onChange={e=> setUpdated({...Updated,id:e.target.value})}/>
          <br/>
          <input type='text' placeholder='Enter Updated NAME' onChange={e=> setUpdated({...Updated,name:e.target.value})}/>
          <button onClick={updateUser}>Update</button>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}

export default App;
