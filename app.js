//selection ID element where we put square
var container = document.getElementById("container");

const createSquare = (numSquares)=>{
    
    // change the size of the container in order to make a beautiful square

    container.style.maxWidth = (20*numSquares)+ (2*numSquares) + 'px';
    container.style.maxHeight = (20*numSquares)+(2*numSquares) + 'px';

    for ( let r = 0 ; r < numSquares ; r++) {
        for(let c = 0 ; c < numSquares ; c++){
            // create a div element
            let square = document.createElement("div");
    
            // add a class to put CSS style
            square.className="square";
    
            // add the square into container
            container.appendChild(square);
    
        } 
    }
}

const getRandomColor =  ()=>{
    // generate random values for red, green, and blue
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    // return the RGB color as string
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

const areAllSquaresBlack = () =>{
    var squares = document.getElementsByClassName("square");

    for (let k = 0; k < squares.length; k++) {
        var currentColor = squares[k].style.backgroundColor.toLowerCase();

        // check if color is really black or not (maybe "black" ou "#000000")
        if (currentColor !== 'black' && currentColor !== '#000000') {
            return false; // if one is not black
        }
    }

    return true; // all are black
}

const darkenSquare = (square)=>{
    var hoverCount = 0;
    var isBlack = false;

    square.addEventListener("mouseover", function () {
        // Si le carré est déjà noir, ne rien faire
        if (isBlack) {
            return;
        }

        hoverCount++;

        if (hoverCount >= 10) {
            hoverCount = 0;
            isBlack = true;
            square.style.backgroundColor = 'black';

            if(areAllSquaresBlack()) {
                alert("ALL squares are black!\nDo an other Game!\nClick on the Top Button");
                

            }

        } else {
            var currColor = square.style.backgroundColor;
            var rgbValues = currColor.match(/\d+/g);
            var red = parseInt(rgbValues[0]);
            var green = parseInt(rgbValues[1]);
            var blue = parseInt(rgbValues[2]);

            red = Math.floor(red * 0.9);
            green = Math.floor(green * 0.9);
            blue = Math.floor(blue * 0.9);

            square.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
        }
    });
}


const game = ()=>{
    //selection square element 
    var squares = document.querySelectorAll(".square");

    //add an event where we hover a square (so need a boucle for each square)
    for ( let k = 0 ; k < squares.length ;  k++ ){
        squares[k].onmouseover =   ()=> {

            console.log("hovered square");

            squares[k].setAttribute('style','background-color:' + getRandomColor() + ';');
            darkenSquare(squares[k]);
        }
    }
}


let numSquares = 16;
createSquare(numSquares);
game();
    

var clickOnButton = document.querySelector('.my_button')

clickOnButton.onclick =  ()=>{
    console.log('button was clicked !');

    var userInput = prompt("Enter a digit between 1 and 100");
    if(userInput === '' || isNaN(userInput) || userInput < 0 || userInput > 100 ){
        alert("Respect the rules if you want to play");
        // return 0;
    } else {
        console.log("you choose number : " + userInput )

        // erase the previous square.
        container.innerHTML = ''; 

        createSquare(userInput);
        game();
    }
} 