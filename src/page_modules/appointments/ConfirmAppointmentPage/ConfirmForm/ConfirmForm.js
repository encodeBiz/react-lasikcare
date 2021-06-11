import React from "react";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";
import InputBlock from "../../../../shared_modules/InputBlock/InputBlock";
import ErrorDialog from "../../../../shared_modules/ErrorDialog/ErrorDialog";
import "./ConfirmForm.scss";
import CardContainer from "../../../../shared_modules/CardContainer/CardContainer";
import Button from "../../../../shared_modules/Button/Button";
import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
import de from "react-phone-number-input/locale/de";

/**
 *
 * @param {Object} properties
 * @param {Function} properties.handleSubmit
 * @param {String} properties.errorMessage
 * @param {Function} properties.setErrorMessage
 *
 */

const ConfirmForm = (properties) => {
	const validationSchema = yup.object({
		ageGroup: yup.string(),
		gender: yup.string(),
		name: yup.string().required("Dieses Feld wird benötigt"),
		surname: yup.string().required("Dieses Feld wird benötigt"),
		phoneNumber: yup.string().required("Dieses Feld wird benötigt"),
		email: yup.string().email("ungültige E-Mail").required("Dieses Feld wird benötigt"),
		message: yup.string().max(140),
		accepted: yup.boolean().required(),
	});

	/**
	 * Borrar mensajes de error cuando se pulse en un form-group
	 */

	const clearErrors = () => {
		if (properties.errorMessage) {
			if (properties.errorMessage) {
				properties.setErrorMessage(null);
			}
		}
	};

	const appointmentValues = properties.appointmentValues;

	return (
		<>
			<div className="form-summary">
				<h2>Ihre Kontaktdaten</h2>
				<Formik
					validationSchema={validationSchema}
					initialValues={{
						ageGroup: appointmentValues.ageGroup,
						gender: appointmentValues.gender,
						name: appointmentValues.name,
						surname: appointmentValues.surname,
						phoneNumber: appointmentValues.phoneNumber,
						email: appointmentValues.email,
						message: appointmentValues.message,
						accepted: appointmentValues.accepted,
					}}
					onSubmit={async (values, actions) => {
						await properties.handleSubmit(values);
					}}
					validateOnChange={false}
				>
					{(props) => {
						console.log(props.values);
						return (
							<Form onSubmit={props.handleSubmit}>
								{/* Grupo de edad */}
								<CardContainer isColumn={true}>
									<div className="container-form">
										<div className="inline-form-group marg-from">
											<div className="form-group" onClick={clearErrors}>
												<label htmlFor="ageGroup">
													<Field
														as="select"
														name="ageGroup"
														className={props.values.ageGroup ? "option-valid" : "option-not-valid"}
													>
														<option value="" defaultValue disabled>
															Altersgruppe
														</option>
														<option value={"lessThan50"}>weniger als 50 </option>
														<option value={"moreThan50"}>50 +</option>
													</Field>
												</label>
												{props.touched.ageGroup && props.errors.ageGroup ? (
													<ErrorDialog text={props.errors.ageGroup} />
												) : null}
											</div>

											{/* Genero */}

											<div className="form-group  marg-from" onClick={clearErrors}>
												<label htmlFor="gender">
													<Field
														as="select"
														name="gender"
														className={props.values.gender ? "option-valid" : "option-not-valid"}
													>
														<option value="" defaultValue disabled>
															Anrede
														</option>
														<option value={"woman"}>Frau</option>
														<option value={"man"}>Mann</option>
													</Field>
												</label>
												{props.touched.gender && props.errors.gender ? (
													<ErrorDialog text={props.errors.gender} />
												) : null}
											</div>
										</div>
										{/* Nombre */}

										<div className="inline-form-group  marg-from">
											<div className="form-group" onClick={clearErrors}>
												<InputBlock
													placeholder="Vorname"
													values={props.values.name}
													handleBlur={props.handleBlur}
													handleChange={props.handleChange}
													paramChange="name"
													paramBlur="name"
													type={"text"}
												/>

												{props.touched.name && props.errors.name ? (
													<ErrorDialog text={props.errors.name} />
												) : null}
											</div>

											{/* Apellidos */}

											<div className="form-group  marg-from" onClick={clearErrors}>
												<InputBlock
													placeholder="Nachname"
													values={props.values.surname}
													handleBlur={props.handleBlur}
													handleChange={props.handleChange}
													paramChange="surname"
													paramBlur="surname"
													type={"text"}
												/>

												{props.touched.surname && props.errors.surname ? (
													<ErrorDialog text={props.errors.surname} />
												) : null}
											</div>
										</div>
										{/* Teléfono */}

										<div className="form-group full-width  marg-from full" onClick={clearErrors}>
											<label>Telefonnummer</label>
											<PhoneInput
												countryCallingCodeEditable={false}
												placeholder={"Telefonnummer"}
												value={props.values.phoneNumber}
												onChange={(e) => {
													return e !== undefined ? (props.values.phoneNumber = e) : null;
												}}
												defaultCountry="DE"
												// withCountryCallingCode={true}
												country={false}
												labels={de}
												international
												countryOptionsOrder={["DE", "AT", "CH", "|", "..."]}
												smartCaret={false}
											/>

											{props.touched.phoneNumber && props.errors.phoneNumber ? (
												<ErrorDialog text={props.errors.phoneNumber} />
											) : null}
										</div>
										{/* Email */}

										<div className="form-group full-width  marg-from" onClick={clearErrors}>
											<InputBlock
												placeholder="E-Mail Adresse"
												values={props.values.email}
												handleBlur={props.handleBlur}
												handleChange={props.handleChange}
												paramChange="email"
												paramBlur="email"
												type={"text"}
											/>

											{props.touched.email && props.errors.email ? (
												<ErrorDialog text={props.errors.email} />
											) : null}
										</div>

										{/* Mensaje */}

										<div className="form-group full-width" onClick={clearErrors}>
											<InputBlock
												placeholder="Nachricht"
												values={props.values.message}
												handleBlur={props.handleBlur}
												handleChange={props.handleChange}
												paramChange="message"
												paramBlur="message"
												type={"textarea"}
											/>

											{props.touched.message && props.errors.message ? (
												<ErrorDialog text={props.errors.message} />
											) : null}
										</div>

										<div className="form-group">
											<div className="checkbox">
												<label htmlFor="accepted">
													<input
														type="checkbox"
														id="accepted"
														value={props.values.accepted}
														onChange={(e) => props.handleChange(e.target.value)}
														onBlur={props.handleBlur}
													/>
													<a
														href="https://www.lasikcare.de/datenschutz/"
														target="_blank"
														rel="noreferrer"
													>
														Datenschutzbestimmungen akzeptieren
													</a>
												</label>
											</div>
										</div>
									</div>
								</CardContainer>
								<div className="container-button">
									<div 
										className = {'main-btn'}
										onClick = {props.isValid ? props.handleSubmit : ()=>{}}
									>
									JETZT TERMIN VEREINBAREN
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</>
	);
};

export default ConfirmForm;
