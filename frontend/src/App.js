
import "./App.scss";
import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <AuthPage />
        </Route>
        <Route path="/data" exact={true}>
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
