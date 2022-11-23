import { Request, Response } from "express";
import { usersApp } from "../db/users";
import { Message } from "../models/message";

export class MessageController {
  createMessage(request: Request, response: Response) {
    const { title, message } = request.body;

    const { id } = request.params;

    if (!title) {
      return response.status(400).json({ message: "Dados inválidos" });
    }

    const user = usersApp.find((user) => id === user.id);

    const recado = new Message(title, message);

    user?.message.push(recado);

    return response.status(200).json({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      message: user?.message.map((message) => {
        return {
          id: message.id,
          title: message.title,
          message: message.message,
        };
      }),
    });
  }

  editMessage(request: Request, response: Response) {
    const { userId, id } = request.params;
    const { title, message } = request.body;

    if (!title || !message) {
      return response.status(400).json({ message: "Dados inválidos" });
    }

    const user = usersApp.find((user) => userId === user.id);

    const messageFound = user?.message.find((mesg) => id === mesg.id);

    messageFound?.messageUpdate(title, message);

    return response.status(200).json(messageFound);
  }

  change(request: Request, response: Response) {
    const { userId, id } = request.params;
    const { archived } = request.body;

    const user = usersApp.find((user) => userId === user.id);

    const messageFound = user?.message.find((mesg) => id === mesg.id);

    messageFound?.changeStatusFile(archived);

    return response.status(200).json(messageFound?.toReturn());
  }

  deleteMessage(request: Request, response: Response) {
    const { userId, id } = request.params;

    const user = usersApp.find((user) => userId === user.id);

    const indexUser = user?.message.findIndex(
      (trans) => trans.id === id
    ) as number;

    user?.message.splice(indexUser, 1);

    return response
      .status(200)
      .json(user?.message.map((message) => message.toReturn()));
  }
}
