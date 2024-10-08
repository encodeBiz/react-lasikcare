/* eslint-disable react-hooks/exhaustive-deps */
import "./CalendarOnlinePage.scss";
import { connect } from "react-redux";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { useHistory } from "react-router";
import Button from "../../../shared_modules/Button/Button";
import Calendar from "../../../shared_modules/Calendar/Calendar";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import useWindowSize from "../../../hooks/useWindowSize";
import { fetchOnlineAvailableHours } from "../../../redux/available_online_hours/available_online_hours.actions";
import Loading from "../../../shared_modules/Loading/Loading";
import Card from "../../../shared_modules/Card/Card";
import opcionOne from "../../../assets/images/icons/type-free.svg";
import opcionTwo from "../../../assets/images/icons/calendar-icon.svg";
import { IMAGES_SERVER } from "../../../constants/constants";
import { updateAvailableHours } from "../../../redux/available_hours/available_hours.actions";
import { sendErrorEmail } from "../../../services/email.service";

const CalendarOnlinePage = (properties) => {
  const history = useHistory();
  const today = moment();
  const { width } = useWindowSize();
  const buttonRef = useRef(null);
  const [calendarWidth, setCalendarWidth] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [dataCalendar, setDataCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [initialMonth, setInitialMonth] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [initialDate] = useState(today);
  const [isInitialMonthSet, setIsInitialMonthSet] = useState(false);
  const currentMonthNumber = moment(today, "DD/MM/YYYY").format("M");
  const [currentMonth, setCurrentMonth] = useState(currentMonthNumber);
  const { appointment, online_available_hours, available_hours } = properties;
  const hasSentEmail = JSON.parse(localStorage.getItem("hasSentEmail"));

  const buttonsConfig = [
    {
      text: "Online Video Beratung",
      type: "VIDEO",
      img: opcionOne,
      url: "/termintyp/zu-hause/videoberatung",
    },
    {
      action: "Ärztliche Voruntersuchung (ca. 50 €) - Termin vor Ort",
      text: "Ärztliche Voruntersuchung (ca. 50 €) - Termin vor Ort",
      // label: "40€",
      type: "BIDI",
      img: opcionTwo,
      url: "/termintyp/zu-hause/voruntersuchung",
    },
  ];

  ///////////////////////////////////////////
  // CONFIGURACIÓN DEL COMPONENTE
  ///////////////////////////////////////////

  /**
   * Seteo del current step, de la ciudad y el tipo de consulta seleccionada
   */

  useEffect(() => {
    properties.setAppoinmentConfig("currentStep", 2);
    setCurrentMonth(moment(today, "DD/MM/YYYY").format("M"));
  }, [appointment.type]);

  /**
   * @description Gestiona la llegada de datos procedentes de Redux store
   */

  useEffect(() => {
    let data =
      appointment.type === "VIDEO"
        ? online_available_hours[currentMonth.toString()]
        : available_hours[appointment.city.keycli].data.BIDI[
            currentMonth.toString()
          ];
    if(!data) data = [];
    if (data?.length <= 0 && !hasSentEmail?.[currentMonth]) {
      handleSendErrorEmail();
    }
    
    
    if (data && data.length > 0) {
      const formattedDates = formatDates(data);
      setDataCalendar(formattedDates);
    } else {
      setDataCalendar(data);
    }
  }, [
    appointment.type,
    currentMonth,
    properties.loading.globalLoading,
    properties.loading.onlineGlobalLoading,
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
    if (
      !properties.loading.onlineGlobalLoading &&
      !properties.loading.globalLoading
    ) {
      const data =
        appointment.type === "BIDI"
          ? available_hours?.[appointment.city.keycli]?.data?.BIDI
          : online_available_hours;

      if (data) getInitialMonth(data);
    }
  }, [
    properties.loading.onlineGlobalLoading,
    properties.loading.globalLoading,
    properties.appointment.type,
  ]);

  /**
   * Se ejecuta cuando se cambia de mes
   */

  useEffect(() => {
    const month =
      Number(moment(today, "DD/MM/YYYY").format("M")) + initialMonth;

    setCurrentMonth(month.toString());
    const data =
      appointment.type === "BIDI"
        ? available_hours?.[appointment.city.keycli]?.data?.BIDI?.[
            month.toString()
          ]
        : online_available_hours[month.toString()];
    
    if (data.length > 0) {
      // Se formatean las horas seleccioonadas

      const filteredData = formatDates(data);

      // Se setean los datos formateados como nuevos datos que el calendario debera pintar

      setDataCalendar(filteredData);
     
      // Para que no se pinten horas que no corresponden a ninguna de las fechas seleccionadas se limpia el estado de fecha seleccionada

      setSelectedDate(null);
    }
  }, [initialMonth]);

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
      if (!months[i] === undefined || months[i]?.length <= 0) {
        addToMonth++;
      } else {
        setInitialMonth(addToMonth);
        return setIsInitialMonthSet(true);
      }
    }
  };

  // /////////////////////////////
  // // GESTIÓN DE EVENTOS
  // /////////////////////////////

  /**
   * ***************************************************************
   * MES SIGUIENTE/ANTERIOR
   * ***************************************************************
   */

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

      // Se setea la fecha seleccionada a null para que desaparezcan las horas seleccionadas
      setSelectedDate(null);

      // Setea la fecha del que se pasará al action. Se añade un mes exacto
      const date = moment(currentDate).set("date", 1).format("DD/M/YYYY");
      const nextMonth = moment(date, "DD/MM/YYYY").format("M");
      if (appointment.type === "VIDEO") {
        if (!online_available_hours[nextMonth]) {
          setLoading(true);
          await properties.fetchOnlineAvailableHours(date);
        }
        
      } else {
        if (
          !available_hours[appointment.city.keycli].data.BIDI[
            nextMonth.toString()
          ]
        ) {
          setLoading(true);
          await properties.updateAvailableHours(
            appointment.city.keycli,
            appointment.type,
            date,
            nextMonth
          );
        }
      }
      setLoading(false);
      setCurrentMonth(nextMonth);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Cuando se va al mes anterior se resta uno al currentMonth
   */

  const onPreviousMonthClick = () => {
    setSelectedDate(null);
    const preMonth = moment(currentMonth, "M").set("date", -1).format("M")
    setCurrentMonth(preMonth.toString());
  };

  /**
   * ***************************************************************
   * SELECCIÓN DE FECHAS
   * ***************************************************************
   */

  /**
   *
   * @param {Object} date fecha de moment
   *
   */

  const handleDateChange = (date) => {
    // Se setea a null para evitar que salga una hora por defecto

    if (activeIndex !== null) {
      setActiveIndex(null);
      properties.setAppoinmentConfig("calendar_hour", null);
    }

    const finded = dataCalendar.filter((item) => {
      return (
        item.formattedDate.format("DD-MM-yyyy") === date.format("DD-MM-yyyy")
      );
    });
    setSelectedDate(finded);
    properties.setAppoinmentConfig("calendar_date", date);
  };

  /**
   *
   * @param {Object} hour
   * @param {Number} index
   * Setea la hora seleccionada
   *
   */

  const handleSelectedHour = (hour, index) => {
    properties.setAppoinmentConfig("calendar_hour", hour);
    setActiveIndex(index);
    handleScroll();
  };

  /**
   * ***************************************************************
   * SELECCIÓN DE FECHAS
   * ***************************************************************
   */

  /**
   *
   * @param {String} type Tipo de cita seleccionado
   */

  const handleClick = async (type, url) => {
    try {
      if (
        properties.loading.onlineGlobalLoading ||
        properties.loading.globalLoading ||
        appointment.type === type
      ) {
        return;
      }

      setIsLoading(true);
      await properties.setAppoinmentConfig("type", type);

      // setCurrentMonth(moment(today, "DD/MM/YYYY").format("M"));

      history.push(url);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  ///////////////////////////////////////////
  // HELPERS
  ///////////////////////////////////////////

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

  const formatDates = (data) => {
    if (data && data.length > 0) {
      const formattedDates = data.map((item) => {
        const date = item.fecha.split("/");
        const formattedDate = new Date(
          parseInt(date[2]),
          parseInt(date[1]) - 1,
          parseInt(date[0])
        );
        return { ...item, formattedDate: moment(formattedDate) };
      });

      return formattedDates;
    }
  };

  /**
   * Una vez se ha seleccionado la fecha y la hora se activa esta función en el click del botón
   */

  const onConfirmHour = () =>
    history.push("/termintyp/videoberatung/kontaktdaten");

  /**
   * Scroll cuando se selecciona una nueva hora
   */

  /**
   * Scroll cuando se selecciona una nueva hora
   */

  const handleScroll = () => {
    if (buttonRef) {
      buttonRef.current.scrollIntoView(false, { behavior: "smooth" });
    }
  };

  const redirectToTypes = () => {
    history.push("/termintyp");
  };

  ///////////////////////////////////////////
  // ENVÍO DE ERRORES
  ///////////////////////////////////////////

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

  ///////////////////////////////////////////
  // RENDERIZADO DEL COMPONENTE
  ///////////////////////////////////////////

  return (
    <React.Fragment>
      <Stepper
        currentStepIndex={properties.appointment?.currentStep}
        isVideoConference={false}
      />

      <div className="wrapper-general">
        <div className="top-content">
          <Button
            action={redirectToTypes}
            styleType={"back-button"}
            label={"Zurück"}
          />
        </div>
        <div className="calendar-online-appointment-page">
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
                      properties.loading.onlineGlobalLoading ||
                      properties.loading.globalLoading
                        ? "is-loading"
                        : ""
                    } `}
                    handleClick={() => handleClick(button.type, button.url)}
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
          {properties.loading.onlineGlobalLoading ||
          (appointment.type === "BIDI" && properties.loading.globalLoading) ? (
            <CardContainer>
              <div className="loading-center">
                <Loading />
              </div>
            </CardContainer>
          ) : (
            <CardContainer className="change-margin">
               
              {!isLoading && (
                <Calendar
                  datesList={dataCalendar }
                  initialMonth={initialMonth}
                  initialDate={initialDate}
                  width={width}
                  loading={loading}
                  calendarWidth={calendarWidth}
                  handleDateChange={handleDateChange}
                  handleSelectedHour={handleSelectedHour}
                  selectedDate={selectedDate}
                  onNextMonthClick={onNextMonthClick}
                  onPreviousMonthClick={onPreviousMonthClick}
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

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @param {String} property  Propiedad del estado que se debe actualizar
     * @param {String || Object || number} data Datos con los que se actualizará la propiedad anterior
     * @description Actualiza un campo del objeto de appointment
     */

    setAppoinmentConfig: (property, data) =>
      dispatch(setAppoinmentConfig(property, data)),

    /**
     * @param {String} date Día presente en formato dd/mm/yyyy
     * @returns {Object} Lista de citas online disponibles divididas por meses
     */

    fetchOnlineAvailableHours: (date) =>
      dispatch(fetchOnlineAvailableHours(date)),

    updateAvailableHours: (keycli, type, date, nextMonth) =>
      dispatch(updateAvailableHours(keycli, type, date, nextMonth)),
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

const mapStateToProps = ({
  appointment,
  online_available_hours,
  available_hours,
  loading,
}) => ({
  appointment,
  online_available_hours,
  available_hours,
  loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarOnlinePage);
