//cash the dom variable e sii specifico nome variabile combacia
//cash del dom ossia creare le variabili cosi da non dover riscrivere il codice mille volte o piu volte se si sa che si dora ripetere quella variabile, sia per comodita che per scioltezza nel codice
//console.log("hello")
let userScore = 0;
let computerScore= 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

//finito il cash (creazione delle variabili) del dom inizia il codice

//cosa succede con il click , prendere il valore dell immagine e far dare al computer una variabile random e poi vedere chi ha vinto
function getComputerChoice(){
    const choices = ['r','p','s'];
    const randomNumber = Math.floor(Math.random()*3);
    //random esiste come metodo in JS a noi serve un random da un numero da 0 a 3 non decimale (math.floor)
    return choices[randomNumber];
}

function convertToWords(letter){
    if (letter === 'r') return "Rock";
    if (letter === 'p') return "Paper";
    return "Scissor";
}
 
//---- funzioni per la vincita la perdita e lo stallo!! che richiamano la scelta del giocatore e nei diversi casi provocano un cambio di stile con il glow del border
function win(userChoice, computerChoice){
    userScore++;
    //la variabile non puo essere una const se deve cambiare
    //console.log(userScore); ma noi vogliamo farla vedere sul pc non nella console
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    //const smallUserWord = "user".fontsize(3).sub(); non sta funzionando penso per incompatibilita 
    //const smallCompWord = "comp".fontsize(3).sub();
    //come dare il messaggio di vincita rispetto la mano?
    result_p.innerHTML = `${convertToWords(userChoice)} beats  ${convertToWords(computerChoice)}. You win!`;
    //aggiungiamo un animazione al border...quando vince e' rosso, aggiungendo una classe di stile
    document.getElementById(userChoice).classList.add('green-glow'); 
    setTimeout(function(){ document.getElementById(userChoice).classList.remove('green-glow')}, 300)
    //classList e' un metodo di js del DOM, adesso con il setTimer possiamo far sparire il glow che ora sta rimanendo li
}

function lose(userChoice, computerChoice){
    
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;

    result_p.innerHTML = `${convertToWords(userChoice)} looses to  ${convertToWords(computerChoice)}. You lost!`;
    document.getElementById(userChoice).classList.add('red-glow'); 
    setTimeout(function(){ document.getElementById(userChoice).classList.remove('red-glow')},300)
}

function draw(userChoice, computerChoice){
    
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;

    result_p.innerHTML = `${convertToWords(userChoice)} equals to  ${convertToWords(computerChoice)}. It's a draw!`;
}

//funzione che  legge la scelta dell'user e verifica in console per vedere se funziona;
function game(userChoice){
    //console.log("poop poop poop" + userChoice);
    const computerChoice = getComputerChoice();
 //adesso dobbiamo comparare e decidere chi vince faremo con un switch e non un if;ossia swich e se il caso e' x ridai y e cosi via con in mezzo break per fermare l esecuzione
    switch(userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":
            //console.log("user win");
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            //console.log("user loses");
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            //console.log("draw");
            draw(userChoice, computerChoice);
            break;
    }
}

//questa e' la funzione main in base al click del div htlm che provoca la scelta della determinata casella
function main(){
rock_div.addEventListener('click',function(){
    game("r");
})
paper_div.addEventListener('click',function(){
    game("p");
})
scissors_div.addEventListener('click',function(){
    game("s");
})
}

main();