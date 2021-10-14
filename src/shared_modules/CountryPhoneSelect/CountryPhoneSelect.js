import React from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";

const CountryPhoneSelect = ({ value, onChange, labels, ...rest }) => {
	return (
		<select {...rest} onChange={(event) => onChange(event.target.value || undefined)}>
			{getCountries().map((country) => (
				<option value={country} key={country}>
					{labels[country]} + {getCountryCallingCode(country)}
				</option>
			))}
		</select>
	);
};

export default CountryPhoneSelect;
