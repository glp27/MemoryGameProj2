/*
 * Create a list that holds all of your cards
 */

const theDeck=document.querySelector(".deck");
//initial array of cards without their double:
const initCardsArray=["fa fa-diamond","fa fa-anchor","fa fa-paper-plane-o","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bomb","fa fa-bicycle"];
//doubles the array:
const cardsArray= initCardsArray.concat(initCardsArray);
//calls the createCards function:
createCards();


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


function createCards(){
  //calls the function to shuffle the array of cards and saves it to shuffledArray:
  const shuffledArray = shuffle(cardsArray);
  const frag=document.createDocumentFragment();
    //iterates  through the shuffled cardsArray and creates the html for the deck:
    for (var i = 0 ; i< shuffledArray.length; i++ ){
        let el=document.createElement("li");
        el.classList.add("card");
        let childEl=document.createElement("i");
        childEl.className=shuffledArray[i];
        el.appendChild(childEl);
        frag.appendChild(el);
    }
    //adds the html created to the deck:
    theDeck.appendChild(frag);
}


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

let timerStarted=false;

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
        //calls function to start timer:
        if (!timerStarted){
          timingGame();
          timerStarted=true;
          }
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


//timer setup:
let time=0;
const timer=document.querySelector(".timer");
let myTimer;
let timeString;

function timingGame(){
    myTimer=setInterval(startTimer,1000);
}

function startTimer(){
        time++;
        let mins=Math.floor(time/60);
        let secs=time-(mins*60);
        if (secs<10){
          timeString=mins+":0"+secs;
        } else {
          timeString=mins+":"+secs;
        }
        timer.innerHTML=timeString;
}

function resetTimer(){
  clearInterval(myTimer);
  time=0;
  timer.innerHTML="0:00";
  timerStarted=false;
}

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
    theDeck.innerHTML="";
    cardClickedArray.length=0;
    document.querySelector(".stars").innerHTML="";
    document.querySelector(".moves").textContent=0;
    resetTimer();
    createCards();
}

function resetModal(){
  modal.classList.remove("show-modal");
  resetDeck();
}

//move count setup:
const moves=document.querySelector(".moves");
const cardClickedArray=[];
//card clicking setup:
theDeck.addEventListener("click",cardFlip);
//restart-reset widget setup:
const restart = document.querySelector(".restart");
restart.addEventListener("click",resetDeck);
const modal = document.querySelector(".modal");
//play again button (on modal) setup:
const playAgainBtn = document.getElementById("modal-btn");
playAgainBtn.addEventListener("click",resetModal);

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
        clearInterval(myTimer);
        const mcText = document.getElementById("modal-text");
        const finalMoves = document.querySelector(".moves").textContent;
        const finalStars = document.querySelector(".stars").childElementCount;
        const displayTime = timeString.substring(0,1) + " minutes, " + timeString.substring(2,5) + " seconds ";
        mcText.innerHTML="<h1>Congratulations!</h1><p>You finished the game in " + displayTime + " with " + finalMoves + " moves and earned " + finalStars + " stars.</p>" ;
        modal.classList.add("show-modal");
    }//end of if statement
}//end of gameFinished function
