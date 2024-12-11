// Global variables
let pieces = [];
let capturedWhitePieces = [];
let capturedBlackPieces = [];
let selectedPiece = null;
const TILE_SIZE = 50;
let isWhiteTurn = true;
let currentMessage = null;
let alertMessage = null; // For alerts like checkmate, check, stalemate
let light = new Circle(TILE_SIZE / 2 - 10);
let whiteRook = "https://codehs.com/uploads/a7c7493641e8372bc88bdf30bb996ed1";
let whiteKnight = "https://codehs.com/uploads/e965cb6a91b9a6ffe7025ab31ffba9b6";
let whiteBishop = "https://codehs.com/uploads/7465be3950b7b45daa4ca8fc55979c09";
let whiteQueen = "https://codehs.com/uploads/7da21df28adfb6f784ae2c375bd9a685";
let whiteKing = "https://codehs.com/uploads/3091e571373d114f59e8753d0ae24940";
let whitePawn = "https://codehs.com/uploads/c7a4b08f203097118cf6556ef7bfad90";
let blackRook = "https://codehs.com/uploads/bb99857dfea8e752d8583a4bcc7f0b93";
let blackKnight = "https://codehs.com/uploads/f58733ff760c40fad7a9ca6b825ce5b9";
let blackBishop = "https://codehs.com/uploads/7bb1c1853eb9e87b30366ae265ae48ed";
let blackQueen = "https://codehs.com/uploads/2ccf37829675a6f0142de85114701f60";
let blackKing = "https://codehs.com/uploads/cd930b02b5e703de0980c5f867c04f00";
let blackPawn = "https://codehs.com/uploads/742bdea9033c1c746331ef677522d293";
let board = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], // Black
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // White
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];
let currentPlayer = 'white';
let lastMove = null; // Tracks the last move made ({ startRow, startCol, endRow, endCol })
const pawnDirections = { white: -1, black: 1 }; // Directions for pawn movement

// Entry point
main();

function main() {
    setSize(1000, 800);
    drawBoard();
    initPieces();
    drawPieces();
    mouseClickMethod(click);
    updateTurnMessage();
}

function drawBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let square = new Rectangle(TILE_SIZE, TILE_SIZE);
            square.setPosition(col * TILE_SIZE, row * TILE_SIZE);
            square.setColor((row + col) % 2 === 0 ? "#554d41" : "#ffe9c5");
            square.layer = 1;
            add(square);
        }
    }
    let background = new Rectangle(4 * TILE_SIZE, 8 * TILE_SIZE);
    background.setPosition(8 * TILE_SIZE, 0);
    background.setColor("#191970");
    add(background);
}

function initPieces() {
    pieces = [
        { type: "rook", color: "black", position: { row: 0, col: 0 }, image: blackRook },
        { type: "knight", color: "black", position: { row: 0, col: 1 }, image: blackKnight },
        { type: "bishop", color: "black", position: { row: 0, col: 2 }, image: blackBishop },
        { type: "queen", color: "black", position: { row: 0, col: 3 }, image: blackQueen },
        { type: "king", color: "black", position: { row: 0, col: 4 }, image: blackKing },
        { type: "bishop", color: "black", position: { row: 0, col: 5 }, image: blackBishop },
        { type: "knight", color: "black", position: { row: 0, col: 6 }, image: blackKnight },
        { type: "rook", color: "black", position: { row: 0, col: 7 }, image: blackRook },
        { type: "pawn", color: "black", position: { row: 1, col: 0 }, image: blackPawn },
        { type: "pawn", color: "black", position: { row: 1, col: 1 }, image: blackPawn },
        { type: "pawn", color: "black", position: { row: 1, col: 2 }, image: blackPawn },
        { type: "pawn", color: "black", position: { row: 1, col: 3 }, image: blackPawn },
        { type: "pawn", color: "black", position: { row: 1, col: 4 }, image: blackPawn },
        { type: "pawn", color: "black", position: { row: 1, col: 5 }, image: blackPawn },
        { type: "pawn", color: "black", position: { row: 1, col: 6 }, image: blackPawn },
        { type: "pawn", color: "black", position: { row: 1, col: 7 }, image: blackPawn },
        { type: "rook", color: "white", position: { row: 7, col: 0 }, image: whiteRook },
        { type: "knight", color: "white", position: { row: 7, col: 1 }, image: whiteKnight },
        { type: "bishop", color: "white", position: { row: 7, col: 2 }, image: whiteBishop },
        { type: "queen", color: "white", position: { row: 7, col: 3 }, image: whiteQueen },
        { type: "king", color: "white", position: { row: 7, col: 4 }, image: whiteKing },
        { type: "bishop", color: "white", position: { row: 7, col: 5 }, image: whiteBishop },
        { type: "knight", color: "white", position: { row: 7, col: 6 }, image: whiteKnight },
        { type: "rook", color: "white", position: { row: 7, col: 7 }, image: whiteRook },
        { type: "pawn", color: "white", position: { row: 6, col: 0 }, image: whitePawn },
        { type: "pawn", color: "white", position: { row: 6, col: 1 }, image: whitePawn },
        { type: "pawn", color: "white", position: { row: 6, col: 2 }, image: whitePawn },
        { type: "pawn", color: "white", position: { row: 6, col: 3 }, image: whitePawn },
        { type: "pawn", color: "white", position: { row: 6, col: 4 }, image: whitePawn },
        { type: "pawn", color: "white", position: { row: 6, col: 5 }, image: whitePawn },
        { type: "pawn", color: "white", position: { row: 6, col: 6 }, image: whitePawn },
        { type: "pawn", color: "white", position: { row: 6, col: 7 }, image: whitePawn }
    ];
}

function drawPieces() {
    for (let piece of pieces) {
        let x = piece.position.col * TILE_SIZE;
        let y = piece.position.row * TILE_SIZE;
        drawPiece(piece, x, y);
    }
}

function drawPiece(piece, x, y) {
    let newPiece = new WebImage(piece.image);
    newPiece.setPosition(x, y);
    newPiece.setSize(TILE_SIZE, TILE_SIZE);
    add(newPiece);
}

// The click function handles selecting and moving pieces
function click(event) {
    let col = Math.floor(event.getX() / TILE_SIZE);
    let row = Math.floor(event.getY() / TILE_SIZE);

    removeHighlight();

    let clickedPiece = getPieceAt(row, col);

    if (clickedPiece && clickedPiece.color === (isWhiteTurn ? "white" : "black")) {
        selectedPiece = clickedPiece;
        highlightTile(row, col);
    } else if (selectedPiece) {
        if (isValidMove(selectedPiece, row, col)) {
            let destinationPiece = getPieceAt(row, col);

            if (destinationPiece) {
                capturePiece(destinationPiece);
            }
            movePiece(selectedPiece, row, col);
            selectedPiece = null;
        } else {
            selectedPiece = null;
        }
    }
}

// Helper functions like `movePiece`, `highlightTile`, `isValidMove`, `updateTurnMessage`, `checkEndgame`, and more.
// Full implementation continues below, integrating previous updates for checkmate, check, and stalemate detection.
function isValidMove(piece, targetRow, targetCol) {
    // Ensure the target square is within the bounds of the board
    if (targetRow < 0 || targetRow >= 8 || targetCol < 0 || targetCol >= 8) {
        return false;
    }

    // Get the piece currently at the target position (if any)
    let destinationPiece = getPieceAt(targetRow, targetCol);
    
    // Check if the target is occupied by a friendly piece
    if (destinationPiece && destinationPiece.color === piece.color) {
        return false;
    }

    // Movement logic for different piece types
    if (piece.type === "pawn") {
        let direction = piece.color === "white" ? -1 : 1; // White moves up (-1), black moves down (+1)
        let startRow = piece.color === "white" ? 6 : 1;

        // Standard move (1 step forward)
        if (targetCol === piece.position.col &&
            targetRow === piece.position.row + direction &&
            !destinationPiece) {
            return true;
        }

        // Initial two-square move (only if on the starting row)
        if (piece.position.row === startRow &&
            targetCol === piece.position.col &&
            targetRow === piece.position.row + 2 * direction &&
            !destinationPiece && 
            getPieceAt(piece.position.row + direction, targetCol) === null) {
            return true;
        }

        // Capture diagonally (1 step diagonally forward)
        if (Math.abs(targetCol - piece.position.col) === 1 &&
            targetRow === piece.position.row + direction &&
            destinationPiece && destinationPiece.color !== piece.color) {
            return true;
        }

        // En passant (special rule for pawns)
        if (canEnPassant(piece, targetRow, targetCol)) {
            return true;
        }
    }

    if (piece.type === "rook") {
        // Rooks move horizontally or vertically
        if (targetRow === piece.position.row || targetCol === piece.position.col) {
            return isPathClear(piece.position.row, piece.position.col, targetRow, targetCol);
        }
    }

    if (piece.type === "knight") {
        // Knights move in an "L" shape (2 squares in one direction, 1 in the other)
        let rowDiff = Math.abs(targetRow - piece.position.row);
        let colDiff = Math.abs(targetCol - piece.position.col);

        if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
            return true;
        }
    }

    if (piece.type === "bishop") {
        // Bishops move diagonally any number of squares
        let rowDiff = Math.abs(targetRow - piece.position.row);
        let colDiff = Math.abs(targetCol - piece.position.col);

        if (rowDiff === colDiff) { // Diagonal movement
            return isPathClear(piece.position.row, piece.position.col, targetRow, targetCol);
        }
    }

    if (piece.type === "queen") {
        // Queens combine rook and bishop movement (horizontal, vertical, diagonal)
        let rowDiff = Math.abs(targetRow - piece.position.row);
        let colDiff = Math.abs(targetCol - piece.position.col);

        if (rowDiff === colDiff || targetRow === piece.position.row || targetCol === piece.position.col) {
            return isPathClear(piece.position.row, piece.position.col, targetRow, targetCol);
        }
    }

    if (piece.type === "king") {
        // Kings move one square in any direction
        let rowDiff = Math.abs(targetRow - piece.position.row);
        let colDiff = Math.abs(targetCol - piece.position.col);

        if (rowDiff <= 1 && colDiff <= 1) {
            return true;
        }
    }

    // If no condition matches, the move is invalid
    return false;

}

function updateAlertMessage(message) {
    if (alertMessage) {
        remove(alertMessage); // Remove the old alert message
    }

    if (message) {
        alertMessage = new Text(message);
        alertMessage.setPosition(8 * TILE_SIZE + 10, 80); // Position below the turn message
        alertMessage.setColor("yellow");
        alertMessage.setFont("16pt Arial");
        add(alertMessage);
    }
}

function updateTurnMessage() {
    let message = isWhiteTurn ? "White's turn" : "Black's turn";
    if (currentMessage) {
        remove(currentMessage); // Remove the old turn message
    }

    currentMessage = new Text(message);
    currentMessage.setPosition(8 * TILE_SIZE + 10, 20);
    currentMessage.setColor("white");
    currentMessage.setFont("16pt Arial");
    add(currentMessage);
}

function clearTurnMessage() {
    if (currentMessage) {
        remove(currentMessage);
    }
}

function highlightTile(row, col) {
    let x = col * TILE_SIZE + TILE_SIZE / 2;
    let y = row * TILE_SIZE + TILE_SIZE / 2;
    light.setPosition(x, y);
    light.setColor("#f8ff00");
    light.layer = 2;
    add(light);
}

function removeHighlight() {
    remove(light);
}

function movePiece(piece, newRow, newCol) {
    // Handle en passant
    if (piece.type === "pawn" && Math.abs(piece.position.col - newCol) === 1 && getPieceAt(newRow, newCol) === null) {
        if (canEnPassant(piece, newRow, newCol)) {
            const enemyPawnRow = piece.color === "white" ? newRow + 1 : newRow - 1;
            removeCapturedPiece(getPieceAt(enemyPawnRow, newCol));
        }
    }

    // Update the board array
    board[piece.position.row][piece.position.col] = null;
    board[newRow][newCol] = piece.type.toLowerCase(); // Use lowercase for type representation

    // Update the piece's position
    piece.position = { row: newRow, col: newCol };

    lastMove = { startRow: piece.position.row, startCol: piece.position.col, endRow: newRow, endCol: newCol };

    // Redraw the board and pieces
    drawBoard();
    drawPieces();
    drawCapturedPieces();

    // Check game state
    checkEndgame();

    // Switch turn
    isWhiteTurn = !isWhiteTurn;

    // Update UI
    clearTurnMessage();
    updateTurnMessage();
}

function checkEndgame() {
    const currentPlayerMoves = getAllLegalMoves(currentPlayer);

    if (currentPlayerMoves.length === 0) {
        if (isInCheck(currentPlayer)) {
            updateAlertMessage(`Checkmate! ${getOpponent(currentPlayer)} wins!`);
        } else {
            updateAlertMessage("Stalemate! The game is a draw.");
        }
    } else if (isInCheck(currentPlayer)) {
        updateAlertMessage(`Check! ${currentPlayer}'s king is in danger.`);
    } else {
        updateAlertMessage(""); // No special state
    }
}

function getOpponent(player) {
    return player === "white" ? "black" : "white";
}

function isInCheck(player) {
    const kingPosition = findKingPosition(player);
    const opponent = getOpponent(player);
    const opponentMoves = getAllLegalMoves(opponent);

    for (let move of opponentMoves) {
        if (move.endRow === kingPosition.row && move.endCol === kingPosition.col) {
            return true; // The king is under attack
        }
    }
    return false;
}

function isCheckmate(player) {
    const allMoves = getAllLegalMoves(player);
    return allMoves.length === 0 && isInCheck(player);
}

function isStalemate(player) {
    const allMoves = getAllLegalMoves(player);
    return allMoves.length === 0 && !isInCheck(player);
}

function findKingPosition(player) {
    for (let piece of pieces) {
        if (piece.type === "king" && piece.color === player) {
            return piece.position;
        }
    }
    return null; // Should not happen in a valid game
}

function getPieceAt(row, col) {
    for (let piece of pieces) {
        if (piece.position.row === row && piece.position.col === col) {
            return piece;
        }
    }
    return null;
}

function getAllLegalMoves(player) {
    let moves = [];

    for (let piece of pieces) {
        if (piece.color === player) {
            const pieceMoves = getLegalMovesForPiece(piece);

            // Filter out moves that would leave the king in check
            for (let move of pieceMoves) {
                const simulatedBoard = simulateMove(piece, move.endRow, move.endCol);
                if (!isInCheck(player, simulatedBoard)) {
                    moves.push(move);
                }
            }
        }
    }

    return moves;
}
function simulateMove(piece, targetRow, targetCol) {
    // Copy the board
    const simulatedBoard = board.map(row => row.slice());

    // Simulate the move
    const startRow = piece.position.row;
    const startCol = piece.position.col;

    simulatedBoard[startRow][startCol] = null; // Remove piece from original position
    simulatedBoard[targetRow][targetCol] = piece.type; // Place piece in new position

    return simulatedBoard;
}

/*
function getLegalMovesForPiece(piece) {
    const moves = [];
    const { row, col } = piece.position;

    // Check moves for each type of piece
    if (piece.type === "pawn") {
        moves.push(...getPawnMoves(row, col, piece.color));
    } else if (piece.type === "rook") {
        moves.push(...getRookMoves(row, col));
    } else if (piece.type === "knight") {
        moves.push(...getKnightMoves(row, col));
    } else if (piece.type === "bishop") {
        moves.push(...getBishopMoves(row, col));
    } else if (piece.type === "queen") {
        moves.push(...getQueenMoves(row, col));
    } else if (piece.type === "king") {
        moves.push(...getKingMoves(row, col));
    }

    return moves;
}
*/
function getLegalMovesForPiece(piece) {
    const { row, col } = piece.position;

    if (piece.type === "pawn") return getPawnMoves(row, col, piece.color);
    if (piece.type === "rook") return getRookMoves(row, col);
    if (piece.type === "knight") return getKnightMoves(row, col);
    if (piece.type === "bishop") return getBishopMoves(row, col);
    if (piece.type === "queen") return getQueenMoves(row, col);
    if (piece.type === "king") return getKingMoves(row, col);

    return [];
}


// Add movement logic for all pieces (pawn, rook, bishop, knight, etc.)

function capturePiece(piece) {
    if (piece.color === "white") {
        capturedBlackPieces.push(piece);
    } else {
        capturedWhitePieces.push(piece);
    }
    removeCapturedPiece(piece);
}

function removeCapturedPiece(piece) {
    pieces = pieces.filter(p => p !== piece);
}

function drawCapturedPieces() {
    const xOffset = 8 * TILE_SIZE + 20;
    let yOffsetWhite = 50;
    let yOffsetBlack = 50;

    // Draw white captured pieces
    for (let piece of capturedWhitePieces) {
        drawCapturedPiece(piece, xOffset, yOffsetWhite);
        yOffsetWhite += TILE_SIZE + 10;
    }

    // Draw black captured pieces
    for (let piece of capturedBlackPieces) {
        drawCapturedPiece(piece, xOffset, yOffsetBlack);
        yOffsetBlack += TILE_SIZE + 10;
    }
}

function drawCapturedPiece(piece, x, y) {
    let capturedPiece = new WebImage(piece.image);
    capturedPiece.setPosition(x, y);
    capturedPiece.setSize(TILE_SIZE, TILE_SIZE);
    add(capturedPiece);
}


function isPathClear(startRow, startCol, endRow, endCol) {
    let rowStep = Math.sign(endRow - startRow); // +1, -1, or 0
    let colStep = Math.sign(endCol - startCol); // +1, -1, or 0

    let currentRow = startRow + rowStep;
    let currentCol = startCol + colStep;

    // Check each square along the path
    while (currentRow !== endRow || currentCol !== endCol) {
        if (getPieceAt(currentRow, currentCol) !== null) {
            return false; // Path is obstructed
        }
        currentRow += rowStep;
        currentCol += colStep;
    }

    return true; // Path is clear
}



//pieces moves:

function getPawnMoves(row, col, player) {
    const moves = [];
    const direction = pawnDirections[player];
    const startRow = player === "white" ? 6 : 1;

    // Forward move
    if (getPieceAt(row + direction, col) === null) {
        moves.push({ startRow: row, startCol: col, endRow: row + direction, endCol: col });
    }

    // Double forward from starting position
    if (row === startRow && getPieceAt(row + direction * 2, col) === null) {
        moves.push({ startRow: row, startCol: col, endRow: row + direction * 2, endCol: col });
    }

    // Capture diagonally
    for (let side of [-1, 1]) {
        const targetCol = col + side;
        if (targetCol >= 0 && targetCol < 8) {
            const targetPiece = getPieceAt(row + direction, targetCol);
            if (targetPiece && targetPiece.color !== player) {
                moves.push({ startRow: row, startCol: col, endRow: row + direction, endCol: targetCol });
            }
        }
    }

    return moves;
}

function getRookMoves(row, col) {
    const moves = [];

    // Check all directions: up, down, left, right
    const directions = [
        { rowStep: -1, colStep: 0 }, // Up
        { rowStep: 1, colStep: 0 },  // Down
        { rowStep: 0, colStep: -1 }, // Left
        { rowStep: 0, colStep: 1 }   // Right
    ];

    for (const { rowStep, colStep } of directions) {
        let currentRow = row + rowStep;
        let currentCol = col + colStep;

        while (currentRow >= 0 && currentRow < 8 && currentCol >= 0 && currentCol < 8) {
            const piece = getPieceAt(currentRow, currentCol);

            // If square is empty, add it as a valid move
            if (!piece) {
                moves.push({ startRow: row, startCol: col, endRow: currentRow, endCol: currentCol });
            } else {
                // If square has an opponent's piece, add it and stop
                if (piece.color !== currentPlayer) {
                    moves.push({ startRow: row, startCol: col, endRow: currentRow, endCol: currentCol });
                }
                break; // Rook cannot move past another piece
            }

            // Continue in the same direction
            currentRow += rowStep;
            currentCol += colStep;
        }
    }

    return moves;
}
function getBishopMoves(row, col) {
    const moves = [];

    // Check all diagonal directions
    const directions = [
        { rowStep: -1, colStep: -1 }, // Up-left
        { rowStep: -1, colStep: 1 },  // Up-right
        { rowStep: 1, colStep: -1 },  // Down-left
        { rowStep: 1, colStep: 1 }    // Down-right
    ];

    for (const { rowStep, colStep } of directions) {
        let currentRow = row + rowStep;
        let currentCol = col + colStep;

        while (currentRow >= 0 && currentRow < 8 && currentCol >= 0 && currentCol < 8) {
            const piece = getPieceAt(currentRow, currentCol);

            if (!piece) {
                moves.push({ startRow: row, startCol: col, endRow: currentRow, endCol: currentCol });
            } else {
                if (piece.color !== currentPlayer) {
                    moves.push({ startRow: row, startCol: col, endRow: currentRow, endCol: currentCol });
                }
                break;
            }

            currentRow += rowStep;
            currentCol += colStep;
        }
    }

    return moves;
}
function getKnightMoves(row, col) {
    const moves = [];

    // All possible "L" shaped moves
    const knightMoves = [
        { rowStep: -2, colStep: -1 }, { rowStep: -2, colStep: 1 },
        { rowStep: -1, colStep: -2 }, { rowStep: -1, colStep: 2 },
        { rowStep: 1, colStep: -2 }, { rowStep: 1, colStep: 2 },
        { rowStep: 2, colStep: -1 }, { rowStep: 2, colStep: 1 }
    ];

    for (const { rowStep, colStep } of knightMoves) {
        const currentRow = row + rowStep;
        const currentCol = col + colStep;

        if (currentRow >= 0 && currentRow < 8 && currentCol >= 0 && currentCol < 8) {
            const piece = getPieceAt(currentRow, currentCol);

            if (!piece || piece.color !== currentPlayer) {
                moves.push({ startRow: row, startCol: col, endRow: currentRow, endCol: currentCol });
            }
        }
    }

    return moves;
}
function getQueenMoves(row, col) {
    // Combine rook and bishop moves
    return [...getRookMoves(row, col), ...getBishopMoves(row, col)];
}
function getKingMoves(row, col) {
    const moves = [];

    // All possible king moves
    const kingMoves = [
        { rowStep: -1, colStep: -1 }, { rowStep: -1, colStep: 0 }, { rowStep: -1, colStep: 1 },
        { rowStep: 0, colStep: -1 },                             { rowStep: 0, colStep: 1 },
        { rowStep: 1, colStep: -1 }, { rowStep: 1, colStep: 0 }, { rowStep: 1, colStep: 1 }
    ];

    for (const { rowStep, colStep } of kingMoves) {
        const currentRow = row + rowStep;
        const currentCol = col + colStep;

        if (currentRow >= 0 && currentRow < 8 && currentCol >= 0 && currentCol < 8) {
            const piece = getPieceAt(currentRow, currentCol);

            if (!piece || piece.color !== currentPlayer) {
                moves.push({ startRow: row, startCol: col, endRow: currentRow, endCol: currentCol });
            }
        }
    }

    return moves;
}
function canEnPassant(piece, targetRow, targetCol) {
    // En passant applies only to pawns
    if (piece.type !== "pawn") {
        return false;
    }

    // Direction of movement for the current pawn
    let direction = piece.color === "white" ? 1 : -1;

    // Check the last move for a pawn moving two squares forward
    if (
        lastMove &&
        lastMove.piece.type === "pawn" &&
        Math.abs(lastMove.startRow - lastMove.endRow) === 2 &&
        lastMove.endRow === piece.position.row && // Ensure the pawns are aligned horizontally
        Math.abs(lastMove.endCol - piece.position.col) === 1 && // Check if the last move is adjacent
        targetRow === piece.position.row + direction && // Target row for en passant
        targetCol === lastMove.endCol // Target column for en passant
    ) {
        return true;
    }

    return false;
}
