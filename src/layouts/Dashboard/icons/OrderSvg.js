import React from "react";


export default class OrderSvg extends React.Component {
    
    render() {
        return (
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 3.5V10.5L8 8L5.5 10.5V3.5" stroke="#003EDD" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.5 14.5H0.5V3.5L3 0.5H13L15.5 3.5V14.5Z" stroke="#003EDD" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M0.5 3.5H15.5" stroke="#003EDD" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    }
}