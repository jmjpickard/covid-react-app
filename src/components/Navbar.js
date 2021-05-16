import React from 'react';
import { Navbar, Button, Icon } from "@blueprintjs/core";

import '../App.css';


export const NavBar = () => {
    return (
        <Navbar className='navbar'>
            <Navbar.Group>
                <Navbar.Heading>Covid Spike Spotter</Navbar.Heading>
                <Navbar.Divider />
                <Button className="bp3-minimal nav-button" icon= {<Icon icon='home' style={{color:"white"}}></Icon>} text="Home" />
                <Button className="bp3-minimal nav-button" icon={<Icon icon='document' style={{color:"white"}}></Icon>} text="About" />
            </Navbar.Group>
        </Navbar>
    )
}