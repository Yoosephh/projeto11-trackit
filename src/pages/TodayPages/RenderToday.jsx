import { useContext, useEffect } from "react";
import { LevelContext } from "../../LevelContext";
import styled from "styled-components";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import { check } from "../../../public/images/imgs";
import axios from "axios";


export function HabitsCompleted(){
  const { user, setCounter } = useContext(LevelContext);
  if(user && user.todayHabits){
    let contador = 0
    for(let i = 0; i < user.todayHabits.length; i++) {
      if(user.todayHabits[i].done) {
        contador = contador + 1;
      }
    }
    setCounter((contador / user.todayHabits.length ) * 100)
  }
}
export default function RenderToday(){
  const { user,  setUser, counter, setCounter } = useContext(LevelContext);
  const config = {
    headers:{
        "Authorization": `Bearer ${user.token}`
    }
}

  function isTaskDone(index){
    console.log(user.todayHabits[index].id, user.todayHabits)
    if(!user.todayHabits[index].done){
      axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${user.todayHabits[index].id}/check`, "" ,config)
      .then(() => habitsComplete())
      .catch(error => alert(error.response.data.message))
    } else { 
      axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${user.todayHabits[index].id}/uncheck`, "" , config)
      .then(() => habitsComplete())
      .catch(error => alert(error.response.data.message))
    }

      const userHabits = [...user.todayHabits]
      userHabits[index].done = !userHabits[index].done
      setUser(prevState => ({
        ...prevState,
        todayHabits: [...userHabits]
      }))
  }

function habitsComplete(){
    let contador = 0
    
      for(let i = 0; i < user.todayHabits.length; i++) {
        if(user.todayHabits[i].done) {
          contador = contador + 1;
        }
      }
      setCounter((contador / user.todayHabits.length ) * 100)
    
  }

  function renderDay() {
    dayjs.locale('pt-br')
    const currentDate = dayjs().format('dddd, DD/MM/YYYY');
    const capitalized = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
    return <p data-test="today" className="day">{capitalized}</p>
  }
  function renderTodayHabits(){
    if(user && user.todayHabits){
      return(
        user.todayHabits.map(({name, done, currentSequence, highestSequence}, index) => (
          <TodayHabit data-test="today-habit-container" key={index}>
            <p className="TitleName" data-test="today-habit-name">{name}</p>
            <StatusSequence>
              <p className="StatusSequence" data-test="today-habit-sequence">Sequência atual: &nbsp;
              <IsSequence data-test="today-habit-sequence" done={done}> { done ? ` ${currentSequence + 1}` : ` ${currentSequence}`} dias</IsSequence> 
              </p>
              <p className="StatusSequence" data-test="today-habit-record" >Seu recorde: &nbsp;
              <IsRecord data-test="today-habit-record" current={currentSequence} highest={highestSequence}>{highestSequence} dias</IsRecord></p>
            </StatusSequence>
            <CheckImg done={done} data-test="today-habit-check-btn" onClick={()=> isTaskDone(index)}>
              {check()}
            </CheckImg> 
          </TodayHabit>
        ))
      )
    }
    }
    
  return(
    <DivDay>
      {renderDay()}

      {counter > 0 ? <p data-test="today-counter" className="Completed"> {Math.floor(counter)}% dos hábitos concluídos</p> : <p data-test="today-counter">Nenhum hábito concluído ainda</p>}
      <Habits>
        {renderTodayHabits()}
      </Habits>
      
    </DivDay>
  )
}

const TodayHabit = styled.div`
  position: relative;
  background: #FFFFFF;
  border-radius: 5px;
  height: 95px;
  .TitleName{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    padding-top: 15px;
    padding-left: 15px;
  }
`
const IsSequence = styled.div`
  display: flex;
  color: ${({ done }) => done ? "#8FC549" : "#666666"}
`
const IsRecord = styled.div`
  color: ${({ current, highest }) => current === highest && current > 0 ? "#8FC549" : "#666666"}
`
const Habits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`
const StatusSequence = styled.div`
  width: 200px;
  margin-top: 7px;
  margin-left: 15px;
  .StatusSequence{
    display: flex;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
  }
`
const DivDay = styled.div`

margin-top: 80px;
padding: 20px 15px 15px;
.Completed {
  color:#8FC549;
}
  .day{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
  }
  p{ 
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #BABABA;
  }
`
const CheckImg = styled.button`
cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ done }) => done ? "#8FC549" : "#EBEBEB"} ;
  border: 1px solid #E7E7E7;
  border-radius: 5px;
  width: 69px;
  height: 69px;
  margin: 15px;
`