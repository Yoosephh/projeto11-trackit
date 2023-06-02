import { useState } from "react"
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

export default function CustomButton({disabled, message, data_test}){
  const [value, setValue] = useState("");
  return(
    <Button 
      data-test={data_test}
      type="submit"
      disabled={disabled}
    > {disabled === true ? <ThreeDots 
      height="80" 
      width="80" 
      radius="9"
      color="#FFFFFF" 
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
      /> :`${message}`}</Button>
  )
}
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #52B6FF;
  border-radius: 4.63636px;
  :disabled {
    background: #52B6FF;
    opacity: 0.7;
    border-radius: 4.63636px;
  }
`