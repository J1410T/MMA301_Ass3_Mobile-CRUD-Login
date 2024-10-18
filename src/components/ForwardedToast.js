import React, { forwardRef } from "react";
import Toast from "react-native-toast-message";

const ForwardedToast = React.forwardRef((props, ref) => {
  return <Toast ref={ref} {...props} />;
});

export default ForwardedToast;
