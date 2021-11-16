import React, {useEffect} from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { useDispatch } from 'react-redux';
import Login from './Login';
import { auth } from './firebase';
import { login, logout } from './features/appSlice';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

      
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
        if(authUser){
            dispatch(login({
                username: authUser.displayName,
                profilePic: authUser.photoURL,
                id: authUser.uid,
            }));
        }else{
          dispatch(logout());
        }
    })
  }, [])

  return (
    <div className="app">

        <Router>
            {!user ? (
                <Login/>
            ): (
              <>
                  <img 
                      className="app_logo"
                      src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" />
                    <div className="app_body">
                      
                        <div className="app_body_background">
                            <Switch>
                              <Route path="/chats">
                                  <Chats/>
                              </Route>

                              <Route path="/chat/view">
                                  <ChatView/>
                              </Route>

                              <Route path="/preview">
                                  <Preview/>
                              </Route>

                              <Route exact path="/">
                                  <WebcamCapture/>
                              </Route>
                            </Switch>
                        </div>
                 
                    
                  </div>
              </>

            )}
            
    </Router>
    
    </div>
  );
}

export default App;
