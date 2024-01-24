import React, { useContext } from 'react'
import { Store } from '../Datastore/Context_SignUpAndLogin'
import { useParams } from 'react-router-dom';

const Dashboard = () => {
    let {setUserObj, userObj}=useContext(Store);
    let param = useParams();
    console.log(param);
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={()=>setUserObj({})}>Logout</button>
    </div>
  )
}

export default Dashboard
