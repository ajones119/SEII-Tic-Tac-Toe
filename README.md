# SEII-Tic-Tac-Toe
# Aramis Jones & Tommie Walker

# This Angular Web App allows a user to play either 3x3 or 4x4 tic tac toe in a local multiplayer mode (on the same machine), against an AI (implemented with a MinMax Algorithm) or watch 2 AI players play against each other.

# To start the Web App, navigate to the Tic-Tac-Toe-Game/Tic-Tac-Toe-Game/ClientApp Directory and use "ng serve". Make sure the Angular CLI 
# is installed on your machin.



#  Most of the buisness logic is contained within game-board.component.ts
#  A GameBoard Component however, will contain an array of Square Components that can alternate between "X" or "O" depending on which
# players turn it is.

# Game-board.component.ts Functions
#  NgOnInit()
#       This will take in certain bits of data about the size of the gameboard and type of game being played. 
#       It will initialize the variables to a default value, and make a gameboard of null Squares.

# newGame()
        This will reset the gameboard to having null Squares.

# makeMove()
#       This will read the GameType being played and direct the player to using the correct function to make a move.

# delay()
#       This is a delay function for AIvsAI mode, so that a user can track what moves the AI are making.

# startAIvsAI()
#       This will run the AIvsAI mode, allowing 2 AI's to play against one another

# makeLocalMove()
#       This will allow a human player to make a move on the gameboard if the game is not over and it is their turn

# makeRandomAIMove()
#       This will have an AI player make a move into a random open square. It is used at the start of AIvsAImode and during the 
#       MinMax algorithm when the decision tree gets too large. (primarily used at the beginning of 4x4 modes since it is computationally 
#       infeasable to track such a large number of game states)

# onMoveWithAI()
#       This allows a player to first move, then start an AI move. It is used during PlayerVsAI modes.

# onMoveAI()
#       This is the function for an AI to make a move on their turn. It utilizes the MinMax algorithm.

# minMax()
#       This is a recursive algorithm that tracks all possible game-states from this board to the end of the game. It then chooses the best 
#       move off of the quickest win condition. It maintains a depth tracker and uses the makeRandomAIMove() if the tree of Game States 
#       becomes too large so that the App can maintain good performance.

# checkWin()
#       This is used to check if their is a winner with the current board state. It uses other functions to check the winner based on the 
#       board size.

#  checkWin3x3
#       This checks for a winner on a 3x3 game board.

# checkWin4x4
#       This checks for a winner on a 4x4 game board.

# writeWinner()
#       This writes a winner to the winner variable and changes the game to a "Game Over" game state.
