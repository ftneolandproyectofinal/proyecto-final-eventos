import { useEffect, useState } from "react";
import { toggleLikedEvent } from "../../services/user.service";
import useAllEventsLiked from "./useAllEvents";

export const useEventLiked = (id) => {
  const events = useAllEventsLiked();
  const [isLoadingLiked, setIsLoadingLiked] = useState(true);
  const [isEventLiked, setIsEventLiked] = useState(
    events.some(({ _id }) => id === _id),
  );

  useEffect(() => {
    setIsLoadingLiked(false);

    setIsEventLiked(events.some(({ _id }) => id === _id));
  }, [events, id]);

  const handleToggleLiked = () => {
    setIsLoadingLiked(true);
    toggleLikedEvent(id).then(() => {
      setIsLoadingLiked(false);
      setIsEventLiked(() => !isEventLiked);
    });
  };
  return { isEventLiked, handleToggleLiked, isLoadingLiked };
};
