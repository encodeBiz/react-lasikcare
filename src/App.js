import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import doctorIcon from "./assets/images/icons/doctor-color-icon.svg";
import "./styles/App.scss";
import { fetchAvailableHours } from "./redux/available_hours/available_hours.actions";
import CardContainer from "./shared_modules/CardContainer/CardContainer";
import { Link } from "react-router-dom";
import Card from "./shared_modules/Card/Card";
import { setGlobalError } from "./redux/errors/errors.actions";
import { fetchOnlineAvailableHours } from "./redux/available_online_hours/available_online_hours.actions";

/**
 * Página de ejemplo
 * @param {Object} properties Properties para la página
 * @param {Object} properties.store Store de redux
 * @param {Function} properties.getClinicsAppointments Acción para obtener las clínicas
 * @param {Function} properties.getHoursById  Acción para obtener los huecos dado una clinica y un tipo de cita
 * @param {Funcion} properties.setGlobalError Acción para setear un error
 */
function App(properties) {
  const [clinics, setClinics] = useState([]);

  const homeLinksConfig = [
    {
      title: "Zu Hause",
      image: null,
      subtitle: "Online video-beratung von zu hause aus",
      url: "/videollamadas",
    },
    {
      title: "Vor Ort",
      image: null,
      subtitle: "Vor-ort beratung im nächstgelegenen Lasik Care standort",
      url: "/appointments",
    },
  ];

  useEffect(() => {
    const city = localStorage.getItem("city");
    setClinics(properties.clinics);
    if (city) {
      // setClientCity(city);
    }

    getAsyncData();
    // eslint-disable-next-line
  }, [clinics]);

  const getAsyncData = async () => {
    try {
      await properties.setClinicAppointments();

      await getAllClinicsHours();
    } catch (error) {
      properties.setGlobalError(error);
    }
  };

  /**
   * Método que recupera todas las citas disponibles para cada una de las ciudades.
   */

  const getAllClinicsHours = () => {
    clinics.clinics.forEach((clinic) => {
      properties.fetchAvailableHours(clinic.keycli, "BI");
      properties.fetchAvailableHours(clinic.keycli, "BIDI");
    });
  };

  return (
    <React.Fragment>
      <h1 className="main-title">
        Bitte wählen Sie Ihren <br /> Wunschtermin
      </h1>
      <CardContainer isColumn={false}>
        {homeLinksConfig.map((link, index) => {
          return (
            <Link to={link.url} key={index}>
              <Card>
                <div className="home-card">
                  <h3>{link.title}</h3>
                  <div>
                    <img
                      className="home-card-image"
                      src={doctorIcon}
                      alt="..."
                    />
                  </div>
                  <p>{link.subtitle}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </CardContainer>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  /**
   *
   * @param {String} keycli
   * @param {String} appointments_type
   *
   * Acción de Redux que hace una llamada a la API para conseguir los huecos libres en un mes
   */

  fetchAvailableHours: (keycli, appointments_type) =>
    dispatch(fetchAvailableHours(keycli, appointments_type)),

  /**
   *
   * @param {String} appointments_type BI | BIDI Tipo de cita online que se pide
   * @returns
   */

  fetchOnlineAvailableHours: (appointments_type) =>
    dispatch(fetchOnlineAvailableHours(appointments_type)),

  /**
   *
   * @param {String} error
   *
   * Setea un nuevo error en Redux
   */

  setGlobalError: (error) => dispatch(setGlobalError(error)),
});

const mapStateToProps = (state) => ({
  clinics: state.clinics,
  available_hours: state.available_hours,
  state,
});

export default connect(mapDispatchToProps, mapStateToProps)(App);
