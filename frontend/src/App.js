
import "./App.scss";
import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";

import NavBar from "./components/NavBar/NavBar";
import AuthProvider from "./providers/AuthProvider";
function App() {
  console.log(process.env.REACT_APP_BACK_PATH)
  console.log(process.env)
  return (
    <AuthProvider>
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
    
    </AuthProvider>
  );
}

export default App;
