import axios from "axios"
import styled from "styled-components"
import { logo } from "../../../public/images/imgs"
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName]= React.useState("");
    const [img, setImg] = React.useState("");
    const navigate = useNavigate();

    function register(e){
        e.preventDefault();

        const user = {
            email: email,
            name: name,
            image: img,
            password: password
        }

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", user)
        .then(()=> navigate("/"))
        .catch(error => alert(error.response.data.message))
    }

    return (
        <AppContainer>
            <Logo>
                {logo}
            </Logo>
            
            <FormDiv>
                <form onSubmit={register}>
                    <div>
                        <input 
                        required
                        type="email" 
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <input 
                        required
                        type="password" 
                        placeholder="Senha"
                        id="senha" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div>
                    <div>
                        <input 
                        required
                        type="text"
                        placeholder="Nome"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <input 
                        required
                        type="" 
                        placeholder="Foto"
                        id="img"
                        value={img}
                        onChange={e => setImg(e.target.value)}/>
                    </div>
                        <button className="btnSubmit" type="submit">Entrar</button>
                    </div>
                </form>
                
            </FormDiv>
            <h1 onClick={() => navigate("/")}>
                Já tem uma conta? Faça login!
            </h1>
        </AppContainer>
    )
}

const AppContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
    h1 {
        margin-top: 25px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
        
    }
`
const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    @media (max-width: 768px){
        input {
        width: 100%;
        }
    }
    input {
        padding-left: 10px;
        box-sizing: border-box;
        width: 300px;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #3d3d3d;
        ::placeholder{
            color: #DBDBDB;
        }
        margin-bottom: 10px;
    }
    button {
        background: #52B6FF;
        border-radius: 4.63636px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
        border: none;
        height: 45px;
        width: 300px;
        @media (max-width: 768px){
            button {
            width: 100%;
            }
        }
    }
`
const Logo = styled.div`
    box-sizing: border-box;
    padding: 50px;
    @media (max-width: 768px){
            img {
            width: 60%;
            }
        }
    img {
        width: 225px;
    }
`