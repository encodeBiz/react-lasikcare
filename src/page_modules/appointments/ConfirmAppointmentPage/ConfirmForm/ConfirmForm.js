import React from "react";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";
import InputBlock from "../../../../shared_modules/InputBlock/InputBlock";
import ErrorDialog from "../../../../shared_modules/ErrorDialog/ErrorDialog";
import "./ConfirmForm.scss";
import CardContainer from "../../../../shared_modules/CardContainer/CardContainer";
import Button from "../../../../shared_modules/Button/Button";

/**
 *
 * @param {Object} properties
 * @param {Function} properties.handleSubmit
 * @param {String} properties.errorMessage
 * @param {Function} properties.setErrorMessage
 *
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

	const appointmentValues = properties.appointmentValues

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
						console.log(props.initialValues)
						return (
							<Form onSubmit={props.handleSubmit}>
								{/* Grupo de edad */}
								<CardContainer isColumn={true}>
									<div className="container-form">
									<div className="inline-form-group marg-from">
										<div className="form-group" onClick={clearErrors}>
											<label htmlFor="ageGroup">

												<Field as="select" name="ageGroup">
												    <option  defaultValue disabled>Altersgruppe</option>
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

												<Field as="select" name="gender">
												    <option value="" defaultValue disabled>Geschlecht</option>
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
												label=""
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
												// label="Nachnamen"
												placeholder="Nachnamen"
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
										<InputBlock
											// label="Telefonnumber"
											placeholder="Telefonnumber"
											values={props.values.phoneNumber}
											handleBlur={props.handleBlur}
											handleChange={props.handleChange}
											paramChange="phoneNumber"
											paramBlur="phoneNumber"
											type={"text"}
										/>

										{props.touched.phoneNumber && props.errors.phoneNumber ? (
											<ErrorDialog text={props.errors.phoneNumber} />
										) : null}
									</div>
									{/* Email */}

									<div className="form-group full-width  marg-from" onClick={clearErrors}>
										<InputBlock
											// label="Email adresse"
											placeholder="Email adresse"
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
											// label="Nachricht"
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
													value={props.values.accepted}
													// checked={props.values.accepted}
													onChange={(e) => props.handleChange(e.target.value)}
													onBlur={props.handleBlur}
												/>
												<span>
													Mit Klick auf <span>"Jetzt Termin vereinbaren"</span> bestätige ich die
													Datenschutzbestimmungen der CARE Vision Germany GmbH
												</span>
											</label>
										</div>
									</div>
									</div>
								</CardContainer>
								<div className="container-button">

								    <Button
									type={"rounded-button"}
									label={"JETZT TERMIN VEREINBAREN"}
									action={props.handleSubmit}
									disabled={!props.isValid}
								   />
								   
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
