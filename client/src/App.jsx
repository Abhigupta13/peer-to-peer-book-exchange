import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import OwnerDashboard from './pages/OwnerDashboard';
import SeekerDashboard from './pages/SeekerDashboard';
import AddBook from './pages/AddBook';
import { AuthProvider } from './context/AuthContext';
import MyBooks from './pages/MyBooks';
import MyRentedBooks from './pages/myRentedBooks';

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/my-books" element={<MyBooks />} />
      <Route path="/my-rented-books" element={<MyRentedBooks/>} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
