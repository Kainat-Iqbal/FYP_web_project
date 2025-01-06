function TeacherValidation(values) {
  let error = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;

  error.name = values.name ? "" : "Please enter a name";

  if (!values.email) {
    error.email = "Please enter an email";
  } else if (!emailPattern.test(values.email)) {
    error.email = "Email format is invalid (example: abc@example.com)";
  } else {
    error.email = "";
  }

  if (!values.password) {
    error.password = "Please enter a password";
  } else if (values.password.length < 6) {
    error.password = "Password must be at least 6 characters";
  } else {
    error.password = "";
  }

  error.joiningDate = values.joiningDate ? "" : "Please enter the date of joining";

  if (!values.cnic) {
    error.cnic = "Please enter CNIC";
  } else if (!cnicPattern.test(values.cnic)) {
    error.cnic = "CNIC format is invalid (e.g., 42303-5984362-6)";
  } else {
    error.cnic = "";
  }

  error.department = values.department ? "" : "Please select a department";
  error.designation = values.designation ? "" : "Please select a designation";

  return error;
}

export default TeacherValidation;






// function TeacherValidation(values) {
//     let error = {};
//     const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
//     const cnic_pattern = /^\d{5}-\d{7}-\d{1}$/; // CNIC regex
    
//     // Name validation
//     if (values.name === "") {
//       error.name = "Please enter a name";
//     } else {
//       error.name = "";
//     }
  
//     // Email validation
//     if (values.email === "") {
//       error.email = "Please enter an email";
//     } else if (!email_pattern.test(values.email)) {
//       error.email = "Email is not in the correct format (example: abc@example.com)";
//     } else {
//       error.email = "";
//     }
  
//     // Password validation
//     if (values.password === "") {
//       error.password = "Please enter a password";
//     } else if (values.password.length < 6) {
//       error.password = "Password must be at least 6 characters long";
//     } else {
//       error.password = "";
//     }
  
//     // Date of joining validation
//     if (values.joiningDate === "") {
//       error.joiningDate = "Please enter the date of joining";
//     } else {
//       error.joiningDate = "";
//     }
  
//     // CNIC validation
//     if (values.cnic === "") {
//       error.cnic = "Please enter CNIC";
//     } else if (!cnic_pattern.test(values.cnic)) {
//       error.cnic = "CNIC should be in the format 42303-5984362-6";
//     } else {
//       error.cnic = "";
//     }
  
//     // Department validation (optional, assuming it should not be empty)
//     if (values.department === "") {
//       error.department = "Please select a department";
//     } else {
//       error.department = "";
//     }
  
//     // Designation validation (optional, assuming it should not be empty)
//     if (values.designation === "") {
//       error.designation = "Please select a designation";
//     } else {
//       error.designation = "";
//     }
  
//     // Return the error object
//     return error;
//   }
  
//   export default TeacherValidation;
  
  

















  // function TeacherValidation(values) {
  //   let error = {};
  //   const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  //   if (values.name === "") {
  //       error.name = "Please enter a name";
  //     } else {
  //       error.name = "";
  //     }

  //   if (values.email === "") {
  //     error.email = "Please enter an email";
  //   } else if (!email_pattern.test(values.email)) {
  //     error.email = "Email did not match the pattern";
  //   } else {
  //     error.email = "";
  //   }
  
  //   if (values.password === "") {
  //     error.password = "Please enter password";
  //   } else {
  //     error.password = "";
  //   }

  //   if (values.date === "") {
  //     error.date = "Please enter date";
  //   } else {
  //     error.date = "";
  //   }

  //   if (values.cnic === "") {
  //     error.cnic = "Please enter CNIC";
  //   } else {
  //     error.cnic = "";
  //   }
  //   return error;
  // }
  // export default TeacherValidation;