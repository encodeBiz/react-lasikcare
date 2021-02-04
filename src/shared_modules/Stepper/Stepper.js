import React from 'react'
import "./Stepper.scss"

const Stepper = () => {

    const currentStepIndex = 3
    const steps = [
        {
            stepNumber: 0, 
            stepText: "Terminart"
        }, 
        {
            stepNumber: 1, 
            stepText: "Standart"

        }, 
        {
            stepNumber: 2, 
            stepText: "Datum"

        }, 
        {
            stepNumber: 3, 
            stepText: "Ikontakdaten"

        }, 
    ]

    const isActive = (step) => currentStepIndex === step.stepNumber ? 'is-active' : ''

    return (
         <React.Fragment>
             <div className="step-container">
             {steps.map((step, index) => {
                 return (
                     <div key={index} className={`${isActive(step)} step`} >
                        {step.stepNumber + 1}
                     </div>
                 )
             })}
             </div>
         </React.Fragment>   
        
    )
}

export default Stepper
