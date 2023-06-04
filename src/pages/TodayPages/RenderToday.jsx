import { useContext } from "react";
import { LevelContext } from "../../LevelContext";
import styled from "styled-components";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import { check } from "../../../public/images/imgs";


export default function RenderToday(){
  const { user,  setUser } = useContext(LevelContext);

  function isTaskDone(index){
      const userHabits = [...user.todayHabits]
      userHabits[index].done = !userHabits[index].done
      
      setUser(prevState => ({
        ...prevState,
        todayHabits: [...userHabits]
      }))
  }
  function habitsComplete(){
    let counter = 0;
    for(let i = 0; i < user.todayHabits.length; i++) {
      if(user.todayHabits[i].done == true) {
        counter = counter + 1;
      }
    }
    console.log((user.todayHabits.length / counter) * 100)
  }

  function renderDay() {
    dayjs.locale('pt-br')
    const currentDate = dayjs().format('dddd, DD/MM/YYYY');
    const capitalized = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
    return <p className="day">{capitalized}</p>
  }
  function renderTodayHabits(){
    if(user && user.todayHabits){
      return(
        user.todayHabits.map(({name, done, currentSequence, highestSequence}, index) => (
          <TodayHabit key={index}>
            <p className="TitleName">{name}</p>
            <StatusSequence>
              <p className="StatusSequence">Sequência atual: {currentSequence} dias</p>
              <p className="StatusSequence">Seu récorde: {highestSequence} dias</p>
            </StatusSequence>
            <CheckImg done={isTaskDone} onClick={()=> isTaskDone(index)}>
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

      <p>Nenhum hábito concluído ainda</p>
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
const Habits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`
const StatusSequence = styled.div`
  margin-top: 7px;
  margin-left: 15px;
  .StatusSequence{
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