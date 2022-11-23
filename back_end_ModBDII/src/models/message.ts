import crypto from "crypto";

export class Message {
  private _id: string;
  private _title: string;
  private _message: string;
  private _archived: boolean;

  constructor(title: string, message: string) {
    this._id = crypto.randomUUID();
    this._title = title;
    this._message = message;
    this._archived = false;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get message() {
    return this._message;
  }

  get archived() {
    return this._archived;
  }

  messageUpdate(title: string, message: string) {
    this._title = title;
    this._message = message;
  }

  toReturn() {
    return {
      id: this._id,
      title: this._title,
      message: this._message,
      archived: this.archived,
    };
  }

  changeStatusFile(status: boolean) {
    this._archived = status;
  }
}
