import { Navigate } from "react-router-dom";
import { useOrgAuth } from "../../context/authOrgContext";

export const ProtectedOrg = ({ children }) => {
  const { organization } = useOrgAuth();
  if (!organization || organization?.check == false) {
    return <Navigate to="/loginorg" />;
  }

  return children;
};
