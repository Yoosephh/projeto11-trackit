import { useContext, useEffect } from "react";
import { LevelContext } from "../../LevelContext";
import styled from "styled-components";
import axios from "axios";

export default function Today() {
    const { user,  setUser } = useContext(LevelContext)
    const config = {
        headers:{
            "Authorization": `Bearer ${user.token}`
        }
    }
    useEffect(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        .then(resp => {setUser(prevStates => ({
            ...prevStates,
            todayHabits: resp.data
        }))
        console.log(user)})
        .catch(err => alert(err.response.data.message))
    }, [user.token])
    
    
    console.log(user)
    return (
        <Container>
            
        </Container>
    )

}
const Container = styled.div`
    height: 100vh;
    background: #e5e5e5;
`