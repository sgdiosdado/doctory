import { useState, useEffect } from 'react'

export const usePasswordValidation = ({
	password = '',
	requiredLength = 8,
}) => {
	// const [hasValidLength, setValidLength] = useState(null)
	// const [hasNumber, setHasNumber] = useState(null)
	// const [hasUpperCase, setHasUpperCase] = useState(null)
	// const [hasLowerCase, setHasLowerCase] = useState(null)
	// const [hasSpecialChar, setHasSpecialChar] = useState(null)
  // const [validPassword, setValidPassword] = useState(null)
	const [vPassword, setVPassword] = useState({
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
		setVPassword(validation);
	}, [password, requiredLength])
	

	return vPassword;

// 	useEffect(() => {
// 		setValidLength(password.length >= requiredLength)
// 		setHasUpperCase(password.toLowerCase() !== password)
// 		setHasLowerCase(password.toUpperCase() !== password)
// 		setHasNumber(/\d/.test(password))
// 		setHasSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password))
//     setValidPassword(hasValidLength && hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar)
// 	},  [password, requiredLength, hasValidLength, hasNumber, hasUpperCase, hasLowerCase, hasSpecialChar])

// 	return [validPassword, hasValidLength, hasNumber, hasUpperCase, hasLowerCase, hasSpecialChar]
}
