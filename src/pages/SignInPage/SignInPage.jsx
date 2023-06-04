import axios from "axios"
import styled from "styled-components"
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import {logo} from "../../../public/images/imgs";

export default function Register() {
    const [login, setLogin] = useState({
        email: "",
        password:"",
        image: "",
        name: ""
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    function register(e){
        e.preventDefault();
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", login)
        .then(()=> navigate("/"))
        .catch(error => alert(error.response.data.message))
        .finally(()=> setLoading(false))
    }

    return (
        <AppContainer>
            <Logo>
                {logo()}
            </Logo>
            
            <FormDiv>
                <form onSubmit={register}>
                    <div>
                        <CustomInput data_test="email-input" required type="email" placeholder="Email" disabled={loading} onChangeValue={(email) => setLogin(prevValue =>( {
                                ...prevValue,
                                email
                            }))}/>
                    </div>
                    <div>
                        <CustomInput data_test="password-input" required type="password" placeholder="Senha" disabled={loading} onChangeValue={(password) => setLogin(prevValue =>( {
                                ...prevValue,
                                password
                            }))}/>
                    </div>
                    <div>
                    <div>
                        <CustomInput data_test="user-name-input" required type="text" placeholder="Nome" disabled={loading} onChangeValue={(name) => setLogin(prevValue =>( {
                                ...prevValue,
                                name
                            }))}/>
                    </div>
                    <div>
                        <CustomInput data_test="user-image-input" required type="URL" placeholder="Foto" disabled={loading} onChangeValue={(image) => setLogin(prevValue =>( {
                                ...prevValue,
                                image
                            }))}/>
                    </div>
                        <CustomButton data_test="signup-btn" disabled={loading} message="Cadastrar" />
                    </div>
                </form>
                
            </FormDiv>
            <h1 data-test="login-link" onClick={() => navigate("/")}>
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