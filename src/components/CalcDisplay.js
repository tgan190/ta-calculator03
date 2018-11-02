import React from 'react';
 
    const CalcDisplay = (props) => {   

       
            return (
        
                <div className="calc-display">
                  
                    <p>{props.externalDisplayStr}</p>
                    <p>{props.result}</p>
                    
                </div>

            );

    }

export default CalcDisplay;