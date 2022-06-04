
import "./App.scss";
import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";

import NavBar from "./components/NavBar/NavBar";
import XacoProvider from "./providers/XacoProvider";

import AdminPage from "./pages/AdminPage";

function App() {
  
  return (
    <XacoProvider>
   
    
    <BrowserRouter  >
    
    <Switch>
   
    <Route path="/" exact={true}>
        <AuthPage />
    </Route>
    <Route path="/data" exact={true}>
        <NavBar/>
        <MainPage />
    </Route>
    <Route path="/admin" exact={true}>
        <NavBar/>
        <AdminPage/>
    </Route>
    </Switch>
    </BrowserRouter>
    
    </XacoProvider>
  );
}

export default App;
