export const handlePhoneKeyPress = (e) => {
    const allowedChars = /^[0-9+]+$/;
    if (!allowedChars.test(e.key) && !e.ctrlKey && e.key !== "Backspace") {
      e.preventDefault();
    }
  };
  
  export const validateForm = (form) => {
    return form.checkValidity();
  };
  