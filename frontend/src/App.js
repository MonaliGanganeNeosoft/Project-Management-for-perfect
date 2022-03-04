import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Registeration from "../src/components/Registeration";
import Login from "../src/components/Login"
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/registration' element={<Registeration/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
