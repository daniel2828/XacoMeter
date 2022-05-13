
import "./App.scss";
import AuthPage from "./pages/AuthPage";
import { withRouter, BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";

import NavBar from "./components/NavBar/NavBar";
import XacoProvider from "./providers/XacoProvider";
import { createBrowserHistory } from 'history'
import AdminPage from "./pages/AdminPage";

const history = createBrowserHistory()
const routerWith =()=>{
  return (
    <>
  
    </>
  )
}
function App() {
  
  return (
    <XacoProvider>
   
    
    <BrowserRouter  >
    <NavBar/>
    <Switch>
   
    <Route path="/" exact={true}>
        <AuthPage />
    </Route>
    <Route path="/data" exact={true}>
        <MainPage />
    </Route>
    <Route path="/admin" exact={true}>
        <AdminPage/>
    </Route>
    </Switch>
    </BrowserRouter>
    
    </XacoProvider>
  );
}

export default App;
