export * as Orders from "./orders";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const ProductEntity = new Entity( 
  {
    model: {
      version: "1",
      entity: "Product",
      service: "orders",
    },
    attributes: {
      productId: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
      description: {
        type: "string",
      },
      price: {
        type: "number",
      },
      warehouseId: {
        type: "string",
      }
    },
    indexes: {
      products: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["productId"],
        }
      },
      warehouseProducts: {
        collection: "warehouseProducts",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["warehouseId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["productId"],
        }
      },
    }
  },
  Dynamo.Configuration
)

export const WarehouseEntity = new Entity( 
  {
    model: {
      version: "1",
      entity: "Warehouse",
      service: "orders",
    },
    attributes: {
      warehouseId: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
      address: {
        type: "string",
        required: true,
      },
      manager: {
        type: "string",
      },
      productId: {
        type: "string",
      },
    },
    indexes: {
      warehouses: {
        collection: "warehouses",
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["warehouseId"],
        }
      },
      warehouseProducts: {
        collection: "warehouseProducts",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["warehouseId"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        }
      },
    }
  },
  Dynamo.Configuration
)

export const OrderEntity = new Entity( 
  {
    model: {
      version: "1",
      entity: "Order",
      service: "orders",
    },
    attributes: {
      orderId: {
        type: "string",
        required: true,
      },
      productId: {
        type: "string",
      },
      status: {
        type: ["confirmed", "cancelled", "pending", "fulfilled", "complete"] as const,
        set: (status: string) => {
          return ["confirmed", "cancelled", "pending", "fulfilled", "complete"].indexOf(status)
        },
        get: (index: number) => {
          return ["confirmed", "cancelled", "pending", "fulfilled", "complete"][index] || "pending"
        }
      },
    },
    indexes: {
      orderId: {
        pk: {
          field: "pk",
          composite: ["orderId"],
        }
      },
      orderProducts: {
        collection: "orderProducts",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["orderId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["productId"],
        }
      }
    }
  },
  Dynamo.Configuration
)

export type ProductEntityType = EntityItem<typeof ProductEntity>;
export type WarehouseEntityType = EntityItem<typeof WarehouseEntity>;
export type OrderEntityType = EntityItem<typeof OrderEntity>;

export async function createProduct(name: string, description?: string | null,
  price?: number | null) {
    return ProductEntity.create({
      productId: ulid(),
      name,
      description: description || "",
      price: price || 0,
    }).go()
}


export async function createWarehouse({ name, address }: { name: string, address?: string | null, productId?: string | null }) {
  return WarehouseEntity.
  create({
    address: address || "",
    name,
    warehouseId: ulid(),
  }).go()
}

export async function createOrder({  }) {
    return {}
}

export async function addManager(warehouseId: string, name:string) {
    return WarehouseEntity.update({
      warehouseId,
    }).set({
      manager: name,
    }).go({ response: "all_new" })
}

export async function addProductToWarehouse(warehouseId: string, productId: string, name: string) {
    return ProductEntity.create({
      warehouseId,
      productId,
      name
    }).go()
}
    
  
export async function getOrder() {
 return {} 
}

export async function getWarehouse(warehouseId: string) {
 return WarehouseEntity.query.warehouses({warehouseId}).go() 
}

export async function getProduct() {
 return {} 
}

export async function listProducts() {
 return ProductEntity.query.products({}).go()
}

export async function listWarehouses() {
 return WarehouseEntity.query.warehouses({}).go()
}

export async function listProductsByWarehouse(warehouseId: string) {
 return WarehouseEntity.query
  .warehouseProducts({ warehouseId }).go() 
}

export async function listOrdersByWarehouse() {
 return {} 
}

export async function listProductsByOrder() {
 return {} 
}

export async function listWarehousesByOrder() {
 return {} 
}
