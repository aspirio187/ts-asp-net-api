import { Request } from "express";

export class ControllerBase {
  protected request: Request | null | undefined;

  set Request(req: Request | null | undefined) {
    this.request = req;
  }

  get Request(): Request | null | undefined {
    return this.request;
  }
}
