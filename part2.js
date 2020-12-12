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

let SHIP = {
    facing : EAST,
    "NORTH" : 0,
    "SOUTH" : 0,
    "EAST" : 0,
    "WEST" : 0
}

let WAYPOINT = {
    "NORTH" : 1,
    "SOUTH" : 0,
    "EAST" : 10,
    "WEST" : 0
}

function changeDirection(instruction){
    const directionArray = ["NORTH", "EAST", "SOUTH", "WEST"]
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
    let w  = {...WAYPOINT};
    value = value*sign;
    for(let dir in WAYPOINT){
        let startIndex = directionArray.indexOf(dir);
        let endIndex = startIndex + value;
        endIndex = endIndex >= 0 ? endIndex : directionArray.length+endIndex;
        endIndex = endIndex%directionArray.length;

        let newDir = directionArray[endIndex];
        w[newDir] = WAYPOINT[dir];
    }
    WAYPOINT = w;    
}

function followInstruction(instruction){
    console.log(WAYPOINT)
    
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

    for(let dir in WAYPOINT){
        if(dir === direction){
            if (WAYPOINT[oppositeDirection] === 0){
                WAYPOINT[direction] = WAYPOINT[direction]+  instruction.value
            }
            else{
                if(WAYPOINT[oppositeDirection] >= instruction.value){
                    WAYPOINT[oppositeDirection] = WAYPOINT[oppositeDirection] - instruction.value;
                }
                else{
                    let difference = instruction.value - WAYPOINT[oppositeDirection];
                    WAYPOINT[oppositeDirection] = 0;
                    WAYPOINT[direction] = difference
                }
            }  
        }
    }
    console.log(WAYPOINT)
}

function moveForward(instruction){
    console.log(SHIP)
    let multiplier = instruction.value;

    for(let dir in WAYPOINT){
        if(WAYPOINT[dir] !== 0){
            let direction = "";
            if(dir === "NORTH"){
                direction = NORTH
            }
            else if(dir === "SOUTH"){
                direction = SOUTH
            }
            else if(dir === "EAST"){
                direction = EAST
            }
            else if(dir === "WEST"){
                direction = WEST
            }

            let value = WAYPOINT[dir]*multiplier;
            moveForwarUtility({direction, value})
        }
    }
    console.log(SHIP)
}

function moveForwarUtility(instruction){
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
}

function part2(inputs){
    for(let instruction of inputs){
        if(instruction.direction===LEFT || instruction.direction ===RIGHT){
            changeDirection(instruction)
        }
        else if(instruction.direction === FORWARD){
            moveForward(instruction);
        }
        else{
            followInstruction(instruction)
        }
    }
    let distance = SHIP.NORTH + SHIP.SOUTH + SHIP.EAST + SHIP.WEST;
    console.log(SHIP)
    console.log(distance)
}

part2(INPUTS)