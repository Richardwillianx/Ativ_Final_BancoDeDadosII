import { Express } from "express";
import { MessageController } from "./controllers/message.controller";
import { UserController } from "./controllers/user.controller";

import { ValidateUserMiddleware } from "./middlewares/validateUser";

export default (app: Express) => {
  const userController = new UserController();
  const messageController = new MessageController();

  app.get("/", (request, response) => response.send("API is running"));

  app.post("/user", new UserController().createUser);
  app.get("/user", new UserController().getAll);
  app.get(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    new UserController().getUserById
  );
  app.put(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    new UserController().editUser
  );
  app.delete(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    new UserController().deleteUser
  );

  app.post(
    "/user/:id/message",
    new ValidateUserMiddleware().validateUser,
    new MessageController().createMessage
  );

  app.put(
    "/user/:userId/message/:id",
    new ValidateUserMiddleware().validateUser,
    new MessageController().editMessage
  );
  app.delete(
    "/user/:userId/message/:id",
    new ValidateUserMiddleware().validateUser,
    new MessageController().deleteMessage
  );

  app.put(
    "/user/:userId/message/:id/archived",
    new ValidateUserMiddleware().validateUser,
    new MessageController().change
  );
};
