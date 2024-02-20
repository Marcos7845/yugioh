const state = {
    score:{
        playerScore:0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card")
    },
    playersSides: {
        player1: "player-cards",
        player1BOX: document.querySelector(".card-box.framed#player-cards"),
        computer: "computer-cards",
        computerBOX:document.querySelector(".card-box.framed#computer-cards"),
    },
    actions: {
    button: document.getElementById("next-duel"),
    },
};


 const pathImages = "./src/assets/icons/"
 const cardData=[
    {
        id:0,
        name:"Blue Eyes White Dragon",
        type: "paper",
        img: `${pathImages}dragon.png`,
        winOF:[1],
        LoseOf:[2],
    },
    {
        id:1,
        name:"Dark Magician",
        type: "rock",
        img: `${pathImages}magician.png`,
        winOF:[2],
        LoseOf:[0],
    },
    {
        id:2,
        name:"Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOF:[0],
        LoseOf:[1],
    },
 ];

 async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random()*cardData.length);
    return cardData[randomIndex].id;
 }

 async function createCardImage(IdCard,fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height","100px");
    cardImage.setAttribute("src","./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id",IdCard);
    cardImage.classList.add("card");

    if(fieldSide===state.playersSides.player1){
        cardImage.addEventListener("click", ()=>{setCardsField(cardImage.getAttribute("data-id"))
        })
        cardImage.addEventListener("mouseover", ()=>{
            drawSelectCard(IdCard);
        });
    }

    
    return cardImage;
 }

 async function resetDuel(){
    state.cardSprites.avatar.src="";
    state.actions.button.style.display="none"
    state.fieldCards.player.style.display="none"
    state.fieldCards.computer.style.display="none"

    init();

 }

 async function updateScore(){

    state.score.scoreBox.innerText=`Win:${state.score.playerScore}| Lose:${state.score.computerScore}`
 }

async function setCardsField(cardId){
    await removeAllCardsImages();
    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display="block";
    state.fieldCards.computer.style.display="block";
    state.cardSprites.name.innerText="";
    state.cardSprites.type.innerText="";

    state.fieldCards.player.src=cardData[cardId].img;
    state.fieldCards.computer.src=cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId,computerCardId);

    await updateScore();
    await drawButton(duelResults);

}
async function drawButton(text){
    state.actions.button.innerText=text;
    state.actions.button.style.display = "Block";
}

async function checkDuelResults(playerCardId,computerCardId){
    let duelResults= "Empate";
    let playerCard = cardData[playerCardId];
    if(playerCard.winOF.includes(computerCardId)){
        duelResults = "Ganhou"
        state.score.playerScore++;
    }
    if(playerCard.LoseOf.includes(computerCardId)){
        duelResults = "Perdeu"
        state.score.computerScore++;
    }
    return duelResults
}

 async function removeAllCardsImages(){
    let cards = state.playersSides.computerBOX;
    let imgELements = cards.querySelectorAll("img");
    imgELements.forEach((img) => 
     img.remove()   
    );
    cards = state.playersSides.player1BOX;
    imgELements = cards.querySelectorAll("img");
    imgELements.forEach((img) => 
     img.remove()   
    );

 }




async function drawCards(cardNumbers, fieldSide){
    for(let i = 0;i<cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard,fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);

    }
    
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText ="Attribute: "+ cardData[index].type;
};

function init(){
drawCards(5, state.playersSides.player1);
drawCards(5, state.playersSides.computer);
}


init()