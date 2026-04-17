import { useState } from "react";
import { AlertComponent, AlertContext } from "./components";
import Router from "./routers/router";

function App() {

  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: '',
    autoHideTime: 5000
  });

  const showAlert = ({message, severity="success", autoHideTime=5000}) => {
    setAlert({open: false, message: '', severity: 'success', autoHideTime: 5000})
    setTimeout(() => {
      setAlert({ open: true, message, severity, autoHideTime })
    })
  }

  return (
    <div className="App">

      <AlertContext.Provider value={{showAlert}}>
        <Router/>
      </AlertContext.Provider>      

      <AlertComponent
        key={alert.message + alert.autoHideTime}
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        autoHideTime={alert.autoHideTime}
      />

    </div>
  );
}

export default App;
