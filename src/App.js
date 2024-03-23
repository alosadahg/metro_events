import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from'./Dashboard.js'; 
import Login from './Login.js';  
import Registration from './Registration.js';  

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
