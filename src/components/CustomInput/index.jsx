import { useEffect, useState } from "react";

export default function CustomInput( {name, id, required, type, placeholder, disabled, onChangeValue, data_test } ) {
  const [value, setValue] = useState("");

  useEffect(()=>{
    onChangeValue(value)
  }, [value])

  return (
    <input
      autoComplete="true"
      name={name}
      id={id}
      data-test={data_test}
      required={required}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
