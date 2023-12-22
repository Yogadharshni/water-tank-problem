function getValue(){
    let inputval = document.getElementById('resultArray');
    let resultArray = inputval.value.split(',')
    let bricks = firstChart(resultArray)
    let water = waterChart(resultArray)
    firstChart(resultArray,bricks)
    waterChart(resultArray,water)
}

const totalWater = (finalVal) => {
    let sum = 0;
    for(let i = 0; i < finalVal.length; i++){
        let element = finalVal[i];
        if (element != '-') {
            sum += +element;
        }
    };
    return sum;
};

function  createChartTable(xAxisNamesArr, outputArr, id){
    let dom = document.getElementById(id);
    let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
    });
    let option = {
    xAxis: {
        type: 'category',
        data: xAxisNamesArr
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: outputArr,
        type: 'bar'
        }
    ]
    };
    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
    window.addEventListener('resize', myChart.resize);
}


function firstChart(bricks){
    let finalVal = []
    let firstcase = []
    let secondCase = []
    let result = []
    let lastVlueForFirstCase = 0
    let lastVlueForSecondCase = 0
    for(let  i = 0; i<bricks.length; i++){
        let brick = bricks[i]
        if(brick == 0){
            firstcase.push(lastVlueForFirstCase)
        }else{
            firstcase.push('-')
            lastVlueForFirstCase = brick
        }
    }
    for(let  i = bricks.length -1; i>=0; i--){
        let brick = bricks[i]
        if(brick == 0){
            secondCase[i] = lastVlueForSecondCase
        }else{
            secondCase[i] = '-'
            lastVlueForSecondCase = brick
        }
    }
    for(let  i = 0; i<bricks.length; i++){
        let fc = firstcase[i]
        let sc = secondCase[i]
        if(fc == '-'){
            finalVal[i] = '-'
        }else{
            finalVal[i] = fc - sc > 0 ? sc : fc;
        }
    }
    for(let  i = 0; i<bricks.length; i++){
        let brick = bricks[i]
        if(brick == 0){
            result.push({
                value: finalVal[i],
                itemStyle: {
                    color: '#00FFFF'
                }
            })
        }else{
            result.push({
                value: brick,
                itemStyle: {
                    color: '#FFFF00'
                }
            })
        }
    }
    console.log(firstcase)
    console.log(secondCase)
    console.log(finalVal)
    console.log(result)
createChartTable(bricks, result, 'first-result')
}


function waterChart(water){
    let finalVal = []
    let firstcase = []
    let secondCase = []
    let result = []
    let lastVlueForFirstCase = 0
    let lastVlueForSecondCase = 0
    for(let  i = 0; i<water.length; i++){
        let waterwall = water[i]
        if(waterwall == 0){
            firstcase.push(lastVlueForFirstCase)
        }else{
            firstcase.push('-')
            lastVlueForFirstCase = waterwall
        }
    }
    for(let  i = water.length -1; i>=0; i--){
        let waterwall = water[i]
        if(waterwall == 0){
            secondCase[i] = lastVlueForSecondCase
        }else{
            secondCase[i] = '-'
            lastVlueForSecondCase = waterwall
        }
    }
    for(let  i = 0; i<water.length; i++){
        let fc = firstcase[i]
        let sc = secondCase[i]
        if(fc == '-'){
            finalVal[i] = '-'
        }else{
            finalVal[i] = fc - sc > 0 ? sc : fc;
        }
    }
    for(let  i = 0; i<water.length; i++){
        let waterwall = water[i]
        if(waterwall == 0){
            result.push({
                value: finalVal[i],
                itemStyle: {
                    color: '#00FFFF'
                }
            })
        }else{
            result.push({
                value: 0,
                itemStyle: {
                    color: '#FFFF00'
                }
            })
        }
    }

    console.log(totalWater(finalVal));
    console.log(firstcase)
    console.log(secondCase)
    console.log(finalVal)
    console.log(result)
  
createChartTable(water, result, 'second-result')

let outputspan = document.getElementById('waterunit')
outputspan.innerHTML = `Total water : ${totalWater(finalVal)} unit`
}