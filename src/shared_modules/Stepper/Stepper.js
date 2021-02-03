import React from 'react'
import "./Stepper.scss"

const Stepper = () => {

    const currentStepIndex = 3
    const steps = [
        {
            stepNumber: 0
        }, 
        {
            stepNumber: 1
        }, 
        {
            stepNumber: 2
        }, 
        {
            stepNumber: 3
        }, 
        {
            stepNumber: 4
        }
    ]

    const isActive = (step) => currentStepIndex === step.stepNumber ? 'is-active' : ''

    return (
         <React.Fragment>
             <div className="">
             {steps.map((step, index) => {
                 return (
                     <div key={index} className={`${isActive(step)}`} >
                        {step.stepNumber + 1}
                     </div>
                 )
             })}
             </div>
         </React.Fragment>   
        
    )
}

export default Stepper
