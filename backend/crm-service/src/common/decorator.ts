import { GrpcMethod, MessagePattern } from "@nestjs/microservices";

export function GenericServiceControllerMethods(serviceName: string, entity: any) {
  return function (constructor: Function) {
    const repoKey = `${entity.name}Repository`;

    const methods = {
      async getCustomers() {
        if (!this[repoKey]) {
          throw new Error(`Repository '${repoKey}' is not injected`);
        }
        const result = await this[repoKey].find();
        return {customers: result} ;
      },
      async getCustomerById({id} : { id: number }) {
        if (!this[repoKey]) {
          throw new Error(`Repository '${repoKey}' is not injected`);
        }
        const customer = await this[repoKey].findOneBy({ id });
        if (!customer) {
          throw new Error(`Customer with id ${id} not found`);
        }
        return customer;
      },
    };


    for (const [methodName, methodImplementation] of Object.entries(methods)) {
      Object.defineProperty(constructor.prototype, methodName, {
        value: methodImplementation,
        writable: true,
        configurable: true,
      });

      MessagePattern(methodName)(
        constructor.prototype,
        methodName,
        Reflect.getOwnPropertyDescriptor(constructor.prototype, methodName),
      );
    }
  };
}