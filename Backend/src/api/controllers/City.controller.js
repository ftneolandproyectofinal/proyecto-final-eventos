// Importación de funciones y modelos necesarios
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const City = require("../models/City.model");
const Comment = require("../models/Comment.model");
const Establishment = require("../models/Establishment.model");
const Event = require("../models/Event.model");
const Organization = require("../models/Organization.model");
const User = require("../models/User.model");

// Controlador para crear una nueva ciudad
const postCity = async (req, res, next) => {
  let catchCity = req.file?.path; // Captura la ruta de la imagen, si existe
  try {
    await City.syncIndexes(); // Sincroniza los índices de la colección City en la base de datos

    // Crear una nueva instancia de City con los datos recibidos
    const newCity = new City(req.body);

    // Establecer una imagen por defecto si no se proporciona ninguna
    if (req.file) {
      newCity.image = catchCity;
    } else {
      newCity.image =
        "https://res.cloudinary.com/dhr13yihn/image/upload/v1694193903/proyectoEventland/cityAssets/village_lfiuho.png";
    }

    // Guardar la instancia de City en la base de datos
    const savedCity = await newCity.save();

    // Manejo de la respuesta
    if (savedCity) {
      return res.status(200).json(savedCity);
    } else {
      return res.status(404).json("Couldn't save the city in the DB");
    }
  } catch (error) {
    // En caso de error, eliminar la imagen de Cloudinary (si existe) y pasar al siguiente middleware de manejo de errores
    req.file?.path && deleteImgCloudinary(catchCity);
    return next(error);
  }
};

// Controlador para obtener una ciudad por nombre
const getByNameCity = async (req, res, next) => {
  try {
    const { name = "" } = req.params;

    // Buscar todas las ciudades en la base de datos
    const cityByName = await City.find();

    // Filtrar las ciudades cuyos nombres incluyan el nombre proporcionado (insensible a mayúsculas/minúsculas)
    const filterCity = cityByName.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase()),
    );

    // Manejo de la respuesta
    if (filterCity.length > 0) {
      return res.status(200).json({ data: cityByName });
    } else {
      return res.status(404).json("Couldn't find the city");
    }
  } catch (error) {
    // En caso de error, pasar al siguiente middleware de manejo de errores
    return next(error);
  }
};

// Controlador para obtener todas las ciudades
const getAllCities = async (req, res, next) => {
  try {
    // Obtener todas las ciudades de la base de datos
    const allCities = await City.find();

    // Manejo de la respuesta
    if (allCities.length > 0) {
      return res.status(200).json({ data: allCities });
    } else {
      return res.status(404).json("cities not found");
    }
  } catch (error) {
    // En caso de error, pasar al siguiente middleware de manejo de errores
    return next(error);
  }
};

// Controlador para obtener una ciudad por ID
const getCityById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Obtener la ciudad por ID y popular los eventos, organizaciones y establecimientos asociados
    const cityById = await City.findById(id);
    if (cityById) {
      return res.status(200).json({
        data: await City.findById(id).populate(
          "events organizations establishment",
        ),
      });
    } else {
      res.status(404).json("city not found");
    }
  } catch (error) {
    // En caso de error, pasar al siguiente middleware de manejo de errores
    return next(error);
  }
};

const updateCity = async (req, res, next) => {
  try {
    const id = req.params.id;
    const city = await City.findById(req.params.id);
    if (city) {
      const customBody = {
        _id: city._id,
        image: req.file?.path ? req.file?.path : city.image,
        name: req.body?.name ? req.body?.name : city.name,
        country: req.body?.country ? req.body?.country : city.country,
        province: req.body?.province ? req.body?.province : city.province,
        community: req.body?.community ? req.body?.community : city.community,
      };
      await City.findByIdAndUpdate(id, customBody);
      if (req.file?.path) {
        deleteImgCloudinary(city.image);
      }

      const updateNewCity = await City.findById(id);
      const elementUpdate = Object.keys(req.body);
      let test = {};
      elementUpdate.forEach((item) => {
        if (req.body[item] == updateNewCity[item]) {
          test[item] = true;
        } else {
          test[item] = false;
        }
        if (req.file) {
          updateNewCity.image == req.file?.path
            ? (test = { ...test, file: true })
            : (test = { ...test, file: false });
        }
      });
      let acc = 0;
      for (let clave in test) {
        if (test[clave] == false) acc++;
      }

      if (acc > 0) {
        return res.status(404).json({
          dataTest: test,
          update: false,
        });
      } else {
        return res.status(200).json({
          dataTest: test,
          update: updateNewCity,
        });
      }
    } else {
      return res.status(404).json("City not found");
    }
  } catch (error) {
    return next(error);
  }
};

//!DELETE

const deleteCity = async (req, res, next) => {
  const { id } = req.params;
  try {
    const city = await City.findByIdAndDelete(id);
    if (city) {
      if (city.image) {
        deleteImgCloudinary(city.image);
      }
      try {
        await Event.updateMany({ city: id }, { $unset: { city: id } });
        try {
          await Establishment.updateMany(
            { city: id },
            { $unset: { city: id } },
          );
          try {
            await Comment.updateMany(
              { cityOfEvent: id },
              { $unset: { cityOfEvent: id } },
            );
            try {
              await Organization.updateMany(
                { city: id },
                { $unset: { city: id } },
              );
              try {
                await User.updateMany({ city: id }, { $unset: { city: id } });
                return res
                  .status(200)
                  .json({ message: "Ciudad eliminada exitosamente" });
              } catch (error) {
                return res.status(404).json("User not updated in field 'city'");
              }
            } catch (error) {
              return res
                .status(404)
                .json("Organization not updated in field 'city'");
            }
          } catch (error) {
            return res
              .status(404)
              .json("Comment not updated in field 'cityOfEvent'");
          }
        } catch (error) {
          return res
            .status(404)
            .json("Establishment not updated in field 'city'");
        }
      } catch (error) {
        return res.status(404).json("Event not updated in field 'city'");
      }
    } else {
      return res.status(404).json({ error: "Ciudad no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};

//! GET NEXT EVENTS

const getNextEvents = async (req, res, next) => {
  try {
    if (req.city.events?.length > 0) {
      const events = req.city.events;
      const currentDate = new Date();
      const arrayNextEvents = [];
      await Promise.all(
        events.map(async (event) => {
          const currentEvent = await Event.findById(event);
          return (
            currentEvent.date > currentDate &&
            arrayNextEvents.push(currentEvent)
          );
        }),
      );
      return res.status(200).json({ data: arrayNextEvents });
    } else {
      return res.status(404).json("there's no events in this city yet!");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET PAST EVENTS

const getPastEvents = async (req, res, next) => {
  try {
    if (req.city.events?.length > 0) {
      const events = req.city.events;
      const currentDate = new Date();
      const arrayNextEvents = [];
      await Promise.all(
        events.map(async (event) => {
          const currentEvent = await Event.findById(event);
          return (
            currentEvent.date < currentDate &&
            arrayNextEvents.push(currentEvent)
          );
        }),
      );
      return res.status(200).json({ data: arrayNextEvents });
    } else {
      return res.status(404).json("there's no events in this city yet!");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postCity,
  getByNameCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
  getNextEvents,
  getPastEvents,
};
