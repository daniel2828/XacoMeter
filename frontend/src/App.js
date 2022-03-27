
import "./App.scss";
import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";

import NavBar from "./components/NavBar/NavBar";

function App() {

  return (
    <>
    <NavBar/>
    
    <BrowserRouter >
      <Switch>
        <Route path="/" exact={true}>
          <AuthPage />
        </Route>
        <Route path="/data" exact={true}>
          <MainPage />
        </Route>
      
      </Switch>
    </BrowserRouter>
    
    </>
  );
}

export default App;
