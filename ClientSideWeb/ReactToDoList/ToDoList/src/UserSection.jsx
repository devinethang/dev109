import React from 'react';

function UserSection() {
    return (
        <>
            <div id="user-section" style={{ display: 'none' }}>
                <span id="welcome-user"></span>
                <button id="logout-btn">Logout</button>
                <form id="todo-form">
                    <input type="text" id="todo-input" placeholder="Add a new task" required />
                    <textarea id="todo-desc" placeholder="Description"></textarea>
                    <button type="submit">Add</button>
                </form>
                <ul id="todo-list"></ul>
            </div>
        </>
    );
}

export default UserSection;