import { useEffect, useState } from "react";
import { getUserById } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import {
  Button,
  Divider,
  Box,
  useColorModeValue,
  DarkMode,
} from "@chakra-ui/react";
import { useAuth } from "../../context/authContext";

export const OrganizationsFav = () => {
  const { user } = useAuth();
  const [organizationsFav, setOrganizationsFav] = useState([{}]);
  const bg = useColorModeValue("#f6f3e0ee", "#173F4Bee");
  const bgver = useColorModeValue("teal", "teal");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(user._id);
        if (response.status === 200)
          setOrganizationsFav(response.data.data.organizationsFav);
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
    activeIndex < organizationsFav.length - 1
      ? setActiveIndex(activeIndex + 1)
      : setActiveIndex(0);
  };

  const preIndex = () => {
    activeIndex == 0
      ? setActiveIndex(organizationsFav.length - 1)
      : setActiveIndex(activeIndex - 1);
  };
  return organizationsFav.length ? (
    <Box bg={bg} color={color} p="12">
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
          Organizaciones favoritas
        </h1>
        <div
          className="inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {organizationsFav.length &&
            organizationsFav.map((organization, index) => (
              <div
                key={index}
                className="imageOuterContainer"
                style={
                  index === organizationsFav.length - 1
                    ? { position: "relative" }
                    : null
                }
              >
                <div className="imageInnerContainer">
                  <img className="image" src={organization.image} />
                  <section
                    className="sectionImage"
                    style={{ backgroundColor: bg }}
                  >
                    <h2 className="imageName">{organization.name}</h2>
                    <DarkMode>
                      <Button
                        bg={bgver}
                        onClick={() =>
                          navigate(`/or_ganizationdetail/${organization._id}`)
                        }
                        _hover={{
                          transform: "scale(1.1)",
                        }}
                        box-shadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
                      >
                        VER ORGANIZACIÓN
                      </Button>
                    </DarkMode>
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
            {organizationsFav.map((element, index) => {
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
