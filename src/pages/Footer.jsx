import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import styled from "styled-components"
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  function Example(props) {
    return (
      <div data-test="today-link" onClick={()=> navigate("/hoje")} style={{ marginBottom: 100 , position:"fixed" }}>
        <hr style={{ border: "2px solid #ddd",  }} />
        <div style={{display: "flex"  }}>
          <div style={{ width: "30%" }}>{props.children}</div>
          <div style={{ width: "70%"  }}>
            <h3 className="h5">{props.label}</h3>
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    );
  }
    return (
      <FooterContainer data-test="menu" >
        <div data-test="habit-link" onClick={() => navigate('/habitos')}>
          <p>Hábitos</p>
        </div>
        <Example label=""  >
          <CircularProgressbar
            className="CircleBar"
            value={89}
            text={`Hoje`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#52B6FF",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: 'transparent'
            })}
          />
        </Example>

        <div onClick={()=> navigate("/historico")} data-test="history-link">
          <p>Histórico</p>
        </div>
      </FooterContainer>
    )
}

const FooterContainer = styled.div`
display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  background-color: #FFFFFF;
  height: 80px;
  p {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52B6FF;
  }
  .CircularProgressbar {
    font-family: 'Lexend Deca';
    font-style: 'normal';
    font-weight: "400";
    font-size: "18px";
    line-height: "22px";
    text-align: 'center';
  }
  .CircleBar{
    display: flex;
    align-items: center;
    justify-content: center;
  }
`