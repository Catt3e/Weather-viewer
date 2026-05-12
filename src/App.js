import { Toaster } from 'react-hot-toast';
import AppRouter from './routers/AppRouter';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Toaster position="top-right" />
      <AppRouter />
    </div>
  );
}
export default App;