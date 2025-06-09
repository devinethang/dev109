// var rHeight =5;
// var colorEven = "orange";
// var colorOdd = "black";
// var symbol ="*";

// Function to create a Rhombus shape with specified height, colors, and symbol
function createRhombus(pHeight, pColorEven, pColorOdd, pSymbol) {
    let upLine = "";
    for (let i = 0; i < pHeight; i++) {
        upLine = upLeft(upLine, i, pHeight, pColorEven, pColorOdd, pSymbol);
        upLine = upRight(upLine, i, pHeight, pColorEven, pColorOdd, pSymbol);
    }
    document.getElementById("upLeftRight").innerHTML = upLine;

    let downLine = "";
    for (let i = pHeight - 1; i >= 0; i--) {
        downLine = downLeft(downLine, i, pHeight, pColorEven, pColorOdd, pSymbol);
        downLine = downRight(downLine, i, pHeight, pColorEven, pColorOdd, pSymbol);
    }
    document.getElementById("downLeftRight").innerHTML = downLine;
}

// Function to create spaces for the left side of the Rhombus
function createSpace(pHeight, i) {
    let rLine = "";

    // Add a space for the left side of the Rhombus
    for (k = 0; k < pHeight - i - 1; k++) {
        rLine += "<span>&nbsp;</span>";
    }

    return rLine;
}

// Functions to create each part of the Rhombus
function upRight(rLine, i, pHeight, pColorEven, pColorOdd, pSymbol) {
    //var rLine = "";
    //Create each line on the Rhombus
    for (j = 0; j <= i; j++) {

        //Is the position even or odd so we change the color
        if (j % 2)
            //even
            rLine += "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
        else
            //odd
            rLine += "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";

    }
    rLine += "</p>";
    // console.log(rLine);

    return rLine;
}

// Function to create the left side of the Rhombus
function upLeft(rLine, i, pHeight, pColorEven, pColorOdd, pSymbol) {
    //var rLine = "";

    rLine += createSpace(pHeight, i);

    //Create each line on the Rhombus
    for (j = 0; j <= i; j++) {

        //Is the position even or odd so we change the color
        if (j % 2)
            //even
            rLine += "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
        else
            //odd
            rLine += "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";

    }
    //rLine += "</p>";
    // console.log(rLine);
    return rLine;
}

// Function to create the left side of the Rhombus
function downLeft(rLine, i, pHeight, pColorEven, pColorOdd, pSymbol) {

    rLine += "<p>";
    
    rLine += createSpace(pHeight, i);
    
    //Create each line on the Rhombus
    for (j = 0; j <= i; j++) {

        //Is the position even or odd so we change the color
        if (j % 2)
            //even
            rLine += "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
        else
            //odd
            rLine += "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";

    }
    //rLine += "</p>";
    // console.log(rLine);
    return rLine;
}

// Function to create the right side of the Rhombus
function downRight(rLine, i, pHeight, pColorEven, pColorOdd, pSymbol) {

    //rLine += "<p>";
    //Create each line on the Rhombus
    for (j = 0; j <= i; j++) {

        //Is the position even or odd so we change the color
        if (j % 2)
            //even
            rLine += "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
        else
            //odd
            rLine += "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";

    }
    rLine += "</p>";
    // console.log(rLine);

    return rLine;
}
