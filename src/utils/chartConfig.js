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
                { name: "Lockdown relaxed", xAxis: '2021-05-17',yAxis: 0  },
                { name: "end", xAxis: '2021-05-17',  yAxis:'max' },
                ],
                [
                    { name: "First vaccination", xAxis: '2020-12-08',yAxis: 0  },
                    { name: "end", xAxis: '2020-12-08',  yAxis:'50000' },
                ],
                [
                    { name: "UK enters third lockdown", xAxis: '2021-01-02',yAxis: 0  },
                    { name: "end", xAxis: '2021-01-02',  yAxis:'max' },
                ]
                ],
                lineStyle: {
                    color: "#10161A",
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