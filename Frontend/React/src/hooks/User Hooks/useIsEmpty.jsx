import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { getUserById } from "../../services/user.service";

export const useIsEmpty = () => {
  const { user } = useAuth();
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(user?._id);
        if (response.status === 200) {
          if (
            response.data.data.eventsAttend.length == 0 &&
            response.data.data.eventsInterested.length == 0 &&
            response.data.data.organizationsFav.length == 0
          ) {
            setIsEmpty(true);
          }
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchData();
  }, [user?._id]);

  return isEmpty;
};
