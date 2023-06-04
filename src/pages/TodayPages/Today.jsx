import { useContext, useEffect } from "react";
import { LevelContext } from "../../LevelContext";
import styled from "styled-components";
import axios from "axios";
import RenderToday from "./RenderToday";

export default function Today() {
    const { user,  setUser, habit, setHabit } = useContext(LevelContext)
    const config = {
        headers:{
            "Authorization": `Bearer ${user.token}`
        }
    }
    useEffect(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        .then(resp => {setUser(prevStates => ({
            ...prevStates,
            todayHabits: [
                {
                    id: 3,
                    name: "Acordar",
                    done: true,
                    currentSequence: 1,
                    highestSequence: 1
                },
                {
                    id: 4,
                    name: "Almoçar",
                    done: false,
                    currentSequence: 1,
                    highestSequence: 1
                }
            ]
        }))
        })
        .catch(err => alert(err.response.data.message))
    }, [user.token])
    
    

    return (
        <Container>
            <RenderToday />
        </Container>
    )

}
const Container = styled.div`
    height: 100vh;
    background: #e5e5e5;
    
`
