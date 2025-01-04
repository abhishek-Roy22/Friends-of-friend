import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <main className="container mx-auto bg-slate-900 min-h-screen">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default App;
