export const validateFullName = (nameErrors) =>
    nameErrors.every((error) => !error.status);

export const validateEmail = (emailErrors) =>
    emailErrors.every((error) => !error.status);

export const validatePassword = (passErrors) =>
    passErrors.every((error) => !error.status);

export const validateForm = (
    passErrors,
    fullNameAndEmailErrors,
    state,
    setState
) => {
    const { nameErrors, emailErrors } = fullNameAndEmailErrors;
    const isFullnameValid = validateFullName(nameErrors);
    const isEmailValid = validateEmail(emailErrors);
    const isPasswordValid = validatePassword(passErrors);
    console.log(isFullnameValid, isEmailValid, isPasswordValid);
    setState({
        ...state,
        highlight: {
            fullname: !isFullnameValid,
            email: !isEmailValid,
            password: !isPasswordValid,
        },
    });
};