function TeacherValidation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (values.name === "") {
        error.name = "name should not be empty";
      } else {
        error.name = "";
      }

    if (values.email === "") {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      error.email = "Email did not match the pattern";
    } else {
      error.email = "";
    }
  
    if (values.password === "") {
      error.password = "Password should not be empty";
    } else {
      error.password = "";
    }

    if (values.date === "") {
      error.date = "Date should not be empty";
    } else {
      error.date = "";
    }

    if (values.cnic === "") {
      error.cnic = "CNIC should not be empty";
    } else {
      error.cnic = "";
    }
    return error;
  }
  export default TeacherValidation;
  