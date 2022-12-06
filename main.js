let moon = document.getElementById("moon");
let game = document.getElementById("game");
let button = document.querySelector(".Start")


    
//moves the moon to the left 
function moveLeft(){
    let left = parseInt(window.getComputedStyle(moon).getPropertyValue("left"));
    if(left > 0){ //limits the ball from going off of the screen
        moon.style.left = left - 2 + "px";
    }
}
//moves the moon to the right
function moveRight(){
    let left = parseInt(window.getComputedStyle(moon).getPropertyValue("left"));
    if(left < 380){
        moon.style.left = left + 2 + "px";
    }
}
                    
    let interval;

    //the moon will only go left or right if both is equal to zero 
    let both = 0;

    //keeps track of how many times the interval has ran
    let counter = 0;

    //keeps track of the current blocks in the game
    let currentBlocks = [];
                
    //adds an event listener for when you press the keys
        document.addEventListener("keydown", event => {
    if(both == 0){
        both++;
                        
    //hit the left arrow key and it moves left
    if(event.key === "ArrowLeft"){
            interval = setInterval(moveLeft, 2);
        }
    
    //hit the right arrow key and it moves right
    if(event.key === "ArrowRight"){
            interval = setInterval(moveRight, 2);
        }
    }
});

//adds an event listener for when the key is not pressed. with out this the moon keeps moving and it doesnt stop.
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});

        //runs function (the game)
    let blocks = setInterval(function(){
       
        //(block and holes last) is to create more blackholes and blocks equal to the current one but 1 less (it finds the one that was created before the one that we are currently creating to get its top position then add 50 px to the new one so everything after we create is 50 px below the one before it) 
    let blockLast = document.getElementById("block" + (counter -1));
    let holeLast = document.getElementById("hole" + (counter -1));
       
    //it doesn't create it if the counter is equal to 0 so it wont create one ontop of the other one
    if(counter > 0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    //creates the black holes and blocks over and over
    //the if statement allows a certain amount of the blocks inside the game, the or (||) is because there is no top position to set it too so only if it fits in the game
    if(blockLastTop < 600||counter == 0) {
        let block = document.createElement("div");
        let hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        //the counter allows them to have different ids
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        block.style.top = blockLastTop + 50 + "px";
        hole.style.top = holeLastTop + 50 + "px";
        
        //creates random hole to the left
        let random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        //keeps count of the blocks that are currently in the game with the id
        currentBlocks.push(counter);
        counter++;
    }
    
    //allows the moon to be ontop of the blocks
    let moonTop = parseInt(window.getComputedStyle(moon).getPropertyValue("top"));
    let moonLeft = parseInt(window.getComputedStyle(moon).getPropertyValue("left"));
    let drop = 0;
    
    //ends the game, if the moon gets 3 px from the top you lose.
    if(moonTop == 3) {
        alert(" Really? Thats It?. Score: " + (counter -21));
        clearInterval(blocks);
        location.reload();
       location.reload()
    }
    
       //moves the blocks up. the ihole and iblock is equal to the hole and block but with the value 
    for(let i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];
        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
    
        //if the top block is above the top of the game then it gets removed
    if(iblockTop < -10){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
       //if the moon is ontop of the block it stays ontop 
    if(iblockTop -22 < moonTop && iblockTop > moonTop){
                drop++;
            //if the moon is ontop of the hole then it drops
    if(iholeLeft <= moonLeft && iholeLeft + 20 >= moonLeft){
                drop = 0;
            }
        }
    }
    //if it gets to the bottom of the game it won't fall into the void. 
    if(drop == 0) {
    
    if(moonTop < 500){
            moon.style.top = moonTop + 2 + "px";
        }
    } else {
        moon.style.top = moonTop - 0.5 + "px";
    }
});








