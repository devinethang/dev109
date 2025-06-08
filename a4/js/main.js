console.log('main.js loaded');

function validateForm() {
    //1) create a variable to control status of each field. Assume that they are not valid
    let isValid = {
        firstName: false,
        lastName: false,
        email: false,
        message: false
    };

debugger
    //3) do the validation
    try {
        //2) create variables to read the values from html text inputs
        let firstName = document.getElementById("firstname").value;
        let lastName = document.getElementById("lastname").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        // FirstName validation
        if (!firstName || firstName.trim() === "" || firstname.length > 20) {
            throw new Error("Name cannot be empty");
        } else {
            isValid.firstName = true;
        }

        // LastName validation
        if (lastName === "null" || lastName === "" || lastName.length > 20) {
            throw new Error("Last name cannot be empty");
        } else {
            isValid.lastName = true;
        }

        // Check if email is valid
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            throw new Error("Email cannot be empty");
        }
        if (!emailPattern.test(email)) {
            throw new Error("Invalid email format");
        } else {
            isValid.email = true;
        }

        // Check if message is not empty
        if (!message || message.trim() === "") {
            throw new Error("Message cannot be empty");
        } else {
            isValid.message = true;
        }
    }

    //4) send error messages 

    catch (error) {
        // Display error messages in the console
        console.error(error.message);
        
        if (!isValid.firstName) {
            nameError.innerHTML = "The firstname is required, must be alphabetical, and cannot be greater than 20 characters.";
            return false;
        }

        if (!isValid.lastName) {
            lastNameError.innerHTML = "The lastname is required, must be alphabetical, and cannot be greater than 20 characters.";
            return false;
        }

        if (!isValid.email) {
            emailError.innerHTML = "Email is required and must be valid.";
            return false;
        }

        if (!isValid.message) {
            messageError.innerHTML = "Message is required.";
            return false;
        }

        

    }

}