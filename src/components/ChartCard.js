import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import ReactEcharts from "echarts-for-react";

import _ from 'lodash';

import '../App.css';

export const ChartCard = () => {
    const EngPopulation = 55980000;

    const [covidData, setCovidData] = useState([]);
    const [vaxData, setVaxData] = useState([]);

    const endpoint = (
        'https://api.coronavirus.data.gov.uk/v1/data?' +
        'filters=areaType=nation;areaName=england&' +
        'structure={"date":"date","newCases":"newCasesByPublishDate"}'
    );

    const endpointVax = (
        'https://api.coronavirus.data.gov.uk/v1/data?' +
        'filters=areaType=nation;areaName=england&' +
        'structure={"date":"date","cumVax":"cumPeopleVaccinatedFirstDoseByPublishDate"}'
    )

    useEffect(() => {
        fetch(endpoint).then(r => r.json())
            .then(data => setCovidData(data))
    }, [endpoint]);

    useEffect(() => {
        fetch(endpointVax).then(r => r.json())
            .then(data => setVaxData(data))
    }, [endpointVax]);
    

    const getVaxPct = vaxData => {
        if (vaxData.length === 0) {
            return []
        } else {
            const data = vaxData.data.slice().reverse().map(item => {
                return _.ceil((item.cumVax / EngPopulation) * 100, 1)
            })
            return data
        }
        
        
    }
    const options = {
        xAxis: {
            type: 'category',
            data: covidData.length ? covidData.data.slice().reverse().map(item => item.date) : []
        },
        yAxis: [
            {
                type: 'value'
            },
            {
                type: 'value',
                name: 'Recieved first dose (%)',
                min: 0,
                max: 100,
                interval: 20,
                axisLabel: {
                formatter: '{value}%'
              }
            }
        ] ,
        legend: {
            data: ['Positive COVID cases']
        },
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
        series: [{ 
            data: covidData.length ? covidData.data.slice().reverse().map(item => item.newCases) : [],
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
            data: getVaxPct(vaxData),
            type: 'bar',
            yAxisIndex: 1,
        }
      ]
    }


    return (
        <div className='chart-card-div'>
            <Card interactive={true} elevation={Elevation.TWO} className='chart-card'>
                <h2>View infection or hospitalisation rates against the proportion of population that is vaccinated</h2>
                <p>Use the dropdown and date range to filter for a specific time period or Region</p>
                <ReactEcharts
                    option={options}
                />
            </Card>
        </div>
    )
}