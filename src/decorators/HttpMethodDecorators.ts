import { Request, Response } from "express";
import { HttpResult } from "../webSupport/HttpMethods";
import { addMethod } from "..";

export function httpPost(endpoint: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const handler = setHandler(target, propertyKey);

    addMethod({
      key: propertyKey,
      handler: handler,
      controller: target,
      function: descriptor.value,
      method: "post",
      endpoint,
    });
  };
}

export function httpGet(endpoint: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const handler = setHandler(target, propertyKey);

    addMethod({
      key: propertyKey,
      handler: handler,
      controller: target,
      function: descriptor.value,
      method: "get",
      endpoint,
    });
  };
}

function setHandler(target: any, propertyKey: string) {
  return (req: Request, res: Response) => {
    const instance = new target.constructor();
    instance.Request = req;

    const paramNames = getParamNames(instance[propertyKey]);

    const args = paramNames.map((paramName) => getParamValue(req, paramName));

    const result: HttpResult<unknown> = instance[propertyKey](...args);

    if (!result) {
      return res.status(500).send("Internal Server Error");
    }

    return res.status(result.statusCode).send(result.data);
  };
}

function getParamNames(func: Function) {
  const match = func.toString().match(/function\s.*?\(([^)]*)\)/);
  if (match && match[1]) {
    return match[1].split(",").map((param) => param.trim());
  } else {
    // Return an empty array or throw an error if no match is found
    return [];
  }
}

function getParamValue(req: Request, paramName: string): any {
  if (paramName === "body") return req.body;
  if (paramName === "query") return req.query;
  if (req.params.hasOwnProperty(paramName)) return req.params[paramName];
  // Add more cases as needed for other parts of the request
  return undefined;
}
