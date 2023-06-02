import { useEffect, useState } from "react";

export default function CustomInput( { required, type, placeholder, disabled, onChangeValue } ) {
  const [value, setValue] = useState("");

  useEffect(()=>{
    onChangeValue(value)
  }, [value])

  return (
    <input
      required={required}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
