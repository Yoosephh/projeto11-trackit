import { useContext } from "react"
import styled from "styled-components"
import { LevelContext } from "../LevelContext"


export default function Header(){
    const {user} = useContext(LevelContext)
    return(
        <ContainerDiv data-test="header" >
            <p>TrackIt</p>
            <img data-test="avatar" src={user.image}/>
        </ContainerDiv>
    )
}

const ContainerDiv = styled.div`
    width: 100%;
    position: fixed;
    left: 0;
    z-index: 99;
    top: 0;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    p {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: white;
        padding: 15px 10px;
    }
    img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        padding: 15px 10px;
        align-items: center;
    }

`