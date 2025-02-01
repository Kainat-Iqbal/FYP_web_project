function StudentValidation(values) {
    let error = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
  
    error.name = values.name ? "" : "Please enter a name";
    error.fatherName = values.fatherName ? "" : "Please enter a father name";

    if (!values.email) {
      error.email = "Please enter an email";
    } else if (!emailPattern.test(values.email)) {
      error.email = "Email format is invalid (example: abc@example.com)";
    } else {
      error.email = "";
    }

    if (!values.CNIC) {
        error.CNIC = "Please enter CNIC";
      } else if (!cnicPattern.test(values.CNIC)) {
        error.CNIC = "CNIC format is invalid (e.g., 42303-5984362-6)";
      } else {
        error.CNIC = "";
      }

    error.phoneNo = values.phoneNo ? "" : "Please enter phone number";
    error.address = values.address ? "" : "Please enter address";
    error.juwId = values.juwId ? "" : "Please enter JUW ID";
    
    if (!values.password) {
        error.password = "Please enter a password";
      } else if (values.password.length < 6) {
        error.password = "Password must be at least 6 characters";
      } else {
        error.password = "";
      }

    error.enrollment = values.enrollment ? "" : "Please enter enrollment number";
    error.seatNo = values.seatNo ? "" : "Please enter seat number";
    
    error.dateOfAdmission = values.dateOfAdmission ? "" : "Please enter date of admission";
    error.date_of_completion = values.date_of_completion ? "" : "Please enter date of completion";

    error.matricMarks = values.matricMarks ? "" : "Please enter matric marks" ;
    error.matricPercentage= values.matricPercentage ? "" : "Please enter matric percentage" ;
    error. interMarks = values. interMarks ? "" : "Please enter inter marks";
    error.interPercentage = values.interPercentage ? "" : "Please enter inter percentage";
    
    return error;
  }

export default StudentValidation;