/* Script: Board Squares */

document.addEventListener('DOMContentLoaded', function () {


    // Constants, Definitions and Variables

    // Defines a variable to keep track of the current player (X or O)
    
    let currentPlayer = 'X';

    // Defines a variable to store the X and O entries

    let gameBoard = [];
    
    // Gets all the square div elements inside the "board" element
    
    const squareDivs = document.querySelectorAll('#board div');

    // Gets the divs from the gameboard

    const statusUpdate = document.getElementById('status');

    // Gets the "New Game" button
  
    const resetButton = document.getElementsByClassName('btn')[0];

    // Stores all the winning combinations

    const winningCombinations = [

        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows

        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns

        [0, 4, 8], [2, 4, 6]             // Diagonals

    ];



    // Functions 
   
    // Defines a function to add the ".square" class to each square div

    function addSquareClass(square) 
    {
    
        square.classList.add('square');

    }

    // Define a function to check if a player has won

    function checkForWin() 
    {
    
        for (const combination of winningCombinations) {
    
            const [a, b, c] = combination;
    
            if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) 
            {
            
                return true; // Player has won
            
            }
        
        }
        
        return false; // Player has not won
    
    }
    

    // Declarations

    // Add .square to each square div

    squareDivs.forEach(addSquareClass);

    // Adds and removes hovers, and marks

    squareDivs.forEach((square, index) => 
    {
        
        // Add hover to squares
    
        square.addEventListener('mouseover', function(e)
        {

            e.target.classList.add('hover');

        });

        // Removes hover from squares

        square.addEventListener('mouseout', function(e)
        {

            e.target.classList.remove('hover');

        });

        // Adds X or O to the squares

        square.addEventListener('click', function(e)
        {

            if (!e.target.classList.contains('X') && !e.target.classList.contains('O')) 
            {
                
                e.target.textContent = currentPlayer;
          
                e.target.classList.add(currentPlayer);

                gameBoard[index] = currentPlayer;
                
                // Check if the current player has won
                
                if (checkForWin(currentPlayer)) 
                {

                    // Changes the status message
                    
                    statusUpdate.textContent = `Congratulations! ${currentPlayer} is the Winner!`;

                    // Appends 'you-won' class to status message

                    statusUpdate.classList.add('you-won');
                
                }
                else 
                {

                    // Alternate between 'X' and 'O'
                
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
                
                }                

            }

        });


    });


    // Adds a click event listener to the "New Game" button to reset the board
    
    resetButton.addEventListener('click', function()
    {

        // Reset the board

        gameBoard = [];
        
        // Reset the currentPlayer

        currentPlayer = 'X';

        // Clear the text content of each square

        squareDivs.forEach((square) => {

            square.textContent = '';
        
        });

        // Remove all classes from the squares
        
        squareDivs.forEach((square) => {
        
            square.className = '';        
        
        });


        // Re-add the .square class to each square

        squareDivs.forEach(addSquareClass);

        // Remove 'you-won' class

        statusUpdate.classList.remove('you-won');

        // Reset the status

        statusUpdate.textContent = `Move your mouse over a square and click to play an X or an O.`;


    });



});
  
