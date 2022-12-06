let moon = document.getElementById("moon");
let game = document.getElementById("game");
let button = document.querySelector(".Start")


    

function moveLeft(){
    let left = parseInt(window.getComputedStyle(moon).getPropertyValue("left"));
    if(left > 0){
        moon.style.left = left - 2 + "px";
    }
}

function moveRight(){
    let left = parseInt(window.getComputedStyle(moon).getPropertyValue("left"));
    if(left < 380){
        moon.style.left = left + 2 + "px";
    }
}
                    
    let interval;
    let both = 0;
    let counter = 0;
    let currentBlocks = [];
                
        document.addEventListener("keydown", event => {
    if(both == 0){
        both++;
                        
    
    if(event.key === "ArrowLeft"){
            interval = setInterval(moveLeft, 2);
        }
    
    if(event.key === "ArrowRight"){
            interval = setInterval(moveRight, 2);
        }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});


    let blocks = setInterval(function(){
    let blockLast = document.getElementById("block" + (counter -1));
    let holeLast = document.getElementById("hole" + (counter -1));
    
    if(counter > 0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    
    if(blockLastTop < 600||counter == 0) {
        let block = document.createElement("div");
        let hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        block.style.top = blockLastTop + 50 + "px";
        hole.style.top = holeLastTop + 50 + "px";
        let random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
    
    let moonTop = parseInt(window.getComputedStyle(moon).getPropertyValue("top"));
    let moonLeft = parseInt(window.getComputedStyle(moon).getPropertyValue("left"));
    let drop = 0;
    
    if(moonTop == 10) {
        alert(" Really? Thats It?. Score: " + (counter -10));
        clearInterval(blocks);
        location.reload();
       location.reload()
    }
    

    for(let i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];
        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
    
        
    if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
    
    if(iblockTop -22 < moonTop && iblockTop > moonTop){
                drop++;
            
    if(iholeLeft <= moonLeft && iholeLeft + 20 >= moonLeft){
                drop = 0;
            }
        }
    }
    
    if(drop == 0) {
    
    if(moonTop < 500){
            moon.style.top = moonTop + 2 + "px";
        }
    } else {
        moon.style.top = moonTop - 0.5 + "px";
    }


},-900);








