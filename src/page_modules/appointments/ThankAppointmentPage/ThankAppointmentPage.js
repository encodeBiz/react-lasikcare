import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import CardContainer from '../../../shared_modules/CardContainer/CardContainer'
import './ThankAppointmentPage.scss'
import moment from 'moment'
import locationUbi from '../../../assets/images/icons/location-icon.svg'
import calendarUbi from '../../../assets/images/icons/calendar.svg'
import timeUbi from '../../../assets/images/icons/time-icon.svg'
import {
  clearAppointment,
  setAppoinmentConfig
} from '../../../redux/appointment_config/appointmentConfig.actions'
import iconThanks from '../../../assets/images/icons/icon-thanks.svg'
import { IMAGES_SERVER } from '../../../constants/constants'

/**
 *
 * @param {Object} properties
 * @param {Object} properties.appointment
 *
 */

const ThankAppointmentPage = properties => {
  const { appointment } = properties
  const [children, setChildren] = useState([])
  const [userEmail, setUserEmail] = useState('')
  const [appointmentType, setAppointmentType] = useState('')

  const info = {
    BI: {
      h3: 'Bitte beachten Sie:',
      ul: [
        {
          title: 'Informationsgespräch',
          text: (
            <p>
              Bitte planen Sie für das Informationsgespräch{' '}
              <strong>etwa 1 Stunde</strong> ein. Gerne beantworten wir Ihnen
              Ihre Fragen rund um die Augenbehandlung.
            </p>
          )
        },
        {
          title: 'Kontaktlinsen',
          text: (
            <p>
              Wenn möglich, tragen Sie Ihre{' '}
              <strong>weichen Kontaktlinsen 2 Tage</strong> oder Ihre{' '}
              <strong>harten Kontaktlinsen 1 Woche</strong> vor diesem Termin
              nicht mehr. Sollte dies nicht möglich sein, geben Sie bei Ihrem
              Termin bitte gleich zu Beginn dem Empfangspersonal Bescheid und
              bringen Sie den Aufbewahrungsbehälter und Ihre Linsenflüssigkeit
              mit.
            </p>
          )
        },
        {
          title: 'Brille  ',
          text: (
            <p>
              Falls Sie eine Brille besitzen, bringen Sie diese bitte zu dem
              Informationsgespräch mit, damit wir die Sehstärken entsprechend
              vergleichen können.
            </p>
          )
        },
        {
          title: '3G-Regel',
          text: (
            <p>
              Bitte beachten Sie, dass wir aufgrund der derzeitigen besonderen
              Situation der <strong>„3G“-Regel Folge leisten müssen</strong>.
              Demnach müssen Sie für einen Besuch bei Lasik Care entweder…{' '}
              <br></br> <strong> a)…einen Impf-Nachweis vorlegen </strong>(gilt
              ab dem 15. Tag nach der Zweitimpfung), <br></br>{' '}
              <strong>b)…oder einen Genesenen-Nachweis</strong> vorweisen, der
              nicht älter als 6 Monate, aber mindestens 28 Tage alt ist,{' '}
              <br></br> <strong>c)…oder einen negativen Corona-Test</strong> mit
              offiziellem Nachweis einer Teststation mitbringen, der nicht älter
              als 24 Stunden (Schnelltest) bzw. nicht älter als 48 Stunden
              (PCR-Test) ist.
            </p>
          )
        },
        {
          title: 'Begleitperson(en)',
          text: (
            <p>
              Als Schutzmaßnahme zur Eindämmung der COVID-19 Pandemie bitten wir{' '}
              <strong>
                Ihre Begleitperson(en), außerhalb unserer Räumlichkeiten zu
                warten
              </strong>
              . Dadurch können wir die Anzahl der Personen in unseren
              Warteräumen so gering wie möglich halten.
            </p>
          )
        }
      ]
    },
    BIDI: {
      h3: 'Bitte beachten Sie:',
      ul: [
        {
          title: 'Termindauer',
          text: (
            <p>
              Bitte planen Sie <strong>etwa 2,5 Stunden</strong>
              für das Informationsgespräch und die augenärztliche Untersuchung
              ein.
            </p>
          )
        },
        {
          title: 'Kontaktlinsen',
          text: (
            <p>
              Falls Sie <strong>weiche Kontaktlinsen</strong> tragen, setzen Sie
              diese bitte <strong>2 Tage vor den Terminen</strong> nicht mehr
              ein. Bei <strong>harten Kontaktlinsen</strong> beträgt der
              Zeitraum <strong>1 Woche</strong> bei
              <strong>Nacht- bzw. Ortho-K Linsen 1 Monat</strong>.
            </p>
          )
        },
        {
          title: 'Brille',
          text: (
            <p>
              Falls Sie eine Brille besitzen, bringen Sie diese bitte zu dem
              Termin mit, damit wir die Sehstärken entsprechend vergleichen
              können.
            </p>
          )
        },

        {
          title: 'Sonnenbrille mitbringen',
          text: (
            <p>
              Um Ihre Augen zu schonen, empfehlen wir nach der augenärztlichen
              Untersuchung eine <strong>Sonnenbrille zu tragen</strong>.
            </p>
          )
        },
        {
          title: 'Bei Anreise mit dem Auto',
          text: (
            <p>
              Sollten Sie mit dem <strong>Auto anreisen</strong>, bitten wir
              Sie, für die Rückfahrt eine{' '}
              <strong>
                Begleitperson mitzubringen (beachten Sie hierbei jedoch unten
                stehenden Hinweis)
              </strong>
              , da Sie pupillenerweiternde Augentropfen erhalten werden.
            </p>
          )
        },
        {
          title: 'Begleitperson(en)',
          text: (
            <p>
              Als Schutzmaßnahme zur Eindämmung der COVID-19 Pandemie bitten wir{' '}
              <strong>
                Ihre Begleitperson(en), außerhalb unserer Räumlichkeiten zu
                warten
              </strong>
              . Dadurch können wir die Anzahl der Personen in unseren
              Warteräumen so gering wie möglich halten.
            </p>
          )
        },
        {
          title: '3G-Regel',
          text: (
            <p>
              Bitte beachten Sie, dass wir aufgrund der derzeitigen besonderen
              Situation der <strong>„3G“-Regel Folge leisten müssen</strong>.
              Demnach müssen Sie für einen Besuch bei Lasik Care entweder…{' '}
              <br></br> <strong>a)…einen Impf-Nachweis vorlegen</strong> (gilt
              ab dem 15. Tag nach der Zweitimpfung), <br></br>
              <strong>b)…oder einen Genesenen-Nachweis</strong> vorweisen, der
              nicht älter als 6 Monate, aber mindestens 28 Tage alt ist,{' '}
              <br></br> <strong>c)…oder einen negativen Corona-Test</strong> mit
              offiziellem Nachweis einer Teststation mitbringen, der nicht älter
              als 24 Stunden (Schnelltest) bzw. nicht älter als 48 Stunden (PCR)
              ist.
            </p>
          )
        }
      ]
    },
    VIDEO: {
      h3: 'Wie es weiter geht',
      ul: [
        {
          title: 'Terminbestätigung',
          text: (
            <p>
              Sie erhalten in kurze eine automatisierte E-Mail mit der
              Zusammenfassung der Termininformationen und dem Zugangslink.{' '}
              <br></br>
              <span style={{ fontWeight: 'bold', color: '#00619e' }}>
                Bitte überprüfen Sie den Eingang der E-Mail in Ihrem Posteingang
                oder Spam-Ordner
              </span>
            </p>
          )
        },

        {
          title: 'Für Terminänderung ',
          text: (
            <p>
              Um Ihren Termin zu ändern oder zu stornieren, rufen Sie uns gerne
              an: <a href={'tel:00498954888894250'}>+49 89 54 8888 94 250</a>{' '}
              oder schreiben sie uns unter:{' '}
              <a href={'mailto:info@lasikcare.de'}>info@lasikcare.de</a>
            </p>
          )
        }
      ]
    }
  }

  /**
   *  Setear nueva ciudad en el localStorage
   * 	Borrar el localStorage temporal
   * 	Borrar el estado de appointment
   *
   */

  useEffect(() => {
    window.dataLayer.push({
      event: 'virtual-pageview',
      ga_pagepath: '/online-termine/thank-you',
      clinic_id: appointment.city.keycli,
      clinic_name: appointment.city.clinica,
      clinic_address: appointment.city.address,
      appointment_date: appointment.calendar_date
        .locale('de')
        .format('YYYY-MM-DD'),
      appointment_hour: moment(
        appointment.calendar_hour.horaInicio,
        'HH:mm'
      ).format('HH:mm'),
      appointment_id: '12547895', // Internal Appointment Save ID,
      appointment_location_type:
        appointment.type === 'VIDEO' ? 'Zu Hause' : 'Von Ort',
      appointment_type: appointment.type
    })

    setCityInStorage(appointment.city)
    setAppointmentType(appointment.type)
    setUserEmail(appointment.clientData.email)
    clearTempCities()
    clearReduxAppointmentState()
    // eslint-disable-next-line
  }, [])

  /**
   * @see setChildrenInfo
   */

  useEffect(() => {
    if (appointment.calendar_hour && appointment.calendar_date) {
      setChildrenInfo()
    }
    // eslint-disable-next-line
  }, [appointment])

  /**
   * Setea la información que recibirá el appointment summary
   */

  const setCityInStorage = newCity =>
    localStorage.setItem('cities', JSON.stringify(newCity))

  /**
   * Limpia las ciudades temporales del storage
   */

  const clearTempCities = () => localStorage.removeItem('tempCities')

  /**
   * Limpia el estado de redux
   */

  const clearReduxAppointmentState = () => properties.clearAppointment()

  const setChildrenInfo = () => {
    const hour = moment(appointment.calendar_hour.horaInicio, 'HH:mm')
    const formattedHour = hour.format('HH:mm')

    const children = [
      {
        imgSource: locationUbi,
        text: appointment.city.clinica
      },

      {
        imgSource: calendarUbi,
        text: appointment.calendar_date.locale('de').format('dddd, DD.MM')
      },
      {
        imgSource: timeUbi,
        text: formattedHour
      }
    ]

    if (appointment.type === 'VIDEO') {
      children.shift()
    }

    setChildren(children)
  }
  const thankYouTexts = {
    BI: 'Unverbindliches Informationsgespräch',
    BIDI:
      'Unverbindliches Informationsgespräch + Ärltliche Voruntersuchung (ca. 50€)',
    VIDEO: 'Online Video Beratung'
  }

  return (
    <div className='wrapper-general change-width'>
      <CardContainer>
        <div className='thank-you-message'>
          <div>
            <img
              src={
                process.env.NODE_ENV === 'development'
                  ? iconThanks
                  : IMAGES_SERVER + iconThanks
              }
              alt='Thank you logo'
            />
          </div>
          <h3>Vielen Dank</h3>
          <p>
            Ihr Terminwusch für{' '}
            <strong> {thankYouTexts[appointmentType]} </strong> ist bei uns
            eingegangen. Wir haben Ihnen eine Bestätigung an
            <strong> {userEmail} </strong>
            gesendet.
          </p>
        </div>
      </CardContainer>

      <div className='flex-desktop'>
        <div className='appointment-summary'>
          <CardContainer isColumn={true}>
            <h3>{thankYouTexts[appointmentType]}</h3>

            <div className='summary-icon'>
              {children &&
                children.map((child, index) => {
                  return (
                    <div className='child' key={index}>
                      <img
                        src={
                          process.env.NODE_ENV === 'development'
                            ? child.imgSource
                            : IMAGES_SERVER + child.imgSource
                        }
                        alt='...'
                      />
                      <p>{child.text}</p>
                    </div>
                  )
                })}
            </div>
          </CardContainer>
        </div>

        <div className='wrapper-instructions'>
          {<h2>{info[appointmentType]?.h3}</h2>}
          {
            <CardContainer>
              {info[appointmentType]?.ul.map((item, index) => {
                return (
                  <div className='instructions' key={index}>
                    <div className='info-item'>
                      <h5>
                        {' '}
                        <span className='dot'>
                          <span className='inner-dot'>{index + 1}</span>
                        </span>{' '}
                        {item.title}
                      </h5>
                      {item.text}
                    </div>
                  </div>
                )
              })}
            </CardContainer>
          }
        </div>
      </div>
    </div>
  )
}

/**
 *
 * @param {Function} dispatch
 * @description Transforma las acciones de redux en props
 *
 */

const mapDispatchToProps = dispatch => {
  return {
    /**
     *
     * @param {String} property  Propiedad del estado que se debe actualizar
     * @param {String || Object || number} data Datos con los que se actualizará la propiedad anterior
     * @description Actualiza un campo del objeto de appointment
     */
    setAppoinmentConfig: (property, data) =>
      dispatch(setAppoinmentConfig(property, data)),

    /**
     * Limpia el estado de Redux del appointment
     */

    clearAppointment: () => dispatch(clearAppointment())
  }
}

const mapStateToProps = state => ({
  appointment: state.appointment
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThankAppointmentPage)
