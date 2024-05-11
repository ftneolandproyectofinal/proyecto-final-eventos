import { useEffect, useState } from "react";
import { getOrgById } from "../../services/org.service";
import { useOrgAuth } from "../../context/authOrgContext";

export const useIsEmptyOrg = () => {
  const { organization } = useOrgAuth();
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrgById(organization?._id);

        if (response.events.length == 0) {
          setIsEmpty(true);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchData();
  }, [organization?._id]);

  return isEmpty;
};
