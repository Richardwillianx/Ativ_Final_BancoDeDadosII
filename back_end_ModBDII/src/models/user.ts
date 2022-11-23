import crypto from "crypto";
import { request } from "https";
import { Message } from "./message";

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _messages: Message[];

  constructor(name: string, email: string) {
    this._id = crypto.randomUUID();
    this._name = name;
    this._email = email;
    this._messages = [];
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }
  get message() {
    return this._messages;
  }
  userUpdate(name: string, email: string) {
    this._name = name;
    this._email = email;
  }

  toReturn() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      message: this._messages.map((message) => message.toReturn()),
    };
  }
}
