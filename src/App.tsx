import {Routes, Route} from "react-router-dom";
import UserDashboard from "./pages/UserDashboard.tsx";
import Sidebar from "./components/common/Sidebar/Sidebar.tsx";
import Console from "./pages/Console.tsx";
import BackupsPage from "./pages/Backups.tsx";
import ModsPage from "./pages/Mods.tsx";

function App() {

  const mockUser = {
    id: '1',
    name: 'HelloWorld',
    email: 'Apple@apple.com'
  }

  return (
    <>
      <Sidebar currentUser={mockUser} />

      <Routes>
          <Route path="/" element={ <UserDashboard /> } />
          <Route path="/console" element={ <Console /> } />
          <Route path="/backups" element={ <BackupsPage /> } />
          <Route path="/mods" element={ <ModsPage /> } />
      </Routes>
    </>
  )
}

export default App;
