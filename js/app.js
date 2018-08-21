/*
 * Create a list that holds all of your cards
 */
const cardsArray=["fa fa-diamond","fa fa-diamond","fa fa-anchor","fa fa-anchor","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf","fa fa-bomb","fa fa-bomb","fa fa-bicycle","fa fa-bicycle"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//iterates  through the shuffled cardsArray and creates the html for the deck
function createCards(){
    for (var i = 0 ; i< shuffledArray.length; i++ ){
        let el=document.createElement("li");
        el.classList.add("card");
        let childEl=document.createElement("i");
        childEl.className=shuffledArray[i];
        el.appendChild(childEl);
        frag.appendChild(el);
    }
    return frag
}

//calls the function to shuffle the array of cards and saves it to shuffledArray:
const shuffledArray = shuffle(cardsArray);
const frag=document.createDocumentFragment();
const theDeck=document.querySelector(".deck");
//calls the function to create the html for the cards:
createCards();
//adds the html created by the createCards function to the deck:
theDeck.appendChild(frag);

/*
 * set up the event listener for a card.
 *
 * If a card is clicked:
 *
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//handles the actions to take place once the card is clicked:
function cardFlip(evt){
    const cardClicked=evt.target;
      //makes sure the functions only proceed if the actual cards are clicked and nowhere else in the page:
    if (cardClicked.className==="card"){
        //adds the classes to show the card when clicked:
        cardClicked.classList.add("open","show");
        //increments the moves counter:
        movesCount();
        //adds clicked card to the array:
        cardClickedArray.push(cardClicked);
        //calls function to compare cards:
        cardCompare();
        //calls function to determines the amount of stars:
        displayStars();
    }//end of if statement
}//end of cardFlip function


function cardCompare(){
    //makes sure there is more than one card in array to compare, then executes code:
    if (cardClickedArray.length > 1) {
        //compares the two cards clicked to see if their names match:
        if (cardClickedArray[0].firstElementChild.className === cardClickedArray[1].firstElementChild.className) {
             cardsMatch();
        } else {
            //sets a delay so the card doesn't dissapear too quickly after hiding them if they don't match:
            setTimeout(cardsDontMatch,600);
        }//end of second if statement
    //calls function to calculate when game is finished:
    gameFinished();
    }
}//end of first if statement


function movesCount(){
    //sets the actual counter for the moves
    const moveCount=moves.textContent;
    moves.textContent=parseInt(moveCount)+1;
}


function displayStars(){
    //creates new element for the stars:
    const oneStar=document.createElement('li');
    oneStar.innerHTML="<i class=\"fa fa-star\"></i>";
    //makes a copy of the firstStar node and names it secondStar:
    const twoStars= oneStar.outerHTML + oneStar.outerHTML;
    //makes a copy of the secondStar node and names it thirdStar:
    const threeStars=oneStar.outerHTML + oneStar.outerHTML + oneStar.outerHTML;
    //gathers the amount of moves made so far:
    let theMoves=moves.textContent;
    //gathers the amount of matched cards so far:
    let matchedCards=document.querySelectorAll(".match").length;
    //calculates the amount of moves vs the amount of matched cards:
    let calc=parseInt(theMoves)/matchedCards;
    //gathers the amount of existent stars:
    let starCount = document.querySelector(".stars").childElementCount;
    //saves the element with stars class into the stars constant:
    const stars=document.querySelector(".stars");

    if (calc < 2 ){
            switch (starCount) {
                case 0:
                   stars.innerHTML=threeStars;
                break;
                case 1:
                    stars.innerHTML=twoStars;
                break;
                case 2:
                    stars.appendChild(oneStar); //using node
                break;
            }//end of switch statement
    } else if ((calc >= 2) && (calc < 4)){
            switch (starCount) {
                case 0:
                    stars.innerHTML=twoStars;
                break;
                case 1:
                    stars.appendChild(oneStar); //using node
                break;
                case 3:
                    stars.lastElementChild.remove();
                break;
           }//end of switch statement
    } else if ((calc >=4) && (calc < 6)){
            switch (starCount) {
                case 0:
                    stars.appendChild(oneStar); //using node
                break;
                case 2:
                    stars.lastElementChild.remove();
                break;
                case 3:
                    stars.lastElementChild.remove();
                    stars.lastElementChild.remove();
                break;
            }//end of switch statement
    }  else {
          stars.innerHTML="";
    } //end of if statement
} //end of displayStars function


function cardsMatch() {
    cardClickedArray[0].className="card match";
    cardClickedArray[1].className="card match";
    cardClickedArray.length=0;
}


function cardsDontMatch() {
    cardClickedArray[0].classList.remove("open","show");
    cardClickedArray[1].classList.remove("open","show");
    cardClickedArray.length=0;
}

//clears out the deck and score when the reset widget is clicked:
function resetDeck(){
    const allCards=document.querySelectorAll(".card");
    allCards.forEach(
          function(el){
                el.className="card";
          }
    );
    cardClickedArray.length=0;
    document.querySelector(".stars").innerHTML="";
    document.querySelector(".moves").textContent=0;
}

//move count setup:
const moves=document.querySelector(".moves");
const cardClickedArray=[];
//card clicking setup:
theDeck.addEventListener("click",cardFlip);
//restart-reset widget setup:
const restart = document.querySelector(".restart");
restart.addEventListener("click",resetDeck);


//finishing the game and displaying the stats:
function gameFinished(){
    const allCards=document.querySelectorAll(".card");
    let count=0;
    allCards.forEach(
        function(el){
            if (el.classList.contains("match")){ count++;  }
        }
    );
    //sets up the modal where the stats will be displayed once the game is finished:
    if (count===allCards.length){
        const modal = document.querySelector(".modal");
        const closeButton = document.querySelector(".close-button");
        const mcontent = document.querySelector(".modal-content");
        const finalMoves = document.querySelector(".moves").textContent;
        const finalStars = document.querySelector(".stars").childElementCount;
        mcontent.innerHTML="<h1>Congratulations!</h1><p>You finished the game in " + finalMoves + " moves and earned " + finalStars + " stars.</p>";
        modal.classList.add("show-modal");
    }//end of if statement
}//end of gameFinished function
