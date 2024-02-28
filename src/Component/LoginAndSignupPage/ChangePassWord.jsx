import React, { useContext } from 'react'
import { Store } from '../Datastore/Context_SignUpAndLogin'

const ChangePassWord = () => {
    let { sendPassVerificationLink } = useContext(Store);
  return (
    <div>
      <input type="text" placeholder="Email" />
      <button onClick={()=>sendPassVerificationLink("jaitensahu9@gmail.com")}>Change Password</button>
      <label htmlFor="">New Password</label>
      <input type="text" />
      <label htmlFor="">Confirm Password</label>
      <input type="text" />
    </div>
  );
}

export default ChangePassWord