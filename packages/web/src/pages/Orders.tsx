import { useBoolean } from "usehooks-ts";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import {
  useTypedMutation,
  useTypedQuery,
} from "@seven-single-tables/graphql/urql";
import { formatPrice } from "../utils/utils";

export const Orders = () => {
  const [productsQuery] = useTypedQuery({
    query: {
      products: { id: true, name: true, price: true, description: true },
      warehouses: { id: true, name: true, address: true },
    },
  });

  return (
    <>
      <h2 className="text-2xl m-4">Orders</h2>
      <div className="p-2 shadow mb-4">
        <div className="max-w-prose my-4">
          <p className="p-4">
            An implementation of orders but with a very narrowed scope. We're
            going to have products, warehouses, orders and inventory. The lesson
            here is multiple items that interact with each other.
          </p>
          <ul className="pl-4 my-4">
            <li>Get a product by ID</li>
            <li>Get a warehouse by ID</li>
            <li>Get an order by ID</li>
            <li>Get all products in an order by order id</li>
            <li>Get all products at a warehouse by warehouse id</li>
            <li>Get all orders at a warehouse by warehouse id</li>
            <li>Get all warehouses in an order by order id</li>
          </ul>
        </div>
      </div>
      {productsQuery.data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productsQuery.data.products.map((p) => (
            <Product key={p.id} product={p} />
          ))}
        </div>
      )}
      {productsQuery.data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {productsQuery.data.warehouses.map((w) => (
            <Warehouse key={w.id} warehouse={w} />
          ))}
        </div>
      )}
    </>
  );
};

const Product = ({
  product,
}: {
  product: { name: string; price?: number; description?: string };
}) => {
  const { value: isOpen, toggle } = useBoolean(false);

  return (
    <Card isOpen={isOpen}>
      <div>
        <p>
          <span className="text-gray-400">Name: </span>
          {product.name}
        </p>
        <p className="mb-4">
          <span className="text-gray-400">Price: </span>
          {formatPrice(product.price || 0)}
        </p>
      </div>
      <Card.Footer toggle={toggle}>Learn More</Card.Footer>
      <Modal isOpen={isOpen} setIsOpen={toggle} title="Product details">
        <p>
          <span className="text-gray-400">Name: </span>
          {product.description ? product.description : "No description"}
        </p>
      </Modal>
    </Card>
  );
};

const Warehouse = ({
  warehouse,
}: {
  warehouse: { name: string; address: string; id: string };
}) => {
  const { value: isOpen, toggle } = useBoolean(false);

  return (
    <Card isOpen={isOpen}>
      <div>
        <p>
          <span className="text-gray-400">Name: </span>
          {warehouse.name}
        </p>
        {warehouse.address && (
          <p>
            <span className="text-gray-400">Address: </span>
            {warehouse.address}
          </p>
        )}
      </div>
      <Card.Footer toggle={toggle}>View Warehouse</Card.Footer>
      {isOpen && (
        <WarehouseModal id={warehouse.id} isOpen={isOpen} toggle={toggle} />
      )}
    </Card>
  );
};

interface IWarehouseModal {
  id: string;
  isOpen: boolean;
  toggle: () => void;
}

const WarehouseModal = ({ id, isOpen, toggle }: IWarehouseModal) => {
  const [details] = useTypedQuery({
    query: {
      getWarehouse: [{ id }, { id: true, manager: true }],
      products: { id: true, name: true },
    },
  });
  console.log("details: ", details);

  const [, addManager] = useTypedMutation(
    (opts: { name: string; warehouseId: string }) => ({
      addManager: [
        opts,
        {
          manager: true,
        },
      ],
    })
  );

  const [, addProduct] = useTypedMutation(
    (opts: { productId: string; warehouseId: string; name: string }) => ({
      addProductToWarehouse: [opts, { id: true, name: true }],
    })
  );

  const warehouseDetails = details.data?.getWarehouse[0];
  const products = details.data?.products;

  return (
    <Modal isOpen={isOpen} setIsOpen={toggle} title="Warehouse Details">
      <p>Warehouse Details</p>
      {details.fetching ? (
        <div className="my-8 text-indigo-200">
          Loading... usually I'd put a spinner here
        </div>
      ) : (
        <div>
          <div>
            {warehouseDetails?.manager ? (
              warehouseDetails.manager
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const name = fd.get("name")!.toString();
                  if (name) {
                    addManager({
                      name,
                      warehouseId: id,
                    });
                  }
                  e.currentTarget.reset();
                }}
              >
                <div className="my-4 bg-slate-100 p-4">
                  <label htmlFor="name">Add a manager:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="manager name"
                    className="px-8 py-2 ml-4"
                  />
                  <button
                    disabled={details.fetching}
                    type="submit"
                    className={`rounded bg-green-500 px-8 py-2 text-white ml-4 ${
                      details.fetching ? "opacity-50" : ""
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="flex">
            <div className="flex-1 p-4">
              <h3 className="text-xl">Products</h3>
            </div>
            <div className="flex-1 p-4">
              <h3 className="">Select a Product to add to the warehouse</h3>
              <select
                onChange={(e) => {
                  const name = e.currentTarget.selectedOptions[0].dataset.name;

                  if (name) {
                    addProduct({
                      productId: e.target.value,
                      warehouseId: id,
                      name,
                    });
                  }
                }}
              >
                {products?.map((p) => (
                  <option key={p.id} value={p.id} data-name={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
