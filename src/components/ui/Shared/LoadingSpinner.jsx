import { Loader2 } from "lucide-react";
import React from "react";

const LoadingSpinner = ({ size = 24, className = "" }) => {
  return (
    <Loader2
      className={`animate-spin text-muted-foreground ${className}`}
      width={size}
      height={size}
    />
  );
};

export default LoadingSpinner;