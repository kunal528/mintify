import React, { useEffect } from 'react'
import Navbar from './components/navbar'
import Uauth from '@uauth/js';
import { Route, Routes } from 'react-router';
import HomePage from './pages/homepage';
import CallBack from './pages/callback';
import Details from './pages/details';
import Create from './pages/create';
import { GlobalState } from './GlobalState';
import Mintify from './contracts/Mintify.json'
import MintifyMarketPlace from './contracts/MintifyMarket.json'


const App = () => {
  const [user, setUser] = React.useState(null);
  const [state, setState] = React.useState({
    provider: null,
    signer: null,
    userAddress: null,
    mintify: null,
    market: null,
  });

  const auth = new Uauth(
    {
      clientID: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      redirectUri: process.env.REACT_APP_REDIRECT_URI,
      scope: "openid wallet",
    }
  );

  const login = () => {
    auth.loginWithPopup().then(val => {
    });
  }



  useEffect(() => {
    auth.user().then(val => {
    })
  }, [])

  return (
    <GlobalState.Provider value={[state, setState]}>

      <div>
        <Navbar onClick={login} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/callback" element={<CallBack />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </GlobalState.Provider>
  )
}

export default App