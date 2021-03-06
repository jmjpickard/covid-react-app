import React from 'react';
import { Card, Elevation } from "@blueprintjs/core";

import '../App.css';

export const TopCard = () => {
    return (
        <Card interactive={true} elevation={Elevation.ONE} className='nav-card'>
            <h2>Welcome to the covid spike spotter tool</h2>
            <p>This tool draws from the UK government coronavirus data API</p>
            <p>View daily COVID cases over time in England as well as the proportion of the population who have had either 1 or both doses</p>
        </Card>
    )
    
}