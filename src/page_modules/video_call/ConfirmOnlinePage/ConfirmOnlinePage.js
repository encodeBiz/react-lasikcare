import React from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";

import "./ConfirmOnlinePage.scss";
import Button from "../../../shared_modules/Button/Button";
import { connect } from "formik";

const ConfirmOnlinePage = (properties) => {
  const { appointment } = properties;

  console.log("Entra");
  return (
    <React.Fragment>
      <h1>ConfirmOnlinePage</h1>
      <Stepper
        currentStepIndex={appointment.currentStep}
        isVideoConference={true}
      ></Stepper>
      <CardContainer>Appointment data</CardContainer>
      <CardContainer>Form</CardContainer>
      <Button type={"rounded-button"} label={"Rounded"}></Button>
    </React.Fragment>
  );
};

const mapStateToProps = ({ appointment }) => ({
  appointment,
});
export default connect(mapStateToProps)(ConfirmOnlinePage);
