import { Request, Response } from "express";
import { usersApp } from "../db/users";
import { User } from "../models/user";

export class UserController {
  getUserById(request: Request, response: Response) {
    const data: User | undefined = usersApp.find(
      ({ id }) => id == request.params.id
    );

    return response.json(data?.toReturn());
  }

  async getAll(request: Request, response: Response) {
    if (usersApp.length === 0) {
      return response
        .status(404)
        .json({ message: "Não há usuários cadastrados." });
    }

    const data = usersApp.map((user) => {
      return user.toReturn();
    });

    return response.status(200).json(data);
  }

  createUser(request: Request, response: Response) {
    const { name, email } = request.body;

    const user = new User(name, email);

    usersApp.push(user);

    return response.json(user.toReturn());
  }

  editUser(request: Request, response: Response) {
    const user = usersApp.find(({ id }) => request.params.id === id);
    const { name, email } = request.body;

    user?.userUpdate(name, email);

    return response.json(user?.toReturn());
  }

  deleteUser(request: Request, response: Response) {
    const userId = request.params.id;

    const indexUser = usersApp.findIndex((user) => user.id === userId);

    usersApp.splice(indexUser, 1);

    return response.status(200).json(
      usersApp.map((user) => {
        return user.toReturn();
      })
    );
  }
}
