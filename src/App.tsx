import { Outlet } from 'react-router';
import Header from './ui/header/Header';

function App() {
  return (
    <>
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </>
  );
}

export default App;
