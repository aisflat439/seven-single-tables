import { Card } from "../components/Card";
import { useTypedQuery } from "../urql";
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
          {productsQuery.data.products.map((p) => {
            return (
              <Card>
                <div>
                  <p>
                    <span className="text-gray-400">Name: </span>
                    {p.name}
                  </p>
                  <p className="mb-4">
                    <span className="text-gray-400">Price: </span>
                    {formatPrice(p.price || 0)}
                  </p>
                </div>
                <Card.Footer>Learn More</Card.Footer>
              </Card>
            );
          })}
        </div>
      )}
      {productsQuery.data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {productsQuery.data.warehouses.map((p) => {
            return (
              <Card>
                <div>
                  <p>
                    <span className="text-gray-400">Name: </span>
                    {p.name}
                  </p>
                  {p.address && (
                    <p>
                      <span className="text-gray-400">Address: </span>
                      {p.address}
                    </p>
                  )}
                </div>
                <Card.Footer>View Warehouse</Card.Footer>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};
