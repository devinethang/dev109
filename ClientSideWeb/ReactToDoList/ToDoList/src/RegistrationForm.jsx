import React from "react";

function RegisterForm() {
    return (
        <form id="register-form">
            <h2>Register</h2>
            <input type="text" id="register-username" placeholder="Username" required />
            <input type="password" id="register-password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;