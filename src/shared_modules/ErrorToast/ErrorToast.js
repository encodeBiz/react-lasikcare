import React, { useEffect } from "react";
import "./ErrorToast.scss";
import { connect } from "react-redux";
import { deleteError } from "../../redux/errors/errors.actions";

/**
 *
 * @param {any} children
 * @param {Object} text
 *
 */

const ErrorToast = (properties) => {
	useEffect(() => {

		setTimeout(() => {
		    properties.deleteError();
		}, 5000);
		// eslint-disable-next-line
	}, []);

	const clearError = () => properties.deleteError();

	return (
		<div className="snackbar visible">
			<div className="snackbar-content">
				{properties.children}
				{/* <p className="snackbar-message">{properties.text}</p> */}
				<p className="snackbar-message">{properties.error.error}</p>
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
