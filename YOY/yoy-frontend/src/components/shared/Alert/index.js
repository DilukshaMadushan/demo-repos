import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Fragment, useEffect } from "react";
import Collapse from "@material-ui/core/Collapse";
import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";

const Alert = props => {
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
                horizontal: "center",
              },

              TransitionComponent: Collapse,
            })}
          </div>
        ));
    }
  }, [props.alerts]);

  return (
    <SnackbarProvider
      autoHideDuration={5000}
      preventDuplicate
      ref={providerRef}
      maxSnack={2}
    >
      {props.children}
    </SnackbarProvider>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
