import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen'
import AddScreen from './screens/AddScreen'
import EditScreen from './screens/EditScreen'
import RecipeScreen from "./screens/RecipeScreen";
import AuthScreen from "./screens/AuthScreen";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, login, logout, userId} = useAuth();
    const isAuthenticated = !!token;
    return (
        <div className="App">
            <AuthContext.Provider value={{
                token, login, logout, userId,isAuthenticated
            }}>
            <Router>
                <div>
                    <NavBar isAuthenticated={isAuthenticated}/>
                    <Switch>
                        <Route path="/auth" component={AuthScreen} />
                        <Route path="/add" component={()=><AddScreen userId={userId}/>} />
                        <Route path="/edit/:id" component={EditScreen} />
                        <Route path="/recipes/:id" render={({match})=><RecipeScreen match={match} props={{creator:userId}}/>} />
                        <Route path="/" component={()=><HomeScreen isAuthenticated={isAuthenticated} userId={userId}/>} />
                    </Switch>
                </div>
            </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
