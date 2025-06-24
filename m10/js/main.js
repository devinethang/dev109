var clearPage = document.getElementById("clearButton");
let drawing = false;

// Toggle the drawing mode when the button is clicked
function toggleDrawing() {
    if (drawing === false) {
        drawing = true;
        console.log("Drawing mode enabled");
    }
    else if (drawing === true) {
        drawing = false;
    }
}

// Add event listener to the clear button to clear the canvas
clearPage.addEventListener("click", function (event) {
    var element = document.getElementsByTagName("div");

    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }

    // Stops proagation and sends console message
    console.log("Canvas cleared");
    event.stopPropagation();
});

// Add event listener to the document to add dot elements on click when drawing mode is enabled
addEventListener("click", function (event) {
    // If drawing mode is enabled, create a dot at the click position
    if (drawing === true) {

        var dot = document.createElement("div");
        dot.className = "dot";
        dot.style.left = (event.pageX - 4) + "px";
        dot.style.top = (event.pageY - 4) + "px";
        document.body.appendChild(dot);
    }
    // If drawing mode is not enabled, log a message
    else {
        console.log("Drawing mode is not enabled");
    }
});
