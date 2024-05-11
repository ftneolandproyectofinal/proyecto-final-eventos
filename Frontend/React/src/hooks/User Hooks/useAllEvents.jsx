import { useEffect, useState } from "react";
import { getUserById } from "../../services/user.service";
import { useAuth } from "../../context/authContext";

const useAllEventsLiked = () => {
  const [allEventsLiked, setAllEventsLiked] = useState([{}]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(user?._id);
        if (response.status === 200)
          setAllEventsLiked(response?.data?.data?.eventsInterested);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchData();
  }, [user?._id]);

  return allEventsLiked;
};

export default useAllEventsLiked;
