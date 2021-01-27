import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";

const GlobalStyles = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		border: 0;
		box-sizing: border-box;
		font-family: Poppins;

		--color-primary: #41d3bd;
		--color-secondary: #21247f;

		--font-color-primary: #2c3236;
	}

	button, input {
		&:active, &:focus {
			outline: 0;
		}
	}
`;

export default GlobalStyles;
