import React, { useEffect, useState } from "react"
import {connect} from 'react-redux'
import logo from './logo.svg';
import './styles/App.css';
import { getClinicas, getHuecos } from "./services/appointments.service";
import { getClinicsAppointments } from "./redux/clinics/clinics.actions";
import { getHoursById } from "./redux/available_hours/available_hours.actions";
import  PropTypes from "prop-types";

/**
 * Página de ejemplo 
 * @param {Object} properties Properties para la página
 * @param {Object} properties.store Store de redux 
 * @param {Function} properties.getClinicsAppointments Acción para obtener las clínicas
 * @param {Function} properties.getHoursById  Acción para obtener los huecos dado una clinica y un tipo de cita
 */
function App(properties) {
  const [init, setInit] = useState(false)
  const [clinics, setClinics] = useState([])

  useEffect(()=>{
    properties.getClinicsAppointments()
  },[])

  properties.store.clinics.then( clinicsState => {
    if(clinicsState.clinics.status === 'finish' && !init ){
      setInit(true)
      const cli = clinicsState.clinics.clinics
      for (let index = 0; index < cli.length; index++) {
        const {keycli} = cli[index];
        properties.getHoursById(keycli,'BI')
        properties.getHoursById(keycli,'BIDI')
      }
    }
  })

  /* properties.store.available_hours.then(
    (_store) => {
      console.log('available_hours', _store)
  }) */
  properties.store.clinics.then( clinicsState => {
    if (clinicsState.clinics.status === 'finish'){
      setClinics(clinicsState.clinics.clinics)
    } 
  })
  
  return (
    <div className="App">
      <header className="App-header">
        {
          clinics.map((clinic, index)=>{
            return  <h1 id={clinic.keycli} key={clinic.keycli}>{clinic.name}</h1>
          })
        }
      </header>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    getClinicsAppointments: () => dispatch(getClinicsAppointments()), 
    getHoursById: (keycli, appointments_type) => dispatch(getHoursById(keycli, appointments_type))
  }
}
const mapStateToProps = state => ({ store: {clinics: state.clinics, available_hours: state.available_hours} })


export default connect(mapStateToProps, mapDispatchToProps)(App);
