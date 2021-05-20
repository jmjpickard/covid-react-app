import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import { DateRangeInput } from "@blueprintjs/datetime";
import ReactEcharts from "echarts-for-react";

import _ from 'lodash';

import '../App.css';
import chartConfig from '../utils/chartConfig';

export const ChartCard = () => {
    const EngPopulation = 55980000;

    // set up state for api call, date range and chart
    const [covidData, setCovidData] = useState([]);
    const [startDate, setStartDate] = useState(new Date('2020-03-01'));
    const [endDate, setEndDate] = useState(new Date());
    const [chart, setChart] = useState(chartConfig);

    // define api call endpoint
    const endpoint = (
        'https://api.coronavirus.data.gov.uk/v1/data?' +
        'filters=areaType=nation;areaName=england&' +
        'structure={"date":"date","region":"areaName","newCases":"newCasesByPublishDate","cumVax":"cumPeopleVaccinatedFirstDoseByPublishDate", "cumVaxSecond":"cumPeopleVaccinatedSecondDoseByPublishDate"}'
    );

    const getVaxPct = vaxData => {
        if (vaxData.length === 0) {
            return []
        } else {
            const firstDose = vaxData.slice().reverse().map(item => {
                const data = _.ceil(((item.cumVax - item.cumVaxSecond) / EngPopulation) * 100, 1)
                return data
            })
            const secondDose = vaxData.slice().reverse().map(item => {
                const data = _.ceil((item.cumVaxSecond / EngPopulation) * 100, 1)
                return data
            })
            return {firstDose, secondDose}
        }
    };


    const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const handleDateChange = dates => {
        // returns list of two dates
        // if one not changed then returns null
        const startDate = dates[0]
        const endDate = dates[1]
        if (startDate != null) {
            setStartDate(startDate) 
        }
        if (endDate != null) {
            setEndDate(endDate)
        }  
    }


    useEffect(() => {
        fetch(endpoint).then(r => r.json())
            .then(data => {
                console.log(data)
                setCovidData(data.data)
            })
    }, [endpoint]);


   // watches for changes in covidData and re-plots the chart
    useEffect(() => {
        const inputData = covidData.filter(row => {
            return row.date >= new Date(startDate).toISOString() &&
                   row.date <= new Date(endDate).toISOString()
        })
        console.log('inputData', inputData, new Date(startDate).toISOString()  )

        const newConfig = {
            ...chart,
            xAxis: {
                ...chart.xAxis,
                data: inputData.length ? inputData.slice().reverse().map(item => item.date) : []
            },
            series: [
                {
                    ...chart.series[0],
                    data: inputData.length ? inputData.slice().reverse().map(item => item.newCases) : []
                },
                {
                    ...chart.series[1],
                    data: getVaxPct(inputData).firstDose
                },
                {
                    ...chart.series[2],
                    data: getVaxPct(inputData).secondDose 
                },
            ]
        }
        setChart(newConfig)
                
    }, [covidData, startDate, endDate])


    
    return (
        <div className='chart-card-div'>
            <Card interactive={true} elevation={Elevation.ONE} className='chart-card'>
                <h2>View infection or hospitalisation rates against the proportion of population that is vaccinated</h2>
                <p>Use the date range to filter for a specific time period</p>
                <DateRangeInput
                    formatDate={date => date.toLocaleString('en-GB', dateOptions)}
                    parseDate={str => new Date(str)}
                    value={ [ startDate, endDate ] }
                    onChange={ handleDateChange }
                /> 
                <ReactEcharts
                    option={chart}
                />
            </Card>
        </div>
    )
}