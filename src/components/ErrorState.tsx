import type React from "react";

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="error-state">
      <span className="error-icon">⚠️</span>
      <p>{message}</p>
    </div>
  );
};

export default ErrorState;
