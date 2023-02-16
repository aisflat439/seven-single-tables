import { Orders } from "@seven-single-tables/core/orders";
import { builder } from "../builder";

const ProductType = builder
  .objectRef<Orders.ProductEntityType>("Product")
  .implement({
    fields: (t) => ({
      id: t.exposeID("productId"),
      name: t.exposeID("name"),
      description: t.exposeString("description", {
        nullable: true,
      }),
      price: t.exposeInt("price", {
        nullable: true,
      }),
    }),
  });

const WarehouseType = builder
  .objectRef<Orders.WarehouseEntityType>("Warehouse")
  .implement({
    fields: (t) => ({
      id: t.exposeID("warehouseId"),
      name: t.exposeString("name"),
      address: t.exposeString("address"),
      manager: t.exposeString("manager", {
        nullable: true,
      }),
      // productId: t.exposeString("productId", {
      //   nullable: true,
      //   type: [ProductType],
      //   resolve: ({ warehouseId }) =>
      //     Orders.listProductsByWarehouse(warehouseId),
      // }),
    }),
  });

const WarehouseInput = builder.inputType("WarehouseInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    address: t.string(),
  }),
});

builder.queryFields((t) => ({
  products: t.field({
    type: [ProductType],
    resolve: () => Orders.listProducts(),
  }),
  warehouses: t.field({
    type: [WarehouseType],
    resolve: () => Orders.listWarehouses(),
  }),
  getWarehouse: t.field({
    type: [WarehouseType],
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_, { id }) => {
      return Orders.getWarehouse(id);
    },
  }),
  // warehouseProducts: t.field({
  //   type: [ProductType],
  //   args: {
  //     warehouseId: t.arg.string({ required: true }),
  //   },
  //   resolve: (_, { warehouseId }) =>
  //     Orders.listProductsByWarehouse(warehouseId),
  // }),
}));

builder.mutationFields((t) => ({
  createProduct: t.field({
    type: ProductType,
    args: {
      name: t.arg.string({ required: true }),
      description: t.arg.string(),
      price: t.arg.int(),
    },
    resolve: (_, args) =>
      Orders.createProduct(args.name, args.description, args.price),
  }),
  createWarehouse: t.field({
    type: WarehouseType,
    args: {
      input: t.arg({
        type: WarehouseInput,
        required: true,
      }),
    },
    resolve: (_, { input }) => Orders.createWarehouse(input),
  }),
  addManager: t.field({
    type: WarehouseType,
    args: {
      warehouseId: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
    },
    resolve: async (_, { warehouseId, name }) =>
      //@ts-ignore
      Orders.addManager(warehouseId, name),
  }),
  addProductToWarehouse: t.field({
    type: ProductType,
    args: {
      warehouseId: t.arg.string({ required: true }),
      productId: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
    },
    resolve: async (_, { warehouseId, productId, name }) =>
      //@ts-ignore
      Orders.addProductToWarehouse(warehouseId, productId, name),
  }),
  // addProductToWarehouse: t.field({
  //   type: WarehouseType,
  //   args: {
  //     warehouseId: t.arg.string({ required: true }),
  //     productId: t.arg.string({ required: true }),
  //     quantity: t.arg.int(),
  //   },
  //   resolve: async (_, args) => {
  //     return Orders.addProductToWarehouse(
  //       args.warehouseId,
  //       args.productId,
  //       args.quantity
  //     );
  //   },
  // }),
}));

//   createTeam: t.field({
//     type: TeamType,
//     args: {
//       name: t.arg.string({ required: true }),
//     },
//     resolve: async (_, args) => Orders.createTeam(args.name),
//   }),
//   create: t.field({
//     type: TicketType,
//     args: {
//       title: t.arg.string({ required: true }),
//       teamId: t.arg.string({ required: true }),
//     },
//     resolve: async (_, args) => Orders.create(args.title, args.teamId),
//   }),
//   updateStatus: t.field({
//     type: TicketType,
//     args: {
//       teamId: t.arg.string({ required: true }),
//       ticketId: t.arg.string({ required: true }),
//       status: t.arg({
//         required: true,
//         type: ValidStatuses,
//       }),
//     },
//     resolve: async (_, args) =>
//       // @ts-ignore
//       Orders.updateStatus(args.teamId, args.ticketId, args.status),
//   }),
// }));
