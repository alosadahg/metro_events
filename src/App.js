import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from'./Components/Dashboard.js'; 
import Login from './Components/Login.js';  
import Registration from './Components/Registration.js';  

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
