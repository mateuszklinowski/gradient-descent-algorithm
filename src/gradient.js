const math = require('mathjs');
const asciichart = require('asciichart');

const data = [
    [1,2104,5,1,45],
    [1,1416,3,2,40],
    [1,1534,3,2,30],
    [1,852,2,1,36],
];


const dataScaled = [
    [1,(2104-1476.5)/1252,5,1,(45-37.75)/15],
    [1,(1416-1476.5)/1252,3,2,(40-37.75)/15],
    [1,(1534-1476.5)/1252,3,2,(30-37.75)/15],
    [1,(852-1476.5)/1252,2,1,(36-37.75)/15]
];

const y = [460,232,315,178];

const thetas = [0,0,0,0,0];

const learningRate = 0.1;

const calculateNewThetaMatrix = (data, thetaMatrix, y) => {

    let newTheta = thetaMatrix;

    newTheta = newTheta.map((theta, index) => {
         return thetaMatrix[index] - (learningRate*(1/data.length)) * calculateDerivative(data,thetaMatrix,y,index)
    });

   // console.log(newTheta);
    return newTheta;
};

const calculateDerivative = (dataSet,thetas, y, xIndex) => {
     const m = dataSet.length;
     let rowsResults = [];
     data.forEach((row, index)=>{
         let rowResult = 0;
         row.forEach((value,index)=>{
             rowResult = rowResult + value*thetas[index]
         });
         rowResult = rowResult - y[index];
         rowResult = rowResult * dataSet[index][xIndex];
         rowsResults.push(rowResult)
     });

    return rowsResults = rowsResults.reduce((acc,curr)=>acc+curr, 0) * 1/m * learningRate
};


const result = calculateDerivative(data,thetas,y, 5);
const test2 = calculateNewThetaMatrix(data, thetas,y);

const calculateCostFunction = (data,thetas,y, log) => {

    let sum = 0;
    let t = math.matrix(thetas);
    data.forEach((row, index)=>{
        let x = math.matrix(data[index]);

        let functionRes = math.multiply(math.transpose(t),x);

        if(log){
           // console.log(functionRes);
        }
        sum = sum + Math.pow(functionRes-y[index],2);
    });

    return sum * (1/data.length);
};


let i =0;
let calculations = thetas;

let costFunctionRes = 0;
let nextCostFunctionRes = 0;

const costFuncArray = [];

while(i < 100000){
    i++;
    calculations = calculateNewThetaMatrix(dataScaled, calculations, y);

    if(i%500 === 0){
        console.log(costFunctionRes - calculateCostFunction(data, calculations, y))
    }
    costFunctionRes = calculateCostFunction(data, calculations, y);

    if(i%50===0){
        costFuncArray.push(costFunctionRes);
    }
}

//console.log(costFuncArray);




//console.log('s0 is: ', s0);
//console.log (asciichart.plot (costFuncArray));

console.log(calculations);
console.log("_____________________");
console.log(calculateCostFunction(data, calculations, y, true));
//calculations.forEach(e=>console.log(e));
