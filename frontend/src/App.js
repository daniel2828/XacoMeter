import logo from './logo.svg';
import './App.css';
import AuthPage from "./pages/MainPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AuthPage/>} />
        {/* <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
