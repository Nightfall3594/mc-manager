import {Routes, Route} from "react-router-dom";
import UserDashboard from "./pages/UserDashboard.tsx";
import Sidebar from "./components/common/Sidebar/Sidebar.tsx";

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
        <Route path="/" element={ <UserDashboard currentUser={mockUser}/> } />
      </Routes>
    </>
  )
}

export default App;
