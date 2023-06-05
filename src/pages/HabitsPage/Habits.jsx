import  { useContext, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { LevelContext } from "../../LevelContext";
import DisplayHabits from "./DisplayHabits";
import CustomInput from "../../components/CustomInput";
import axios from "axios";


export default function Habits() {
  const [userHabits, setUserHabits] =  useState({ name:"", days: [] })
  const [creatingHabit, setCreatingHabit] = useState(false)
  const { weekDays, user, setHabit, habit } = useContext(LevelContext)
  const [loading, setLoading] = useState(false)

  const config = {
    headers:{
        "Authorization": `Bearer ${user.token}`
    }
  } 
  useEffect( () => {
    axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
    .then(resp => setHabit(resp.data))
    .catch(error => alert(error.response.data.message))
  }, [setHabit])
  
  function selectDays(day) {
    console.log(userHabits, "selecionei um dia da semana")
    if (userHabits.days.includes(day)) {
      setUserHabits((prevState) => ({
        ...prevState,
        days: [prevState.days.filter((d) => d !== day)]
      }));
    } else {
      setUserHabits((prevState) => ({
        ...prevState,
        days: [...prevState.days, day],
      }));
    }
  }
  // if (userHabits.days.includes(day)){
  //   setUserHabits((prevState) => (
  //     {...prevState, days: [prevState.days.filter((d) => d !== day)]
  //   }))
  // } else {
  //   setUserHabits((prevState) => ({ ...prevState, days: [...prevState.days, day] })
  //   )
  // }

  function submitForm(event){
    event.preventDefault();
    setLoading(true)
    if(userHabits.days.length > 0){
      axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", userHabits, config )
      .then(() => {((
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
      .then(resp => setHabit(resp.data))
      .catch(error => alert(error.response.data.message))
      ))
      setCreatingHabit(prevState => !prevState)})
      .catch(error => alert(error.response.data.message))
      .finally(setLoading(false))
      setUserHabits({
        name: "",
        days: []})
      setCreatingHabit(prevState => !prevState)
    } else {
      alert("Selecione ao menos um dia da semana!")
    }
  }

  return(
    <HabitsDiv>
      <div className="containerTop">
        <p>Meus Hábitos</p>
        <button data-test="habit-create-btn" onClick={() => setCreatingHabit(prevState => !prevState)}>+</button>
      </div>
      {creatingHabit && (<HabitDiv data-test="habit-create-container">
        <form onSubmit={submitForm}>
          <CustomInput 
          placeholder={"nome do hábito"} 
          data_test={"habit-name-input"}
          value={userHabits.name} 
          type={"text"} 
          required={true}
          disabled={loading} 
          onChangeValue={(name) => 
            setUserHabits(prevValue => ({ 
              ...prevValue,
              name
            }))
          }/>

          <div className="days">
            {weekDays.map((day, i) => {
              return (
                <DayButton 
                data-test="habit-day"
                type="button"
                disabled={loading} 
                id={i}
                key={i} 
                days={userHabits.days}
                onClick={() => selectDays(i)}>
                  {day}
                </DayButton>
              )
            })}
          </div>
          <div className="butns">
            <CancelButton 
            data-test="habit-create-cancel-btn"
            type="button"
            disabled={loading} 
            onClick={() => {
              setCreatingHabit(prevState => !prevState)
              setUserHabits(prevState => ({
                ...prevState,
                days: []
              }))
              }}>Cancelar</CancelButton>

            <SaveButton
            disabled={loading}
            data-test="habit-create-save-btn"
            type="submit">Salvar</SaveButton>
          </div>
        </form>
      </HabitDiv>)}
      <CreatedHabits>
        <DisplayHabits />
      </CreatedHabits>
      
    </HabitsDiv>
  )
}
const HabitsDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  height: 100vh;
  background: #e5e5e5;
  padding: 20px 15px 15px;
  gap: 10px;
  .days{
    display: flex;
    gap: 7px;
    margin-top: 10px;
  }
  .containerTop{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    button{
      background: #52B6FF;
      border-radius: 4.63636px;
      font-family: 'Lexend Deca';
      font-style: normal;
      font-weight: 400;
      font-size: 26.976px;
      line-height: 34px;
      color: #FFFFFF;
      border: none;
      cursor: pointer;
      width: 40px;
      height: 35px;
      padding: 0;
    }
    p{
      font-family: 'Lexend Deca';
      font-style: normal;
      font-weight: 400;
      font-size: 22.976px;
      line-height: 29px;
      color: #126BA5;
    }
  }
  .butns {
    display: flex;
    justify-content: end;
  }
`
const CreatedHabits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const DayButton = styled.button`
  
  cursor: pointer;
  background-color: ${({ id, days }) => days.includes(id) ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  color: ${({ id, days }) => days.includes(id) ? "rgba(255, 255, 255, 1)" :"rgba(207, 207, 207, 1)" };
`
const HabitDiv = styled.div`
  padding: 20px;
  background: #FFFFFF;
  border-radius: 5px;

  input {
    padding-left: 10px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    width: 450px;
    height: 45px;
  }
  ::placeholder{
    color: #DBDBDB;
  }
  
  @media(max-width: 768px) {
    input{
      width: 95%;
    }
    }
`
const SaveButton = styled.button`
  border: none;
  background: #52B6FF;
  border-radius: 4.63636px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 15.976px;
  line-height: 20px;
  text-align: center;
  color: #FFFFFF;
  width: 85px;
  height: 35px;
  margin-top: 15px;
`
const CancelButton = styled.button`
  border: none;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 15.976px;
  line-height: 20px;
  text-align: center;
  color: #52B6FF;
  background: #FFFFFF;
  width: 85px;
  height: 35px;
  margin-top: 15px;
`