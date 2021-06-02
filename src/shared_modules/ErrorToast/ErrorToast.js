import React, { useEffect, useState } from "react";
import "./ErrorToast.scss";
import { connect } from "react-redux";
import { deleteError } from "../../redux/errors/errors.actions";
import { errorMessages } from "../../constants/errorMessages";

/**
 *
 * @param {any} children
 * @param {Object} text
 *
 */

const ErrorToast = (properties) => {
	const [errorMessage, setErrorMessage] = useState("");


	useEffect(() => {
		if (isNaN(properties.error.error)) {
			setErrorMessage("Server error");
		} else {
			setErrorMessage(errorMessages[properties.error.error]);
		}
		setTimeout(() => {
			properties.deleteError();
		}, 5000);
		// eslint-disable-next-line
	}, [properties.error.error]);

	const clearError = () => properties.deleteError();

	return (
		<div className="snackbar visible">
			<div className="snackbar-content">
				{properties.children}
				{/* <p className="snackbar-message">{properties.text}</p> */}
				<p className="snackbar-message">{errorMessage}</p>
			</div>
			<button className="close-button" onClick={clearError} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	error: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
	/**
	 *
	 * @param {Object} error
	 */

	deleteError: (error) => dispatch(deleteError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorToast);
