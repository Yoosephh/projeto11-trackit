import { useContext, useState } from "react"
import styled from "styled-components"
import { LevelContext } from "../../LevelContext"
import { DayButton } from "./Habits"

export default function DisplayHabits() {
  const {weekDays, habit, setHabit} = useContext(LevelContext);
  
  function deleteHabit(index) {
    const newHabits = habit.filter((_,i) => i !== index)
    setHabit(newHabits)
  }

  return (
    habit.map(({name, days}, index) => (
      <UserHabitDiv key={index}>
        <p className="HabitName"> {name}</p>
        <div className="days">
        {weekDays.map((day, i) => {
            return (
              <DayButton type="button" 
              id={i} 
              key={i} 
              days={days}>
              
                {day}
              </DayButton>
              )
            })}
        </div>
          
        <ion-icon onClick={() => deleteHabit(index)} name="trash-outline"></ion-icon>
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
  position: absolute;
  top: 10px;
  right: 10px;
  height: 20px;
  width: 20px;
}
`