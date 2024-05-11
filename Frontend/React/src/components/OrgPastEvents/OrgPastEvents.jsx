import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { Button, Box, useColorModeValue, DarkMode } from "@chakra-ui/react";
import { useOrgAuth } from "../../context/authOrgContext";
import { useAuth } from "../../context/authContext";
import { getPastEventsfromOrg } from "../../services/org.service";

export const OrgPastEvents = () => {
  const bg = useColorModeValue("#f6f3e0ee", "#173F4Bee");
  const bgver = useColorModeValue("teal", "teal");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  const { organization } = useOrgAuth();
  const { user } = useAuth();
  const [events, setEvents] = useState([{}]);
  const organizationId = useParams();
  useEffect(() => {
    const getOldEvents = async () => {
      if (organization) {
        const res = await getPastEventsfromOrg(organization._id);
        setEvents(res);
      } else {
        const res = await getPastEventsfromOrg(organization.id);
        setEvents(res);
      }
    };
    getOldEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization, organization?._id, organizationId?.id]);

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
    <Box bg={bg} color={color}>
      <div
        {...handlers}
        className="generalContainer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
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
                  <DarkMode>
                    <section
                      className="sectionImage"
                      style={{ backgroundColor: bg }}
                    >
                      <h2 className="imageName">{event.name}</h2>
                      {organization ? (
                        <Button
                          bg={bgver}
                          onClick={() =>
                            navigate(`/eventdetailorg/${event._id}`)
                          }
                          _hover={{
                            transform: "scale(1.1)",
                          }}
                          box-shadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
                        >
                          VER EVENTO
                        </Button>
                      ) : (
                        user && (
                          <Button
                            bg={bgver}
                            onClick={() =>
                              navigate(`/eventdetail/${event._id}`)
                            }
                            _hover={{
                              transform: "scale(1.1)",
                            }}
                            box-shadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
                          >
                            VER EVENTO
                          </Button>
                        )
                      )}
                    </section>
                  </DarkMode>
                </div>
              </div>
            ))}
        </div>
        <div className="setActiveIndexOuterDiv">
          <div className="setActiveIndexInnerDiv">
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
    </Box>
  ) : (
    <></>
  );
};
