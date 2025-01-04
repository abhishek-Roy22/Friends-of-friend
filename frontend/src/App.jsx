import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <main className="w-full bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};

export default App;
