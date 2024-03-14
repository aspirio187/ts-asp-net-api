enum States {
  Singleton,
  Transient,
  Scoped,
}

type RegisteredService = {
  key: string;
  service: any;
  state: States;
  instance: any;
};

export class DIContainer {
  private static _instance: DIContainer;
  private _services: Map<string, RegisteredService>;
  private _scopedInstances = new Map<string, any>();

  private constructor() {
    this._services = new Map<string, RegisteredService>();
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new DIContainer();
    }

    return this._instance;
  }

  public registerSingleton(key: string, service: { new (): any }) {
    this._services.set(key, {
      key,
      service,
      state: States.Singleton,
      instance: new service(),
    });
  }

  public registerTransient(key: string, service: { new (): any }) {
    this._services.set(key, {
      key,
      service,
      state: States.Transient,
      instance: null,
    });
  }

  public registerScoped(key: string, service: { new (): any }) {
    this._services.set(key, {
      key,
      service,
      state: States.Scoped,
      instance: null,
    });
  }

  public resolve<T>(key: string): T {
    const registeredService = this._services.get(key);
    if (!registeredService) {
      throw new Error(`Service ${key} not found`);
    }

    switch (registeredService.state) {
      case States.Singleton:
        return registeredService.instance;

      case States.Transient:
        return new registeredService.service();

      case States.Scoped:
        let scopedInstance = this._scopedInstances.get(key);
        if (!scopedInstance) {
          scopedInstance = new registeredService.service();
          this._scopedInstances.set(key, scopedInstance);
        }
        return scopedInstance;
    }
  }
}
