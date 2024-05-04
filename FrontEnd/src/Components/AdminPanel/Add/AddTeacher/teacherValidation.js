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

    if (values.department === "") {
        error.department = "department should not be empty";
      } else {
        error.department = "";
      }

      if (values.designation === "") {
        error.designation = "designation should not be empty";
      } else {
        error.designation = "";
      }

      if (values.adminEmail === "") {
        error.adminEmail = "Email should not be empty";
      } else if (!email_pattern.test(values.email)) {
        error.adminEmail = "Email did not match the pattern";
      } else {
        error.adminEmail = "";
      }
    return error;
  }
  export default TeacherValidation;
  