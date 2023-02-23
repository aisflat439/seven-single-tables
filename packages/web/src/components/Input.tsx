import React from "react";

export const Input = React.forwardRef<HTMLInputElement>((props, ref) => {
  return <input {...props} ref={ref} className="p-2 mx-2" />;
});
