import express, { Request, Response } from "express";
import { AuthController } from "./controllers/AuthController";
import { ControllerBase } from "./controllers/ControllerBase";
import { DIContainer } from "./DIContainer";
import fs from "fs";

export type RegisteredHandler = {
  key: string;
  handler: Function;
  controller: ControllerBase;
  function: Function;
  method: string;
  endpoint: string;
};

const containerInstance = DIContainer.instance;

containerInstance.registerTransient(
  "TransientService",
  class {
    public number = Math.random() * 100;
  }
);

containerInstance.registerScoped(
  "ScopedService",
  class {
    public number = Math.random() * 100;
  }
);

const app = express();
app.use(express.json());

const methods: RegisteredHandler[] = [];

export const addMethod = (method: RegisteredHandler) => {
  (app as { [key: string]: any })[method.method](
    method.endpoint,
    method.handler
  );
};

app.get("/test/:id", (req: Request, res: Response) => {
  console.log(req.params.id);
  res.send("Hello");
  
});

const localizedControllers = localizeControllers();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function localizeControllers() {
  const controllersPath = `${__dirname}/controllers`;
  const instanciatedControllers: ControllerBase[] = [];

  // for all files in the controllers folder that ends with Controller.ts
  // require them and add them to the controllers array
  fs.readdirSync(controllersPath)
    .filter((file) => file.endsWith("Controller.ts"))
    .forEach((file) => {
      const controller = require(`${controllersPath}/${file}`);
      const controllerInstance = new controller[file.replace(".ts", "")]();
      instanciatedControllers.push(controllerInstance);
    });

  return instanciatedControllers;
}

function implementMethods(controllers: ControllerBase[]) {
  controllers.forEach((controller) => {
    const prototype = Object.getPrototypeOf(controller);

    const methods = getAllMethods(controller);

    methods.forEach((method) => {});
  });
}

function getAllMethods(controller: ControllerBase) {
  let properties = new Set();
  let currentObj = controller;

  do {
    Object.getOwnPropertyNames(currentObj).map((item) => properties.add(item));
  } while ((currentObj = Object.getPrototypeOf(currentObj)));

  return [...properties.keys()].filter(
    (item) =>
      typeof (controller as { [key: string]: any })[item as string] ===
      "function"
  );
}
