import { Request, Response, response } from "express";
import { ControllerBase } from "./ControllerBase";
import { addMethod } from "../index";
import {
  HttpResult,
  badRequest,
  notFound,
  ok,
} from "../webSupport/HttpMethods";
import { httpGet, httpPost } from "../decorators/HttpMethodDecorators";
import { DIContainer } from "../DIContainer";

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

export class AuthController extends ControllerBase {
  /**
   *
   */
  constructor(transientService: any) {
    super();
  }

  @httpPost("/login")
  public login(body: LoginForm): HttpResult<LoginResult> {
    if (!body) {
      return notFound({
        token: "",
        user: {
          id: "",
          email: "",
        },
      });
    }

    if (body.email === "" || body.password === "") {
      return badRequest({
        token: "",
        user: {
          id: "",
          email: "",
        },
      });
    }

    return ok({
      token: "123456",
      user: {
        id: "123",
        email: "test",
      },
    });
  }

  @httpPost("/user/:id")
  public createUser(body: LoginForm, id: string): HttpResult<unknown> {
    if (!body) {
      return badRequest();
    }

    if (!id) {
      return badRequest();
    }

    if (body.email === "" || body.password === "") {
      return badRequest();
    }

    return ok();
  }

  @httpGet("/user/:id")
  public getUser(id: string): HttpResult<unknown> {
    return ok({
      id,
      email: "test",
    });
  }
}
