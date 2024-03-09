import { Request, Response, response } from "express";

export type LoginForm = {
  email: string;
  password: string;
};

export type LoginResult = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export function notFound<T>(data: T) {
  return {
    statusCode: 404,
    data,
  };
}

export function badRequest<T>(data: T) {
  return {
    statusCode: 400,
    data,
  };
}

export class AuthController {
  private request: Request | null | undefined;

  /**
   *
   */
  constructor() {
    this.request = null;
  }

  set Request(req: Request) {
    this.request = req;
  }

  @httpPost("/login")
  public login(loginForm: LoginForm) {
    if (!loginForm) {
      return notFound("");
    }

    if (loginForm.email === "" || loginForm.password === "") {
      return badRequest("");
    }
  }
}

function httpPost(endpoint: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (req: Request, res: Response) {
      const result = originalMethod.call(this, req.body);
      if (result.statusCode === 404) {
        return res.status(404).send(result.data);
      }
      if (result.statusCode === 400) {
        return res.status(400).send(result.data);
      }
    };
  };
}
