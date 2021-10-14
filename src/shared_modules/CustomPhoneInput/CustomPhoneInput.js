import PhoneInput from "react-phone-number-input";

const CustomPhoneInput = ({ input }) => {
	return <PhoneInput value={input.value.value} onChange={(e) => e !== undefined ? input.handleChange(e) : null} />;
};

export default CustomPhoneInput;
