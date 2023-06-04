import styled from "styled-components"



export default function History() {
    return(
      <HistoryDiv>
        <p className="historico">Histórico</p>
        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
      </HistoryDiv>
    )
}

const HistoryDiv = styled.div`
  margin-top: 80px;
  height: 100vh;
  background: #e5e5e5;
  padding: 20px 15px 15px;
  .historico{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
  }
  p {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
  }
`