import React, { createContext, useState } from 'react';
import './App.css';
import Username from './components/Username';
import Password from './components/Password';
import Submit from './components/Submit';

export const UserNameContext = createContext(null);
export const PasswordContext = createContext(null);

const App = () => {

  const [currentUser, setCurrentUser] = useState('');
  const [userpassword, setUserPassword] = useState('');

  return (
    <UserNameContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}>
      <PasswordContext.Provider
        value={{
          userpassword,
          setUserPassword
        }}>

        <div className="background-image">
          <h1>User Login</h1>
          <div className="App">
            <Username maxLength={8} />
            <Password maxLength={8} />
            <div className="submit" >
              <Submit />
            </div>
          </div>
        </div>
      </PasswordContext.Provider>
    </UserNameContext.Provider >
  );
};

export default App;
