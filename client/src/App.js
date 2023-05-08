import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import PostPage from "./PostPage";
import ValidatePage from "./ValidatePage";
import './login.css';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function updateAuthStatus(authStatus) {
    setIsAuthenticated(authStatus)
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage updateAuthStatus={updateAuthStatus} isAuthenticated={isAuthenticated} />} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/validate' element={<ValidatePage />} />
          <Route path='/post' element={<PostPage isAuthenticated={isAuthenticated} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;