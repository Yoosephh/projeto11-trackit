import { Route, Routes, useLocation } from "react-router-dom"
import {GlobalStyleReset} from "./style/reset"
import Habits from "./pages/HabitsPage/Habits"
import Register from "./pages/SignInPage/SignInPage"
import Today from "./pages/TodayPages/Today"
import History from "./pages/HistoryPage/History"
import Login from "./pages/LoginPage/Login"
import  { useState, useContext } from "react"
import { LevelContext } from "./LevelContext"
import Header from "./pages/Header"
import Footer from "./pages/Footer"

export default function App() {

  const [user, setUser] = useState([]);
  const [habit, setHabit] = useState([
    {
      id: 1,
      name: "Nome do hábito",
      days: [1, 3, 5]
    },
    {
      id: 2,
      name: "Nome do hábito 2",
      days: [1, 3, 4, 6]
    }
  ]);
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const level = useContext(LevelContext)
  let currentLocation = useLocation();
  return (
    <>
      <GlobalStyleReset />      
      <LevelContext.Provider value={{user, setUser, weekDays, habit, setHabit}}>
      
      {(currentLocation.pathname != "/" && currentLocation.pathname != "/cadastro") && <> <Header /> <Footer /> </>}
      
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/cadastro" element={<Register />}/>
          <Route path="/habitos" element={<Habits />}/>
          <Route path="/hoje" element={<Today />}/>
          <Route path="/historico" element={<History />}/>
        </Routes>
      </LevelContext.Provider>
    </>
  )
}


