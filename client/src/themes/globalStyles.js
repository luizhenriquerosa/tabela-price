import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

	body, #root {
		width: 100%;
		height: 100vh;
		background-color: var(--color-primary)
	}

	.container {
		overflow-y: auto;
	}
`;

export default GlobalStyles;
