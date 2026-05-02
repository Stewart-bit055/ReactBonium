
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import VistaColab from './pages/VistaColab.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import VistaResto from './pages/VistaResto.jsx';

function PrivateRoute({ user, children, role }) {
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
}


function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute user={user} role="admin">
              <AdminPanel onLogout={() => setUser(null)} />
            </PrivateRoute>
          }
        />
        <Route
          path="/resto"
          element={
            <PrivateRoute user={user} role="resto">
              <VistaResto onLogout={() => setUser(null)} />
            </PrivateRoute>
          }
        />
        <Route
          path="/colab"
          element={
            <PrivateRoute user={user} role="colab">
              <VistaColab onLogout={() => setUser(null)} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? `/${user.role}` : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
