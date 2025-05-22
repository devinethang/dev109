import React from "react";

function LoginForm() {
    return (
        <form id="login-form">
            <h2>Login</h2>
            <input type="text" id="login-username" placeholder="Username" required />
            <input type="password" id="login-password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;