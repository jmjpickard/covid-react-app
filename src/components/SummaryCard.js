import React from 'react';
// import { useState, useEffect } from 'react';
import { Card, Elevation } from "@blueprintjs/core";

import '../App.css';

export const SummaryCard = () => {
    return (
        <div className='container'>
            <Card interactive={true} elevation={Elevation.ONE} className='chart-card first-card'>
                <h2>Infections</h2>
                <p>Past day</p>
            </Card>
            <Card interactive={true} elevation={Elevation.ONE} className='chart-card second-card'>
                <h2>Hospitalisations</h2>
            </Card>
            <Card interactive={true} elevation={Elevation.ONE} className='chart-card third-card'>
                <h2>Vaccinations</h2>
            </Card>
        </div>
    )
}