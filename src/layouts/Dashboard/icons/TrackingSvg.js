import React from "react";


export default class TrackingSvg extends React.Component {
    
    render() {
        return (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 8.5V15.5H2.5V8.5" stroke="#B8B8B8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.5 15.5V11.5H9.5V15.5" stroke="#B8B8B8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.5 6.5H0.5L2.5 3V0.5H13.5V3L15.5 6.5Z" stroke="#B8B8B8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        )
    }
}