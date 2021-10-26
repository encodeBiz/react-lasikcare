/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import Calendar from "../../../shared_modules/Calendar/Calendar";

import "./CalendarAppointmentPage.scss";
import Button from "../../../shared_modules/Button/Button";
import { useHistory } from "react-router";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { connect } from "react-redux";
import moment from "moment";
import useWindowSize from "../../../hooks/useWindowSize";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import { updateAvailableHours } from "../../../redux/available_hours/available_hours.actions";
import Card from "../../../shared_modules/Card/Card";
import opcionOne from "../../../assets/images/icons/type-free.svg";
import opcionTwo from "../../../assets/images/icons/calendar-icon.svg";
import Loading from "../../../shared_modules/Loading/Loading";
import { IMAGES_SERVER } from "../../../constants/constants";
import { sendErrorEmail } from "../../../services/email.service";
import { setIsGlobalLoading } from "../../../redux/loading/loading.actions";
import { date } from "yup";

/**
 *
 * @param {Object} properties
 * @param {Object} properties.appointment Configuración de la cita hasta el momento desde redux
 * @param {Object} properties.available_hours Horas disponibles por tipo y ciudad desde redux
 *
 * Pagina de calendario y selección de hora
 */

const CalendarAppointmentPage = (properties) => {
  const history = useHistory();
  const navigateTo = (url) => history.push(url);
  const today = moment(Date.now());
  const { available_hours, appointment } = properties;

  const buttonRef = useRef(null);

  const buttonsConfig = [
    {
      action: "Ärztliche Voruntersuchung (ca. 40 €) - Termin vor Ort",
      text: "Ärztliche Voruntersuchung (ca. 40 €) - Termin vor Ort",
      // label: "40€",
      type: "BIDI",
      img: opcionTwo,
      url: "/termintyp/vor-ort/voruntersuchung",
    },
    {
      action: "Unverbindliches Informationsgespräch",
      text: "Unverbindliches Informationsgespräch",
      label: "",
      type: "BI",
      img: opcionOne,
      url: "/termintyp/vor-ort/informationsgespräch",
    },
  ];

  /////////////////////////////
  // Configuración del componente
  /////////////////////////////

  const [calendarWidth, setCalendarWidth] = useState(null);
  // eslint-disable-next-line
  const [focused, setFocused] = useState(false);
  const [initialDate] = useState(today);
  const { width } = useWindowSize();
  const [selectedType, setType] = useState(null);
  const [selectedCity, setCity] = useState(null);
  const [dataCalendar, setDataCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [initialMonth, setInitialMonth] = useState(0);
  const hasSentEmail = JSON.parse(localStorage.getItem("hasSentEmail"));
  const [isInitialMonthSet, setIsInitialMonthSet] = useState(false);
   
  const [disable_next, setDisable_next] = useState(false);
  const [disable_prev, setDisable_prev] = useState(true);

  const currentMonthNumber = moment(today, "DD/MM/YYYY").format("M");

  const [currentMonth, setCurrentMonth] = useState(currentMonthNumber);

  useEffect(() => undefined, [loading]);

  /**
   * Seteo del current step y de la ciudad y el tipo de consulta seleccionada
   */

  useEffect(() => {
    properties.setAppoinmentConfig("currentStep", 2);
    setType(properties.appointment.type);
    setCity(properties.appointment.city.keycli);
    // eslint-disable-next-line
  }, [selectedType]);

  /**
   * @description Setea el currentStep del store
   * @see filterData
   */
  useEffect(() => {
    // Selecciona del store los datos correspondientes al mes que se muestra en el calendario
	
    const data =
      selectedCity && selectedType
        ? properties.available_hours[selectedCity]?.data[selectedType]?.[
            currentMonth
          ]
        : [];
	
    if (data && data.length > 0) {
      const filteredData = filterData(data);
      // Si filtered data tiene menos de 5 citas disponibles,
      // es BIDI y no se ha enviado un email antes
      // se envía un email a marketing@care-vision.com
      if (
        appointment.type === "BIDI" &&
        filteredData.length <= 5 &&
        !hasSentEmail?.[currentMonth]
      ) {
        handleSendErrorEmail();
      }

      // Se setea el objeto de datos
      setDataCalendar(filteredData);
    } else {
			setDataCalendar([]);
      if (appointment.type === "BIDI" && !hasSentEmail?.[currentMonth]) {
        handleSendErrorEmail();
      }
    }
    // eslint-disable-next-line
  }, [
    selectedType,
    selectedCity,
    currentMonth,
    properties.loading.globalLoading,
  ]);

  /**
   * @description Setea la anchura del calendario
   * para adaptarlo a diferentes tamaños de pantalla.
   */

  useEffect(() => {
    setCalendarWidth(formatCalendarWidth(width));
  }, [width]);

  /**
   * Se ejecuta cuando las peticiones al servidor ya han terminado
   */

  useEffect(() => {
    if (!properties.loading.globalLoading && available_hours) {
      getInitialMonth(
        available_hours?.[appointment.city.keycli]?.data?.[appointment.type]
      );
    }
  }, [
    properties.loading.globalLoading,
    properties.appointment.type,
    available_hours,
  ]);

  /**
   * Se ejecuta cuando se ha de cambiar de mes
   */

  useEffect(() => {
    const month = Number(currentMonth) + initialMonth;

    setCurrentMonth(month.toString());
    const data =
      available_hours?.[appointment.city.keycli]?.data?.[appointment.type]?.[
        month.toString()
      ];

    // Se formatean las horas seleccioonadas

    const filteredData = filterData(data);

    // Se setean los datos formateados como nuevos datos que el calendario debera pintar
    setDataCalendar(filteredData);

    // Para que no se pinten horas que no corresponden a ninguna de las fechas seleccionadas se limpia el estado de fecha seleccionada

    setSelectedDate(null);
  }, [initialMonth]);

  /**
   *
   */
  const handleSendErrorEmail = async () => {
    const utm_source = window.utm_source || "";
    const tmr = "";

    const query_params = {
      clinic_id:
        appointment.type === "VIDEO" ? "GRLCV" : appointment.city.keycli,
      clinic_name: appointment.city.clinica,
      clinic_address: appointment.city.address,
      date: "",
      hour: "",
      horaFin: "",
      keymed: "",
      gender: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
      type: appointment.type,
      utm_source,
      tmr, //Se incluirá al final
      comentarios: appointment.clientData.message,
      sexo: appointment.clientData.gender,
      error: `There are less than 5 available dates in ${appointment.city.clinica}`,
    };
    const data = {
      ...hasSentEmail,
      [currentMonth]: true,
    };
    localStorage.setItem("hasSentEmail", JSON.stringify({ ...data }));
    await sendErrorEmail(query_params);
  };

  /**
   * Hace un loop sobre una lista de meses y
   * si el mes está vacío pasa al siguiente
   * hasta que se encuentre uno que no lo está
   * @param {Object} monthObject Objeto con los meses guardados en el store
   * @returns {string} retorna el numero del mes en formato string
   */

  const getInitialMonth = (appointmentObject) => {
    let addToMonth = 0;
    const months = Object.values(appointmentObject);

    // Si no hay ninguna fecha en los próximos meses se debe de retornar

    if (months.every((month) => month === undefined || month.length <= 0)) {
      setInitialMonth(addToMonth);
      return setIsInitialMonthSet(true);
    }

    // De lo contrario se suma 1 por cada mes consecutivo sin fechas disponibles.

    for (let i = 0; i < months.length; i++) {
      if (!months[i] === undefined || months[i].length <= 0) {
        addToMonth++;
      } else {
        setInitialMonth(addToMonth);
        return setIsInitialMonthSet(true);
      }
    }
  };

  /**
   *
   * @param {Number} width
   * Formatea la anchura del calendario para ajustarla a la anchura de la ventana
   */
  const formatCalendarWidth = (width) => {
    //a partir de 1080 no debe ejecutarse la función
    if (width <= 360) return 35;
    else if (width <= 414 || width <= 1080) return 40;
    else if (width <= 980) return 50;
    else return 50;
  };

  /////////////////////////////
  // Gestión de eventos
  /////////////////////////////

  /**
   *
   * @param {Object} date fecha de moment
   *
   */

  const handleDateChange = (date) => {
    // Se setea a null para evitar que salga una hora por defecto
    window.dataLayer.push({
      event: "gaEvent",
      gaEventCategory: "online booking",
      gaEventAction: "step 3",
      gaEventLabel: "datum selected",
      gaEventValue: undefined,
      gaEventNonInt: 0,
      dimension1: undefined,
    });

    if (activeIndex !== null) {
      setActiveIndex(null);
      properties.setAppoinmentConfig("calendar_hour", null);
    }

    const finded = dataCalendar?.filter((item) => {
      return (
        item.formattedDate.format("DD-MM-yyyy") === date.format("DD-MM-yyyy")
      );
    });

    setSelectedDate(finded);
    properties.setAppoinmentConfig("calendar_date", date);
  };

  /**
   *
   * @param {Date} currentDate
   * Cuando se pulsa en el botón de siguiente mes del calendario se hace una
   * llamada para conseguir los huecos del mes siguiente
   *
   */
  
  const onNextMonthClick = async (currentDate) => {
    try {
      // // Setea currentMonth al mes actual

      const month = moment(today, "DD/MM/YYYY").format("M");

      setCurrentMonth(month);

      // Si está cargando todavía retornar

      if (properties.loading.globalLoading) {
        return;
      }

      // Se setea la fecha seleccionada a null para que desaparezcan las horas seleccionadas

      setSelectedDate(null);

      // Setea la fecha del que se pasará al action. Se añade un mes exacto
      const momentDate = moment(currentDate).set('date', 1)
      const date = momentDate.format("DD/M/YYYY");
      // Setea el mes que se utilizará para ubicar los nuevos datos en su lugar en el state
      // Como ya se tienen los 3 primeros meses incluyendo el presente se setea el siguiente
      // mes a presente mes + 3
      const next = moment(Date.now()).set('date',1).add(1, 'M')
      setDisable_next(momentDate.isAfter(next)) 
      setDisable_prev(false) 

      const nextMonth = (Number(currentMonth) + 1).toString();

      // Acción que llama a la API para conseguir los datos del mes siguiente
		
			const isData = properties.available_hours[selectedCity]?.data[selectedType]?.[
				nextMonth
			]
			if(!isData){
				setLoading(true);
				await properties.updateAvailableHours(
					appointment.city.keycli,
					appointment.type,
					date,
					nextMonth
				);
				setLoading(false);
			}
      // Se suma uno al mes actual
      setCurrentMonth(nextMonth);
      
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Cuando se va al mes anterior se resta uno al currentMonth
   */

  const onPreviousMonthClick = (e) => {
    setDisable_prev(e.isBefore(today)) 
    setDisable_next(false) 

    setSelectedDate(null);
    setCurrentMonth((Number(currentMonth) - 1).toString());
   
  };

  /**
   *
   * @param {Object} hour
   * @param {Number} index
   * Setea la hora seleccionada
   *
   */

  const handleSelectedHour = (hour, index) => {
    window.dataLayer.push({
      event: "gaEvent",
      gaEventCategory: "online booking",
      gaEventAction: "step 3",
      gaEventLabel: "uhrzeit selected",
      gaEventValue: undefined,
      gaEventNonInt: 0,
      dimension1: undefined,
    });

    properties.setAppoinmentConfig("calendar_hour", hour);
    setActiveIndex(index);
    handleScroll();
  };

  /**
   *
   * @param {Array.<{
   * 		fecha: String,
   * 		horaFin: String,
   * 		horaInicio: String,
   * 		horaRealCita: String,
   * 		keymed: String}>} data
   *
   *
   * Formatea los datos provenientes del store para que puedan ser consumidos por el calendario
   */

  const filterData = (data) => {
    if (data && data.length > 0) {
      const filteredData = data.map((item) => {
        const date = item.fecha.split("/");
        const formattedDate = new Date(
          parseInt(date[2]),
          parseInt(date[1]) - 1,
          parseInt(date[0])
        );
        return { ...item, formattedDate: moment(formattedDate) };
      });

      return filteredData;
    }
  };

  /**
   * Una vez se ha seleccionado la fecha y la hora se activa esta función en el click del botón
   */

  const onConfirmHour = () =>
    history.push("/termintyp/vor-ort/datum/kontaktdaten/");

  /**
   *
   * @param {String} type Tipo de cita seleccionado
   */

  const handleClick = async (type, url) => {
    try {
      if (properties.loading.globalLoading || appointment.type === type) {
        return;
      }

      // Setea el tipo

      setType(type);
      setIsInitialMonthSet(false);

      await properties.setAppoinmentConfig("type", type);

      if (type === "VIDEO") {
        history.push("/termintyp/zu-hause/videoberatung");
        return;
      }

      history.push(url);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Scroll cuando se selecciona una nueva hora
   */

  const handleScroll = () => {
    if (buttonRef) {
      buttonRef.current.scrollIntoView(false, { behavior: "smooth" });
    }
  };

  /////////////////////////////
  // Renderizado del componente
  /////////////////////////////
  
  return (
    <React.Fragment>
      <Stepper
        currentStepIndex={properties.appointment?.currentStep}
        navigateTo={navigateTo}
      />
      <div className="wrapper-general">
        <div className="top-content">
          <Button
            action={() => history.push("/termintyp/vor-ort/")}
            styleType={"back-button"}
            label={"Zurück"}
          />
        </div>
        <div className="calendar-appointment-page">
          <h1>Datum wählen</h1>
          <CardContainer isColumn={true}>
            <div className="button-container">
              {buttonsConfig.map((button, index) => {
                const customClass =
                  appointment.type === button.type ? "card-highlighted" : "";
                return (
                  <Card
                    key={index}
                    customClass={`pointer ${customClass} ${
                      properties.loading.globalLoading ? "is-loading" : ""
                    }`}
                    handleClick={() => handleClick(button.type, button.url)}
                    // clickParam={button.type}
                  >
                    <label>
                      <input
                        checked={appointment.type === button.type}
                        type="radio"
                        name="type"
                        value={button.type}
                        onChange={() => {}}
                      />
                      <img
                        src={
                          process.env.NODE_ENV === "development"
                            ? button.img
                            : IMAGES_SERVER + button.img
                        }
                        alt="..."
                      ></img>
                      {button.text} <strong>{button.label}</strong>
                    </label>
                  </Card>
                );
              })}
            </div>
          </CardContainer>
          {properties.loading.globalLoading ? (
            <CardContainer>
              <div className="loading-center">
                <Loading />
              </div>
            </CardContainer>
          ) : (
            <CardContainer className="change-margin">
              
              {isInitialMonthSet && (
                <Calendar
                  datesList={dataCalendar}
                  initialMonth={initialMonth}
                  setFocused={setFocused}
                  initialDate={initialDate}
                  loading={loading}
                  width={width}
                  calendarWidth={calendarWidth}
                  handleDateChange={handleDateChange}
                  handleSelectedHour={handleSelectedHour}
                  selectedDate={selectedDate}
                  onNextMonthClick={onNextMonthClick}
                  onPreviousMonthClick={onPreviousMonthClick}
                  disable_next={disable_next}
                  disable_prev={disable_prev}
                  activeIndex={activeIndex}
                />
              )}
            </CardContainer>
          )}
          <div className="container-button" ref={buttonRef}>
            {appointment.calendar_date && appointment.calendar_hour ? (
              <Button
                type={"rounded-button"}
                label={"TERMIN WÄHLEN"}
                action={onConfirmHour}
              />
            ) : (
              <div className="button-fake-height"></div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

/**
 *
 * @param {Function} dispatch
 * @description Transforma las acciones de redux en props
 *
 */

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     *
     * @param {String} property  Propiedad del estado que se debe actualizar
     * @param {String || Object || number} data Datos con los que se actualizará la propiedad anterior
     * @description Actualiza un campo del objeto de appointment
     */
    setAppoinmentConfig: (property, data) =>
      dispatch(setAppoinmentConfig(property, data)),

    updateAvailableHours: (keycli, type, date, nextMonth) =>
      dispatch(updateAvailableHours(keycli, type, date, nextMonth)),

    setIsGlobalLoading: (value) => dispatch(setIsGlobalLoading(value)),
  };
};

/**
 *
 * @param {Object} store
 * @param {Object} store.appointment Configuración de la cita hasta el momento desde redux
 * @param {Object} store.available_hours Horas disponibles por tipo y ciudad desde redux
 * @description Transforma el appointments reducer a props
 * que serán consumidas por el componente y sus hijos.
 */

const mapStateToProps = (store) => {
  return {
    appointment: store.appointment,
    available_hours: store.available_hours,
    loading: store.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarAppointmentPage);
