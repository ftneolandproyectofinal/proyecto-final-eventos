import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { useOrgAuth } from "../../context/authOrgContext";
import { getPastEventsfromOrg } from "../../services/org.service";

export const OrgPastEvents = () => {
  const bg = useColorModeValue("#ebeceecc", "#1a202ccc");
  const { organization } = useOrgAuth();
  const [events, setEvents] = useState([{}]);

  useEffect(() => {
    const getOldEvents = async () => {
      const res = await getPastEventsfromOrg(organization._id);
      setEvents(res);
    };
    getOldEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    activeIndex < events.length - 1
      ? setActiveIndex(activeIndex + 1)
      : setActiveIndex(0);
  };

  const preIndex = () => {
    activeIndex == 0
      ? setActiveIndex(events.length - 1)
      : setActiveIndex(activeIndex - 1);
  };
  return events.length > 0 ? (
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
        Eventos pasados
      </h1>
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {events.length &&
          events.map((event, index) => (
            <div
              key={index}
              className="imageOuterContainer"
              style={
                index === events.length - 1 ? { position: "relative" } : null
              }
            >
              <div className="imageInnerContainer">
                <img className="image" src={event.image} />
                <section
                  className="sectionImage"
                  style={{ backgroundColor: bg }}
                >
                  <h2 className="imageName">{event.name}</h2>
                  <Button
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
          {events.map((element, index) => {
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
  ) : (
    <h2>No hay eventos pasados</h2>
  );
};