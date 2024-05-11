import { useEffect, useState } from "react";
import { nextEvents } from "../../services/user.service";

const useCheckNextEvents = () => {
  const [events, setEvents] = useState([{}]);

  useEffect(() => {
    const getFutureEvents = async () => {
      const res = await nextEvents();
      if (res.status === 200) setEvents(res.data.data);
    };
    getFutureEvents();
  }, []);
  return events;
};

export default useCheckNextEvents;
