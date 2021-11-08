let doors = []
let isFirstChoise = true;
let activeDoor = -1;
let isActiveGame = true;

class Door{
    constructor(sprite, value, status){
        this.sprite = sprite
        this.value = value
        this.isOpen = status;
    }
}

function generateNumber(){
    return Math.floor(Math.random() * 3);
}

function setDoors(){
    let first = document.getElementById("firstDoor");
    let second = document.getElementById("secondDoor");
    let third = document.getElementById("thirdDoor");

    doors[0] = new Door(first, 0, false);
    doors[1] = new Door(second, 0, false);
    doors[2] = new Door(third, 0, false);

    doors[0].sprite.addEventListener("click", function(event){choiseDoor(0);})
    doors[1].sprite.addEventListener("click", function(event){choiseDoor(1);})
    doors[2].sprite.addEventListener("click", function(event){choiseDoor(2);})
}

function randomizeDoors(){
    let number = generateNumber();
    doors[number].value = 1
}

function startGame(){
    setDoors();
    randomizeDoors();
}

function setActiveDoor(index){
    doors[index].sprite.classList.add("choiseDoor");
    doors[index].sprite.classList.remove("door");
    activeDoor = index;
    isFirstChoise = false;
}

function openDoor(index){
    if(doors[index].value == 0){
        doors[index].sprite.innerHTML = '<img src="./goat.png">';
    }
    else{
        doors[index].sprite.innerHTML = '<img src="./moneyBag.png">';
    }
    doors[index].isOpen = true;
}

function makeLeaderStep(){
    for(let i = 0; i < 3; i++){
        if(activeDoor != i && doors[i].value == 0){
            openDoor(i);
            break;
        }
    }
}

function updateStatus(index){
    if(index == activeDoor){
        let allStatus = document.getElementById("allCounter2");
        allStatus.innerHTML = parseInt(allStatus.textContent) + 1;
        if(doors[index].value == 0){
            let counter = document.getElementById("falseCounter2");
            counter.innerHTML = parseInt(counter.textContent) + 1;
        }
        else{
            let counter = document.getElementById("rightCounter2");
            counter.innerHTML = parseInt(counter.textContent) + 1;
        }
    }
    else{
        let allStatus = document.getElementById("allCounter1");
        allStatus.innerHTML = parseInt(allStatus.textContent) + 1;
        if(doors[index].value == 0){
            let counter = document.getElementById("falseCounter1");
            counter.innerHTML = parseInt(counter.textContent) + 1;
        }
        else{
            let counter = document.getElementById("rightCounter1");
            counter.innerHTML = parseInt(counter.textContent) + 1;    
        }
    }
}

function updateConst(){
    isFirstChoise = true;
    activeDoor = -1;
    isActiveGame = true;
}

function cleanDoorsValues(){
    for(let i = 0; i < 3; ++i){
        doors[i].value = 0;
        doors[i].isOpen = false;
    }
}

function updateDoorsView(){
    for(let i = 0; i < 3; ++i){
        doors[i].sprite.classList.remove("choiseDoor");
        doors[i].sprite.classList.add("door");
        doors[i].sprite.innerHTML = "?";
    }
}

function refreshGame(){
    cleanDoorsValues();
    randomizeDoors();
    updateConst();
    updateDoorsView();
}

function choiseDoor(index){
    if(isActiveGame){
        if(isFirstChoise){
            setActiveDoor(index);
            makeLeaderStep();
        }
        else{
            if(!doors[index].isOpen){
                openDoor(index);
                isActiveGame = false;
                updateStatus(index);
            }
        }
    }
}

startGame();