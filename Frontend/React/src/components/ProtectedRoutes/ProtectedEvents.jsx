import { Navigate } from "react-router-dom";
import { useOrgAuth } from "../../context/authOrgContext";

export const ProtectedEvents = ({ children }) => {
  const { organization } = useOrgAuth();
  if (organization) {
    return <Navigate to="/login" />;
  }

  return children;
};
