import React, { useState } from "react";
import "./InputBlock.scss";


/**
 * 
 * @param {Object} props 
 * @param {string} props.type 
 * @param {string} props.values
 * @param {string} props.placeholder
 * @param {Function} props.handleChange
 * @param {Function} props.handleBlur
 * @param {string} props.paramBlur
 * @param {string} props.paramChange
 * 
 * @description Este componente renderiza un form-group completo con 
 * 
 *  
 */


const InputBlock = (props) => {
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const { label, type, values, placeholder, handleChange, handleBlur, paramBlur, paramChange } = props;
  const inputType = type !== "password" ? type : type === "password" && !isPassVisible ? "password" : "text";

  return (
    <label className={type === 'password' ? 'password-input' : ''}>
      <span>{label}</span>
      <input 
        type={inputType} 
        value={values}
        placeholder={placeholder}
        onChange={handleChange(paramChange)}
        onBlur={handleBlur(paramBlur)}
      />
      {type !== 'password' ? false : <span onClick = {() => setIsPassVisible(!isPassVisible)} className={isPassVisible ? 'show-password' : 'hide-password'}>
      </span>
      }
    </label>
  );
};
export default InputBlock;