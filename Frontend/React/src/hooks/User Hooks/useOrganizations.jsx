import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { getUserById } from "../../services/user.service";

const useOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(user._id);
        setOrganizations(response.data.data.organizationsFav);
      } catch (error) {
        console.error("Error al obtener el user", error);
      }
    };

    fetchData();
  }, [user._id]);

  return organizations;
};

export default useOrganizations;
