/* eslint-disable */
import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import Reservation from './components/Reservation';

function App() {
  let [login, setLogin] = useState(true);

  useEffect(()=>{
    
    if( sessionStorage.getItem('userId') !== null ){
      setLogin(false);
    }else{
      setLogin(true);
    }
    
  }, [])

  return (
    <div >
      {
        login ?
          <header className="App-header">
            <Login />
          </header> 
          :
          <Reservation />
      }
    </div>
  );
}

export default App;
