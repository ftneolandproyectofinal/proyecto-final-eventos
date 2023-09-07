const { deleteImgCloudinary } = require("../../middleware/files.middleware");

const dotenv = require("dotenv");
dotenv.config();

const Event = require("../models/Event.model");
const Establishment = require("../models/Establishment.model");
const User = require("../models/User.model");

//! CREATE EVENT
const postEvent = async (req, res, next) => {
  let catchImage = req.file?.path;

  try {
    {
      try {
        await Event.syncIndexes();

        const newEvent = new Event(req.body);

        if (req.file) {
          newEvent.image = catchImage;
        } else {
          newEvent.image =
            "https://res.cloudinary.com/dhr13yihn/image/upload/v1693994796/proyectoEventland/eventAssets/istockphoto-1288712636-612x612_ttei8s.jpg";
        }

        const savedEvent = await newEvent.save();

        if (savedEvent) {
          return res.status(200).json(savedEvent);
        } else {
          return res.status(404).json("Event not saved in database");
        }
      } catch (error) {
        req.file?.path && deleteImgCloudinary(catchImage);
        return next(error);
      }
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: "user not found", message: error.message });
  }
};

//! GET BY ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventById = await Event.findById(id);

    if (eventById) {
      return res.status(200).json({
        data: await Event.findById(id).populate(
          "comments usersAssist city establishment organization favsFromUsers",
        ),
      });
    } else {
      res.status(404).json("event not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET BY NAME
const getByName = async (req, res, next) => {
  try {
    const { name = "" } = req.params;
    const eventByName = await Event.find();
    const filterEvent = eventByName.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (filterEvent.length > 0) {
      return res.status(200).json({ data: filterEvent });
    } else {
      res.status(404).json("event not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET ALL
const getAllEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find();
    if (allEvents.length > 0) {
      return res.status(200).json({ data: allEvents });
    } else {
      return res.status(404).json("events not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! UPDATE

const updateEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(req.params.id);
    if (event) {
      const customBody = {
        _id: event._id,
        image: req.file?.path ? req.file?.path : event.image,
        name: req.body?.name ? req.body?.name : event.name,
        description: req.body?.description
          ? req.body?.description
          : event.description,
        video: req.body?.video ? req.body?.video : event.video,
      };

      // Verificar si hay un nuevo establecimiento asociado
      if (req.body.establishment) {
        const newEstablishmentId = req.body.establishment;

        // Obtener el establecimiento anterior asociado al evento
        const oldEstablishmentId = event.establishment;

        // Actualizar el evento con el nuevo establecimiento
        customBody.establishment = newEstablishmentId;

        // Guardar el evento actualizado
        await Event.findByIdAndUpdate(id, customBody);

        // Si había un establecimiento anteriormente asociado, eliminar la referencia al evento
        if (oldEstablishmentId) {
          await Establishment.findByIdAndUpdate(oldEstablishmentId, {
            $pull: { events: id },
          });
        }

        // Asociar el evento al nuevo establecimiento
        await Establishment.findByIdAndUpdate(newEstablishmentId, {
          $addToSet: { events: id },
        });
      } else {
        // Si no se proporciona un nuevo establecimiento, simplemente actualizar el evento
        await Event.findByIdAndUpdate(id, customBody);
      }

      const updateNewEvent = await Event.findById(id);
      const elementUpdate = Object.keys(req.body);
      let test = {};
      elementUpdate.forEach((item) => {
        if (req.body[item] == updateNewEvent[item]) {
          test[item] = true;
        } else {
          test[item] = false;
        }
        if (req.file) {
          updateNewEvent.image == req.file?.path
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
          update: updateNewEvent,
        });
      }
    } else {
      return res.status(404).json("Event not found");
    }
  } catch (error) {
    return next(error);
  }
};

//!DELETE

const deleteEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.updateMany(
      { eventsInterested: id },
      { $pull: { eventsInterested: id } },
    );

    await User.updateMany(
      { eventsAssist: id },
      { $pull: { eventsAssist: id } },
    );

    await Establishment.updateMany({ events: id }, { $pull: { events: id } });

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (deletedEvent) {
      return res.status(200).json({ message: "Evento eliminado exitosamente" });
    } else {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllEvents,
  getByName,
  getById,
  postEvent,
  updateEvent,
  deleteEvent,
};
