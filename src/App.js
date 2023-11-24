import './App.css';
import Premium from './components/Premium/Premium'
import Dashboard from './components/Dashboard/Dashboard';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/premium' element={<Premium />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
