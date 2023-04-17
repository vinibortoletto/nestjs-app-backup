import './App.css';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import User from './pages/User';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/signup" />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </main>
  );
}

export default App;
