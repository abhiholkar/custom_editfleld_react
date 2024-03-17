import React, { useContext } from 'react';
import { PasswordContext, UserNameContext } from "../App.js"



const Submit = () => {
  const {currentUser} = useContext(UserNameContext);
  const {userpassword} = useContext(PasswordContext);
  const handleSubmit = () => {    
    console.log("currentUser:", currentUser);
    console.log("userpassword:", userpassword);

  };

  return (
    <div className="form-field">
      <button onClick={handleSubmit} className='signin'>
        Sign In
      </button>
    </div>
  );
};

export default Submit;
