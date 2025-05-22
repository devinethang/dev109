import React from 'react';

function EditToDoForm() {
    return (
        <>
            <form id="edit-todo-form">
                <h2>Edit Todo</h2>
                <input type="text" id="edit-title" required />
                <textarea id="edit-desc" required></textarea>
                <label><input type="checkbox" id="edit-completed" /> Completed</label>
                <button type="submit">Save</button>
                <button type="button" id="edit-cancel">Cancel</button>
            </form>
        </>
    );
}

export default EditToDoForm;