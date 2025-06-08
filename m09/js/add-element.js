// Description: This script adds a new element to an existing list in the HTML document.

function addElement() {
    // Create a new element and store it in a variable.
    var newEl = document.createElement('li');

    // Create a text node and store it in a variable.
    var newText = document.createTextNode(document.getElementById('new-item').value);

    // Send error if the input is empty.
    let error = null;
    try {
        // Check if the input field is empty.
        if (newText.textContent.trim() === '') {
            error = "The entry was empty";
            throw new Error('Input cannot be empty');
        }
        // Attach the new text node to the new element.
        newEl.appendChild(newText);

        // Find the position where the new element should be added.
        var position = document.getElementsByTagName('ul')[0];

        // Insert the new element into its position.
        position.appendChild(newEl);
    }

    // Catch any errors that occur during the process.
    catch (e) {
        console.log(e);
    }
    // Finally, log the error if it exists.
    finally {
        if (error) {
            console.log(error);
        }
    }


}


