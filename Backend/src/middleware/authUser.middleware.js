//? Aquí haremos la autentificación de usuarios y usuarios-Administradores

// const Comment = require("../api/models/Comment.model");
const User = require("../api/models/User.model");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

const isAuthUser = async (req, res, next) => {
  //le quitamos el prefijo Bearer al token
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return next(new Error("You're not authorized ❌"));
  }
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return next(new Error("You're not authorized as Admin ❌"));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "admin") {
      return next(new Error("You need to be Admin for this ❌"));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthUserOrAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return next(new Error("You're not authorized ❌"));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new Error("User not found ❌"));
    }

    if (user.role !== "user" && user.role !== "admin") {
      return next(new Error("Invalid role for this operation ❌"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

// const isAuthUserOwnerDelete = async (req, res, next) => {
//   const token = req.headers.authorization?.replace("Bearer ", "");
//   if (!token) {
//     return next(new Error("You're not auticated ❌"));
//   }

//   try {
//     const decoded = verifyToken(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id);

//     if (!req.user) {
//       return next(new Error("User not found ❌"));
//     }

//     // Si el usuario es un administrador, puede borrar el comentario
//     if (req.user.role === "admin") {
//       return next();
//     }

//     const commentId = req.params.id;
//     const comment = await Comment.findById(commentId);

//     if (!comment) {
//       return res.status(404).json({ error: "Comment not found ❌" });
//     }
//     console.log("comment 💃", comment);
//     // Si el ID del usuario coincide con el ID de usuario en el comentario, puede borrarlo
//     if (comment.user.equals(decoded.id)) {
//       return next();
//     } else {
//       return res
//         .status(403)
//         .json({ error: "You're not authorized to delete this comment ❌" });
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

module.exports = {
  isAuthUser,
  isAuthAdmin,
  isAuthUserOrAdmin,
  // isAuthUserOwnerDelete,
};
