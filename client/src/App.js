import Router from "./services/router";
import GlobalStyles from "./themes/globalStyles";
import { toast, Flip } from "react-toastify";
import { ToastMessageContainer } from "./components/ToastMessage";

function App() {
  return (
    <>
      <ToastMessageContainer
        transition={Flip}
        autoClose={3000}
        position={toast.POSITION.TOP_RIGHT}
      />
      <GlobalStyles />
      <Router></Router>
    </>
  );
}

export default App;
