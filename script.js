// START of Definition of Program Objects, Variables and Functions----------------------------------------------------------------------------


// JS Object for the Board game that should be a 2Dimensional Array, where each Row is an Array of rand colors
const boardArrayObject = {
    maxRows: 14,
    maxCols: 14,
    
    //Array of colors chosen for the game
    colors: ['#8F69E8', '#F0CC3E', '#F03E3E', '#CCF0CC', '#85CC3E', '#F0A8F0'],

    //FUNCTION that given an array of colors, returns a random color
    getRandColor() {
        return this.colors[Math.floor(Math.random()*this.colors.length)];
    },

    //FUNCTION that creates and returns a 2Dimensional Array, where each Row is an Array of rand colors
    create_boardArray() {
        const _boardArray = [];

        for (let i = 0 ; i < this.maxRows ; i++) {        
            const row = [];        
            for (let j = 0 ; j < this.maxCols ; j++ ) {
                row.push(this.getRandColor());
            }
            _boardArray.push(row);
        }
        return _boardArray
    },

    // Function that renders Visually a _boardArray table of truth; you MUST create first the boardArray!
    render_boardArray(_boardArray) {
        const table = document.querySelector('table');
        table.innerHTML = '';
        for(let i = 0; i < this.maxRows ; i += 1) {
            const tableRow = document.createElement('tr');
            table.appendChild(tableRow);
            for (let j = 0; j < this.maxCols ; j += 1){
                const tableBox = document.createElement('td');
                tableBox.style.backgroundColor = _boardArray[i][j];
                tableRow.appendChild(tableBox);
            }
        }
    },

    //Function that can drench a board Array starting from x,y coordinates; you MUST create first the boardArray!
    drench_boardArray(_boardArray, x ,y, fromColor, toColor){
        if (_boardArray[x][y] === fromColor) {
            _boardArray[x][y] = toColor;
            if ( x < ( this.maxRows - 1 ) ){
                this.drench_boardArray(_boardArray, x + 1, y, fromColor, toColor);
            }
            if ( y < (this.maxCols - 1)){
                this.drench_boardArray(_boardArray, x, y + 1, fromColor, toColor);
            }
            if ( x > 0 ){
                this.drench_boardArray(_boardArray, x - 1, y, fromColor, toColor);
            }
            if ( y > 0 ){
                this.drench_boardArray(_boardArray, x, y - 1, fromColor, toColor);
            }                                
        }
    },

    // function that tests if the _board array rows are equal to the first row, starting from the row indexed 1.
    is_boardArray_all_drenched(_boardArray){
        let test = true;     
        for(let i = 1; i < this.maxRows; i++){                   
            if ( _boardArray[0].toString() !=  _boardArray[i].toString()) {
                test = false;
                break;
            }
        }        
        return test;        
    },
}

//variable that holds the number of Turns Left
let turnsLeft = 30;

//This variables holds the DIV parent element for all buttons, to which I will delegate an Event Handler
const buttons = document.querySelector('.buttons');

// variable that holds the DIV that should appear as final message if player wins  
const finalMessageWin = document.getElementById('win');

// variable that holds the DIV that should appear as final message if player looses  
const finalMessageLose = document.getElementById('lose');

// END of Definition of Program Objects, Variables and Functions---------------------------------------------------------------------------


// START of Program INSTRUCTIONS ----------------------------------------------------------------------------------------------------------

// Here I CREATE the Table of truth: 2Dimensional Array, where each Row is an Array of randomly generated colors
const boardArray = boardArrayObject.create_boardArray();

// Here I RENDER (visually) the Table of truth: 2Dimensional Array, where each Row is an Array of randomly generated colors
boardArrayObject.render_boardArray(boardArray);

// Here I RENDER the Number of Turns left
const turnsLeftSpan = document.getElementById('turns_left');
turnsLeftSpan.innerHTML = turnsLeft;

//Event Handler, Delagated to the DIV parent of button elements.
/*I had to use a backup attribute 'data-color' because Event.target.style.backgroundColor returns an rgb color, and I needed HEX value. Also this allowed me to style the button as I wanted (it would have been impossible if I had to get the inline background color) */
buttons.addEventListener('click', (e) => {
    if(event.target.tagName == 'BUTTON'){
        let newColor = e.target.getAttribute('data-color');
        let prevColor = boardArray[0][0];
        boardArrayObject.drench_boardArray(boardArray, 0, 0, prevColor, newColor);
        boardArrayObject.render_boardArray(boardArray);
        turnsLeft--;
        turnsLeftSpan.innerHTML = turnsLeft;
        if (boardArrayObject.is_boardArray_all_drenched(boardArray)) {
            finalMessageWin.style.display = 'block';
        } else if ( turnsLeft == 0) {
            finalMessageLose.style.display = 'block';
        } 
    }    
});
