
import "./App.scss";
import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";

import { useTranslation, initReactI18next } from "react-i18next";
import NavBar from "./components/NavBar/NavBar";

function App() {

  return (
    <>
    <NavBar/>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <AuthPage />
        </Route>
        <Route path="/data" exact={true}>
          <MainPage />
        </Route>
        <Route path="/translation" exact={true}>
          <p>{}</p>
        </Route>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
