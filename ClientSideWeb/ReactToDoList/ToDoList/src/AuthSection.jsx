import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

function AuthSection() {
    return (
        <>
        <div>
            <RegistrationForm />
            <LoginForm />
        </div>
        </>
    );
}

export default AuthSection;