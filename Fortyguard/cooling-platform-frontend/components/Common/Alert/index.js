import React, { useEffect } from "react";
import Collapse from "@material-ui/core/Collapse";
import { SnackbarProvider } from "notistack";

//Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = (props) => {
  const providerRef = React.useRef();

  useEffect(() => {
    {
      props.alerts != null &&
        props.alerts.map((alert, id) => (
          <div key={id}>
            {providerRef.current.enqueueSnackbar(alert.msg, {
              variant: alert.alertType,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },

              TransitionComponent: Collapse,
            })}
          </div>
        ));
    }
  }, [props.alerts]);

  return (
    <SnackbarProvider
      autoHideDuration={3000}
      preventDuplicate
      ref={providerRef}
      maxSnack={4}
    >
      {props.children}
    </SnackbarProvider>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
