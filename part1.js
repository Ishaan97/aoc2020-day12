const readFile = require('fs').readFileSync;

const INPUTS = []

readFile('input.txt', 'utf-8').split("\n").forEach(data => {
    INPUTS.push(data.trim());
});

const NORTH = "N";
const SOUTH = "S";
const EAST = "E";
const WEST = "W";

const LEFT = "L";
const RIGHT = "R";
const FORWARD = "F";

function preprocessData(){
    // { direction: 'F', value: 10 }
    for(let i =0; i<INPUTS.length; i++){
        let data = INPUTS[i];
        let direction = data.slice(0, 1);
        let value = parseInt(data.slice(1))
        INPUTS[i] = {direction, value}
    }
}
preprocessData()
// console.log(INPUTS)

let SHIP = {
    facing : EAST,
    "NORTH" : 0,
    "SOUTH" : 0,
    "EAST" : 0,
    "WEST" : 0
}

function changeDirection(instruction){
    const directionArray = [NORTH, EAST, SOUTH, WEST]

    let sign=+1;
    if (instruction.direction === RIGHT){
        sign = +1;
    }
    else{
        sign = -1;
    }

    let value = 0;
    if(instruction.value === 90)
    {
        value = 1;
    }
    else if(instruction.value === 180){
        value = 2;
    }
    else if(instruction.value === 270){
        value = 3;
    }

    value = value*sign;
    let startIndex = directionArray.indexOf(SHIP.facing);
    let endIndex = startIndex + value;
    endIndex = endIndex >= 0 ? endIndex : directionArray.length+endIndex;
    endIndex = endIndex%directionArray.length;

    SHIP.facing = directionArray[endIndex];
    console.log(SHIP)
}
function followInstruction(instruction){
    if(instruction.direction === FORWARD){
        instruction.direction = SHIP.facing;
    }

    let direction = instruction.direction;
 
    let oppositeDirection;
    
    if(direction === EAST){
        oppositeDirection = "WEST"
        direction = "EAST"
    }
    else if(direction === NORTH){
        oppositeDirection = "SOUTH"
        direction = "NORTH"
    }
    else if(direction === WEST){
        oppositeDirection = "EAST"
        direction = "WEST"
    }
    else if(direction === SOUTH){
        oppositeDirection = "NORTH"
        direction = "SOUTH"
    }

    for(let dir in SHIP){
        if(dir === direction){
            if (SHIP[oppositeDirection] === 0){
                SHIP[direction] = SHIP[direction]+  instruction.value
            }
            else{
                if(SHIP[oppositeDirection] >= instruction.value){
                    SHIP[oppositeDirection] = SHIP[oppositeDirection] - instruction.value;
                }
                else{
                    let difference = instruction.value - SHIP[oppositeDirection];
                    SHIP[oppositeDirection] = 0;
                    SHIP[direction] = difference
                }
            }
        }
    }
    console.log(SHIP)
}

function part1(inputs){
    for(let instruction of inputs){
        if(instruction.direction===LEFT || instruction.direction ===RIGHT){
            changeDirection(instruction)
        }
        else{
            followInstruction(instruction)
        }
    }
    let distance = SHIP.NORTH + SHIP.SOUTH + SHIP.EAST + SHIP.WEST;
    console.log(SHIP)
    console.log(distance)
}

part1(INPUTS)
