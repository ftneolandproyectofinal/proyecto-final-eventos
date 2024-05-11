import { Heading, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import useWidth from "../../hooks/useWidth";

export const Countdown = ({ date }) => {
  const bgh = useColorModeValue("#b6e9e984", "#173F4Baa");
  const colorh = useColorModeValue("black", "#F4FAFF");
  const [time, setTime] = useState("");
  const { width } = useWidth();
  let countDownDate = new Date(date).getTime();
  let x = setInterval(() => {
    let now = new Date().getTime();

    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTime(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

    if (distance < 0) {
      clearInterval(x);
      setTime("Evento finalizado");
    }
  }, 1000);
  return (
    <Heading
      fontSize={width < 500 ? "8px" : width < 650 ? "11px" : "17px"}
      bg={bgh}
      color={colorh}
      size="lg"
      rounded="7"
      position="absolute"
      p="10px"
      bottom="0"
      right="0"
      m="2"
    >
      {time}
    </Heading>
  );
};
