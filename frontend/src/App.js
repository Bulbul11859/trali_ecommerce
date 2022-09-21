import { Button } from 'rsuite';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Home from './pages/Home';
import Menubar from './components/Menubar'
import Dashboard from './pages/Dashboard';
import Vendor from './components/Vendor';
import Registration from './components/Registration';
import Login from './components/Login';
import Cart from './pages/Cart';





function App() {
  return (
    <>
      
      <BrowserRouter>
      <Menubar></Menubar>
    <Routes>
    <Route path="/cart" element={<Cart />}></Route>
    <Route path="/admin" element={<Dashboard />}></Route>
    <Route path="/registration" element={<Registration />}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/vendor" element={<Vendor/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/" element={<Home />}>
     
      
      </Route>
    </Routes>
  </BrowserRouter>

    
   
      
    
     
    </>
  );
}

export default App;
