var globals = {
    moves: 0,
    timer: Date.now(),
    tiles: [],
    gameOver: false,
};

const localStorage = window.localStorage; // Access local storage
const sessionStorage = window.sessionStorage; // Access session storage

// Get global session from local storage
function getStateFromLocalStorage() {
    const state = localStorage.getItem("gameState");
    return state ? JSON.parse(state) : null;
}

// Get game state from session storage
function getStateFromSessionStorage() {
    const state = sessionStorage.getItem("gameState");
    return state ? JSON.parse(state) : null;
}

// Save game state to local storage
function saveStateToLocalStorage(state) {
    localStorage.setItem("gameState", JSON.stringify(state));
}

// Save game state to session storage
function saveStateToSessionStorage(state) {
    sessionStorage.setItem("gameState", JSON.stringify(state));
}

function displayTotalMoves() {
    const totalMoves = localStorage.getItem("totalMoves");
    if (totalMoves === null) {
        labelTotalMoves.innerText = 0; // Initialize total moves if not found
    } else {
        labelTotalMoves.innerText = totalMoves; // Display total moves
    }
}


// Incriment the total moves
function incrementTotalMoves() {
    // Get the total moves from local storage
    let totalMoves = localStorage.getItem("totalMoves");
    if (totalMoves === null) {
        totalMoves = 0; // Initialize total moves if not found
    }
    ++totalMoves; // Increment total moves
    localStorage.setItem("totalMoves", totalMoves); // Save updated total moves to local storage
    displayTotalMoves(); // Display updated total moves
}

function savePageState() {
    const state = {
        moves: globals.moves,
        timer: globals.timer,
        tiles: globals.tiles,
        gameOver: globals.gameOver,
    };
    console.log("state=", JSON.stringify(state, null, 2)); // Log the state
    // Save game state to session storage
    saveStateToSessionStorage(state);
}


// Restore game state from session storage
function restoreGameState() {
    const state = getStateFromSessionStorage();
    if (state) {
        console.log("state=", JSON.stringify(state, null, 2)); // Log the state
        globals.moves = state.moves; // Restore moves
        globals.timer = state.timer; // Restore timer
        globals.tiles = state.tiles; // Restore tiles
        globals.gameOver = state.gameOver; // Restore game over state
        renderGameBoard(); // Render the game board
        hideInstructions(); // Hide instructions
    } else {
        console.log("No state found in session storage."); // Log if no state found
    }
}

function showInstructions() {
    intro.className = "instructions"; // Show instructions
}

function hideInstructions() {
    intro.className = "no-instructions"; // Hide instructions
}

function getTileSize() {
    let size = 0;
    switch (difficulty.value) {
        case "easy":
            size = 4;
            break;
        case "medium":
            size = 5;
            break;
        case "hard":
            size = 6;
            break;
        default:
            size = 0; // Default to 0 if no valid difficulty is selected
    }
    return size;
}

function getTotalTiles() {
    const size = getTileSize(); // Get the tile size based on the selected difficulty
    return size * size; // Calculate total tiles
}

function getRevealCount() {
    let count = 0;
    for (let i = 0; i < globals.tiles.length; i++) {
        if (globals.tiles[i].revealed) {
            count++; // Count revealed tiles
        }
    }
    return count;
}

function getMatchedCount() {
    let count = 0;
    for (let i = 0; i < globals.tiles.length; i++) {
        if (globals.tiles[i].matched) {
            count++; // Count matched tiles
        }
    }
    return count;
}

function getGameBoardStyle() {
    switch (difficulty.value) {
        case "easy":
            return "game-tiles-4 div-gap";
        case "medium":
            return "game-tiles-5 div-gap";
        case "hard":
            return "game-tiles-6 div-gap";
        default:
            return ""; // Reset class if no valid difficulty is selected
    }
}

function renderGameBoard() {
    const size = getTileSize(); // Get the tile size based on the selected difficulty
    gameBoard.className = getGameBoardStyle(); // Set the class for the game board

    let content = ""; // Clear the game board
    for (let i = 0; i < size * size; i++) {
        if (globals.tiles[i].matched) {
            content += `<div class="game-tile game-tile-matched" onclick="onClickTile(${i})">${globals.tiles[i].value}</div>`; // Show matched tile
        } else if (globals.tiles[i].revealed) {
            content += `<div class="game-tile game-tile-revealed" onclick="onClickTile(${i})">${globals.tiles[i].value}</div>`; // Show tile if revealed
        } else {
            content += `<div class="game-tile game-tile-hidden" onclick="onClickTile(${i})"></div>`; // Create empty tiles
        }
    }
    gameBoard.innerHTML = content;
}

function newGame() {
    const size = getTileSize(); // Get the tile size based on the selected difficulty
    globals.timer = Date.now(); // Reset timer
    globals.moves = 0; // Reset moves
    globals.tiles = []; // Reset the tiles array
    gameOver.className = "no-win"; // Set game over message to hidden
    hideInstructions(); // Hide instructions
    globals.gameOver = false; // Reset game over flag

    // Fill the board with matching pairs of tiles
    const totalTiles = size * size;
    const totalPairs = totalTiles / 2; // Calculate the number of pairs
    const pairs = [];

    // Create pairs of tiles
    for (let i = 0; i < totalPairs; i++) {
        pairs.push(i);
        pairs.push(i);
    }

    // Shuffle the pairs array
    for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]]; // Swap elements
    }

    for (let i = 0; i < size * size; i++) {
        globals.tiles.push({
            id: i,
            revealed: false,
            matched: false,
            value: pairs[i]
        }); // Initialize tiles
    }

    renderGameBoard(); // Render the game board

    savePageState(); // Save game state to session storage

}

function unrevealAllTiles() {
    for (let i = 0; i < globals.tiles.length; i++) {
        globals.tiles[i].revealed = false; // Un-reveal all tiles
    }
}

function checkMatch() {
    let revealedTiles = globals.tiles.filter(tile => tile.revealed); // Get revealed tiles
    if (revealedTiles.length === 2) {
        if (revealedTiles[0].value === revealedTiles[1].value) {
            revealedTiles[0].matched = true; // Mark as matched
            revealedTiles[1].matched = true; // Mark as matched
            //console.log("Match found!"); // Log match
            renderGameBoard(); // Update the game board
        }
    }
}

function displayMoveLabel() {
    moves.innerText = globals.moves; // Update moves display
}

function onClickTile(i) {
    //console.log("Tile clicked: ", i);

    if (globals.tiles[i].matched) {
        // Leave matched tiles alone
    } else {
        // Only reveal two tiles at a time
        let revealedCount = getRevealCount();
        //console.log("Revealed count: ", revealedCount);

        if (revealedCount >= 2) {
            unrevealAllTiles(); // Un-reveal all tiles if more than two are revealed
        }
        globals.tiles[i].revealed = !globals.tiles[i].revealed; // Toggle tile revealed state
        revealedCount = getRevealCount(); // Update revealed count

        if (revealedCount > 1) {
            globals.moves++; // Increment moves
            incrementTotalMoves(); // Increment total moves
        }

        // Check if revealed tiles match
        checkMatch(); // Check for matches
        
        savePageState(); // Save game state to session storage
    }



    // Handle tile click logic here
    renderGameBoard(); // Call renderGameBoard to update the game board based on the selected difficulty

    if (globals.timeout) {
        clearTimeout(globals.timeout); // Clear any existing timeout
    }
    globals.timeout = setTimeout(() => {
        const revealedCount = getRevealCount();
        if (revealedCount > 1) {
            unrevealAllTiles(); // Un-reveal all tiles if more than two are revealed
            renderGameBoard(); // Update the game board
        }
    }, 1000); // Delay for 1 second before un-revealing tiles

    if (getTotalTiles() === getMatchedCount()) {
        //console.log("You win!"); // Log win message
        lblTime.innerText = timer.innerText; // Update time display
        lblMoves.innerText = globals.moves; // Update moves display
        gameOver.className = "win"; // Show game over message
        globals.gameOver = true; // Set game over flag
    }

}

// newGame(); // Initialize the game on page load
setInterval(() => {
    if (globals.gameOver) return; // Check if game is over
    if (globals.tiles.length === 0) return; // Check if tiles are initialized
    const elapsedTime = Math.floor((Date.now() - globals.timer) / 1000); // Calculate elapsed time in seconds
    const minutes = Math.floor(elapsedTime / 60); // Calculate minutes
    const seconds = elapsedTime % 60; // Calculate seconds
    timer.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Update timer display
    displayMoveLabel(); // Update moves display
}, 1000); // Update every second

displayTotalMoves(); // Display total moves on page load

restoreGameState(); // Restore game state from local storage
