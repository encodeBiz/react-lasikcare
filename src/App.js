import React, { useEffect } from "react"
import {connect} from 'react-redux'
import logo from './logo.svg';
import './styles/App.css';
import { getClinicas, getHuecos } from "./services/appointments.service";
import { getClinicsAppointments, GET_CLINICS_APPOINTMENTS } from "./redux/clinics/clinics.actions";
function App({store, getClinicsAppointments}) {
  
  useEffect(()=>{
    getClinicsAppointments();
  },[])

  store.available_hours.then(_store => console.log(_store))
  store.clinics.then(_store => console.log(_store))
  return (
    <div className="App">
      <header className="App-header">
        Hola mundo
      </header>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    getClinicsAppointments: () => dispatch(getClinicsAppointments()),
    getClinicsAppointments: () => dispatch(getClinicsAppointments())
  }
}
const mapStateToProps = state => ({ store: {clinics: state.clinics, available_hours: state.available_hours} })
export default connect(mapStateToProps, mapDispatchToProps)(App);
