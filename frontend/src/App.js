import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Registeration from "../src/components/Registeration";
import Login from "../src/components/Login";
import Dashboard from './components/Dashboard';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/registration' element={<Registeration/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
