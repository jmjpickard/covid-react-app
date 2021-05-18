const chartConfig = {
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: [
        {
            type: 'value'
        },
        {
            type: 'value',
            splitLine: {
                show: false
             },
            name: 'Recieved 1st/2nd dose (%)',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
            formatter: '{value}%'
          }
        }
    ] ,
    legend: {},
    grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    series: [
        { 
            name: 'Covid cases',
            data: [],
            type: 'line',
            markLine: {
                data: [
                [
                { name: "Relaxed lockdown", xAxis: '2021-05-01',yAxis: 0  },
                { name: "end", xAxis: '2021-05-01',  yAxis:'max' },
                ]
                ],
                lineStyle: {
                    color: "rgba(242, 145, 72, 1)",
                }
            }
            
        },
        { 
            name: 'Received first dose',
            data: [],
            type: 'bar',
            stack: 'Vaccinated',
            yAxisIndex: 1,
        },
        { 
            name: 'Received both doses',
            data: [],
            type: 'bar',
            stack: 'Vaccinated',
            yAxisIndex: 1,
        }
  ]
}

export default chartConfig