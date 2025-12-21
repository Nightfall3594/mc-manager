import {Routes, Route} from "react-router-dom";
import UserDashboard from "./pages/UserDashboard.tsx";
import GameNav from "./components/common/GameNav/GameNav.tsx";

function App() {

  const mockUser = {
    id: '1',
    name: 'HelloWorld',
    email: 'Apple@apple.com'
  }

  return (
    <>
      <GameNav currentUser={mockUser} />

      <Routes>
        <Route path="/" element={ <UserDashboard currentUser={mockUser}/> } />
      </Routes>
    </>
  )
}

export default App;
