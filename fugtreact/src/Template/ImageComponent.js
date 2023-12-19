import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FUGTLogo from './FUGTLogo.png';
function ImageComponent() {
    return (
        <div>
            <img src={FUGTLogo} alt="FUGT Logo" />
        </div>
    );
}

export default ImageComponent;
