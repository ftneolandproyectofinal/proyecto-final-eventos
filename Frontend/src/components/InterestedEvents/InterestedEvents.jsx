import { useEffect, useState } from "react";
import { getUserById } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { Button, Divider, Box, useColorModeValue } from "@chakra-ui/react";
import { useAuth } from "../../context/authContext";

export const InterestedEvents = () => {
  const { user } = useAuth();
  const [interestedEvents, setInterestedEvents] = useState([{}]);
  const bg = useColorModeValue("#f6f3e0ee", "#173F4Bee");
  const bgver = useColorModeValue("teal", "teal");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(user._id);
        if (response.status === 200)
          setInterestedEvents(response.data.data.eventsInterested);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchData();
  }, [user._id]);
  //Comentado en caso de que queramos poner los botones de navegación
  // const next =
  //   "https://res.cloudinary.com/dhr13yihn/image/upload/v1694703917/arrow-left-3099_qst1pk.svg";
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: () => nextIndex(),
    onSwipedRight: () => preIndex(),
  });
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        nextIndex();
      }
    }, 3000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const nextIndex = () => {
    activeIndex < interestedEvents.length - 1
      ? setActiveIndex(activeIndex + 1)
      : setActiveIndex(0);
  };

  const preIndex = () => {
    activeIndex == 0
      ? setActiveIndex(interestedEvents.length - 1)
      : setActiveIndex(activeIndex - 1);
  };
  return interestedEvents?.length ? (
    <Box bg={bg} color={color}>
      <div
        {...handlers}
        className="generalContainer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/*comentado en caso de que queramos poner los botones de navegación */}
        {/* <div className="buttonsScrollContainer">
          <button
            onClick={() => {
              preIndex();
            }}
          >
            <img
              className="imagePrevious"
              src={next}
              alt="button to the previous image"
            />
          </button> */}
        <h1 className="imageName" style={{ backgroundColor: bg }}>
          Eventos que te interesan
        </h1>
        <div
          className="inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {interestedEvents.length &&
            interestedEvents.map((event, index) => (
              <div
                key={index}
                className="imageOuterContainer"
                style={
                  index === interestedEvents.length - 1
                    ? { position: "relative" }
                    : null
                }
              >
                <div className="imageInnerContainer">
                  <img className="image" src={event.image} />
                  <section
                    className="sectionImage"
                    style={{ backgroundColor: bg }}
                  >
                    <h2 className="imageName imageTitle">{event.name}</h2>
                    <Button
                      bg={bgver}
                      onClick={() => navigate(`/eventdetail/${event._id}`)}
                      _hover={{
                        transform: "scale(1.1)",
                      }}
                      box-shadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
                    >
                      VER EVENTO
                    </Button>
                  </section>
                </div>
              </div>
            ))}
        </div>
        {/* <button onClick={() => nextIndex()}>
            <img
              className="imageNext"
              src={next}
              alt="button to the next image"
            />
          </button>
        </div> */}
        <div className="setActiveIndexOuterDiv">
          <div className="setActiveIndexInnerDiv">
            {/* {events.map((element, index) => {
              index == activeIndex ? (
                <span
                  className="spanActive activeImg"
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                ></span>
              ) : (
                <span
                  className="spanActive"
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                ></span>
              );
            })} */}
            {interestedEvents.map((element, index) => {
              if (index == activeIndex) {
                return (
                  <span
                    key={index}
                    className="spanActive activeImg"
                    onClick={() => {
                      setActiveIndex(index);
                    }}
                  ></span>
                );
              } else {
                return (
                  <span
                    key={index}
                    className="spanActive"
                    onClick={() => {
                      setActiveIndex(index);
                    }}
                  ></span>
                );
              }
            })}
          </div>
        </div>
      </div>
      <Divider border={`1.2px solid ${color}`} />
    </Box>
  ) : (
    <></>
  );
};
