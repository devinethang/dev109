console.log('main.js loaded');

function validateForm() {
    //1) create a variable to control status of each field. Assume that they are not valid
    let isValid = {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        username: false,
        password: false,
        address: false,
        city: false,
        state: false,
        country: false,
        zipcode: false
    };

    //3) do the validation
    try {
        //2) create variables to read the values from html text inputs
        let firstName = document.getElementById("firstname").value;
        let lastName = document.getElementById("lastname").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let country = document.getElementById("country").value;
        let zipcode = document.getElementById("zipcode").value;

        // FirstName validation
        if (!firstName || firstName.trim() === "" || firstName.length > 20 || !/^[a-zA-Z]+$/.test(firstName)) {
            throw new Error("Name cannot be empty");
        } else {
            isValid.firstName = true;
        }

        // LastName validation
        if (lastName === "null" || lastName === "" || lastName.length > 20 || !/^[a-zA-Z]+$/.test(lastName)) {
            throw new Error("Last name cannot be empty");
        } else {
            isValid.lastName = true;
        }

        // Check if email is valid
        if (!email) {
            throw new Error("Email cannot be empty");
        }
        
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            throw new Error("Invalid email format");
        } else {
            isValid.email = true;
        }

        // Phone validation (required, 15 digits)
        let cleanedPhone = phone.replace(/[^\d]/g, "");
        if (!phone || phone === null|| cleanedPhone.length > 15) {
            throw new Error("Phone is required and has a max of 15 digits.");
        } else {
            isValid.phone = true;
        }

        // Username validation (required, max 12 chars, alphanumeric)
        if (username.length < 3 || username.length > 12) {
            throw new Error("Username must have a min of three characters and be more than 12 characters.");
        } else {
            isValid.username = true;
        }

        // Password validation (required, max 7 chars, 1 upper, 1 lower, 1 number, 1 special char)
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,7}$/;
        if (!password || !passwordPattern.test(password)) {
            throw new Error("Password is required has a max 7 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
        } else {
            isValid.password = true;
        }

        // Address validation (required)
        if (!address || address.trim() === "") {
            throw new Error("Address is required.");
        } else {
            isValid.address = true;
        }

        // City validation (required)
        if (!city || city.trim() === "") {
            throw new Error("City is required.");
        } else {
            isValid.city = true;
        }

        // State validation (required)
        if (!state || state.trim() === "") {
            throw new Error("State is required.");
        } else {
            isValid.state = true;
        }

        // Country validation (required)
        if (!country || country.trim() === "") {
            throw new Error("Country is required.");
        } else {
            isValid.country = true;
        }

        // Zipcode validation (required if country is USA, must be 5 digits)
        if (country.trim().toUpperCase() === "USA") {
            let zipPattern = /^\d{5}$/;
            if (!zipcode || !zipPattern.test(zipcode)) {
            throw new Error("Zipcode is required and must be 5 digits for USA.");
            } else {
            isValid.zipcode = true;
            }
        } else {
            isValid.zipcode = true; // Not required for non-USA countries
        }

        //5) if all fields are valid, return true
        if (isValid.firstName && isValid.lastName && isValid.email && isValid.phone && isValid.username && isValid.password && isValid.address && isValid.city && isValid.state && isValid.country && isValid.zipcode) {
            console.log("Form is valid");
            return true;
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
        else {
            nameError.innerHTML = "";
        }

        if (!isValid.lastName) {
            lastNameError.innerHTML = "The lastname is required, must be alphabetical, and cannot be greater than 20 characters.";
            return false;
        }
        else {
            lastNameError.innerHTML = "";
        }

        if (!isValid.email) {
            emailError.innerHTML = "Email is required and must be valid.";
            return false;
        }
        else {
            emailError.innerHTML = "";
        }

        if (!isValid.phone) {
            phoneError.innerHTML = "Phone is required and must be no greater than 15 digits.";
            return false;
        }
        else {
            phoneError.innerHTML = "";
        }

        if (!isValid.username) {
            usernameError.innerHTML = "Username is required, min of 3 and a max of 12 chars.";
            return false;
        }
        else {
            usernameError.innerHTML = "";
        }

        if (!isValid.password) {
            passwordError.innerHTML = "Password is required and has a max of 7 chars and must at least contain 1 upper, 1 lower, 1 number, and 1 special char.";
            return false;
        }
        else {
            passwordError.innerHTML = "";
        }

        if (!isValid.address) {
            addressError.innerHTML = "Address is required.";
            return false;
        }
        else {
            addressError.innerHTML = "";
        }
        
        if (!isValid.city) {
            cityError.innerHTML = "City is required.";
            return false;
        }
        else {
            cityError.innerHTML = "";
        }

        if (!isValid.state) {
            stateError.innerHTML = "State is required.";
            return false;
        }
        else {
            stateError.innerHTML = "";
        }

        if (!isValid.country) {
            countryError.innerHTML = "Country is required.";
            return false;
        }
        else {
            countryError.innerHTML = "";
        }

        if (!isValid.zipcode) {
            zipcodeError.innerHTML = "Zipcode is required for residents of the US and must be 5 digits.";
            return false;
        }   
        else {
            zipcodeError.innerHTML = "";
        }     

    }

}