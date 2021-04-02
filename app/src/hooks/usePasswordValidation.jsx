import { useState, useEffect } from 'react'

export const usePasswordValidation = ({
  password = '',
  requiredLength = 8,
}) => {
  const [validPassword, setValidPassword] = useState({
    hasNumber: null,
    hasUpperCase: null,
    hasLowerCase: null,
    hasSpecialChar: null,
    hasValidLength: null,
    isValid: null,
  })

  useEffect(() => {
    const validation = {};
    validation.hasNumber = /\d/.test(password);
    validation.hasUpperCase = password.toLowerCase() !== password;
    validation.hasLowerCase = password.toUpperCase() !== password;
    validation.hasSpecialChar = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password);
    validation.hasValidLength = password.length >= requiredLength;		
    validation.isValid = validation.hasNumber && validation.hasUpperCase && validation.hasLowerCase && validation.hasSpecialChar && validation.hasValidLength;
    setValidPassword(validation);
  }, [password, requiredLength])
  

  return validPassword;
}
