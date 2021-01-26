import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		border: 0;
		box-sizing: border-box;
	}

  html,
  body, #root {
    height: 100vh;
		width: 100%;
	}
	
  body {
		-webkit-font-smoothing: antialiased;
	}
`;

export default GlobalStyles;
