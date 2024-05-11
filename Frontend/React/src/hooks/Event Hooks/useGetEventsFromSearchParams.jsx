import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllEvents, getEventByName } from "../../services/event.service";

export const useGetEventsFromSearchParams = () => {
  const [eventData, setEventData] = useState();
  const { name } = useParams();
  const getAll = useCallback(async () => {
    const eventDataResponse = await getAllEvents();
    setEventData(eventDataResponse);
  }, [setEventData]);

  const getByName = useCallback(
    async (name) => {
      const eventDataResponse = await getEventByName(name);
      setEventData(eventDataResponse);
    },
    [setEventData],
  );

  useEffect(() => {
    name ? getByName(name) : getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  return eventData;
};
