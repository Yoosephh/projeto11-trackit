import { useContext } from "react"
import styled from "styled-components"
import { LevelContext } from "../../LevelContext"
import { DayButton } from "./Habits"
import axios from "axios";

export default function DisplayHabits() {
  const {user, weekDays, habit, setHabit} = useContext(LevelContext);
  const config = {
    headers:{
        "Authorization": `Bearer ${user.token}`
    }
}

  function deleteHabit(index) {
    const confirm = window.confirm("Deseja mesmo deletar o hábito?")
    if(confirm){
      axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit[index].id}`, config)
      .then(()=> {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        .then(resp => {
          setHabit(resp.data)})
        .catch(error => alert(error.response.data.message))
      })
      .catch(err => alert(err.response.data.message))
    }
  }

  return (
    habit.map(({name, days}, index) => (
      <UserHabitDiv data-test="habit-container" key={index}>
        <p data-test="habit-name" className="HabitName"> {name}</p>
        <div className="days">
        {weekDays.map((day, i) => {
            return (
              <DayButton 
              data-test="habit-day"
              type="button" 
              id={i} 
              key={i} 
              days={days}>
                {day}
              </DayButton>
              )
            })}
        </div>
          
        <ion-icon data-test="habit-delete-btn" onClick={() => deleteHabit(index)} name="trash-outline"></ion-icon>
      </UserHabitDiv>
    ))
    
  )
}

const UserHabitDiv = styled.div `
position: relative;
padding: 10px 0px 15px 15px;
background: #FFFFFF;
border-radius: 5px;
.HabitName {
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  color: #666666;
}
ion-icon {
  cursor:pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  height: 20px;
  width: 20px;
}
`