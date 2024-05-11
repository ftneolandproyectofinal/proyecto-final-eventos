import { Navigate } from "react-router-dom";
import { useOrgAuth } from "../../context/authOrgContext";

export const ProtectedOrgCheckChildren = ({ children }) => {
  const { allOrganization, organization } = useOrgAuth();
  if (
    allOrganization?.data?.organization?.check == true ||
    organization?.check == true
  ) {
    return <Navigate to="/homeorg" />;
  }
  if (organization == null && allOrganization.data.confirmationCode === "") {
    return <Navigate to="/loginorg" />;
  }
  return children;
};
