// var operator = 'multiplication'; // Type of calculation
var i = 1;                 // Set counter to 1
var msg = '<h2>Multiplication Table</h2>';              // Add Table Header


    // Get input from user
    let table = prompt('Enter a number from 1 to 10:');
    // Check if the input is a number
    // If the user enters a number outside the range, reprompt with error message
    while (table < 1 || table > 10) {
        table = prompt('Error: Please enter a number from 1 to 10:');
    }

    // If the user enters a non-numeric value, set table to 0
    if (table === null || table === '' || isNaN(table)) {
        table = 0;
    }

// Removed the addition table

// if (operator === 'addition') {
//     // Do addition
//     while (i < 11) {
//         msg += i + ' + ' + table + ' = ' + (i + table) + '<br>';
//         i++;
//     }
// } else {
// Create multiplication table rows
while (i < 11) {
    12
    msg += i + ' x ' + table + ' = ' + (i * table) + '<br>';
    i++;
}
// }

// Write the message into the page
var el = document.getElementById('blackboard');
el.innerHTML = msg;