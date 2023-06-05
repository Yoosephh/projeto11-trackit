import { useContext, useEffect } from "react";
import { LevelContext } from "../../LevelContext";
import styled from "styled-components";
import axios from "axios";
import RenderToday, { HabitsCompleted } from "./RenderToday";

export default function Today() {
    const { user,  setUser } = useContext(LevelContext)
    const config = {
        headers:{
            "Authorization": `Bearer ${user.token}`
        }
    }
    useEffect(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        .then(resp => {setUser(prevState => ({
            ...prevState,
            todayHabits: resp.data
        }))})
        .catch(err => alert(err.response.data.message))
    }, [user.token])
    
    

    return (
        <Container>
            {HabitsCompleted()}
            <RenderToday />
        </Container>
    )

}
const Container = styled.div`
    height: 100vh;
    background: #e5e5e5;
    
`
