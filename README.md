# Seven Single Tables

## Table of contents

- [Concept](#concept)
- [Tickets](#1---tickets)
- [Posts](#2---posts)
- [Orders](#3---orders)
- [Thanks](#thanks)

## Concept

Seven Single Tables is a series of exercises that are for practicing and teaching single table design. This project was inspired by [7 GUIs](https://eugenkiss.github.io/7guis/). This is also [Alex Debrie](https://www.alexdebrie.com/) and his wonderful book on single table design.

Generally, I believe in practice. This represents an example of that.

## 1 - Jira

A mini implementation of Jira tickets. In this case we have teams, and teams have tickets. They want to get tickets in various states of progress, sorted by creation date.

<details>
  <summary>Ticket Attributes</summary>
  
- team: string; // name of team
- status: enum; // staus of ticket
- createdAt: date;
- description: string;
</details>
  
<details>
  <summary>Access Patterns</summary>

- Create a ticket for a team (default to pending)
- Mark a teams ticket complete/blocked/pending/in-progress
- Get all of a teams pending tickets, sorted by creation time
- Get all of a teams blocked tickets, sorted by creation time

  ### Detailed Explanation

This task goal is to learn the concept of heirarchical search and a compound sort key

</details>

## 2 - Posts

A mini implementation of a part of a site Reddit or Hacker News

<details>
  <summary>Ticket Attributes</summary>
</details>
  
<details>
  <summary>Access Patterns</summary>

### Detailed Explanation

</details>

## 3 - Orders

A mini implementation of Jira tickets. In this case we have teams, and teams have tickets. They want to get tickets in various states of progress, sorted by creation date.

<details>
  <summary>Ticket Attributes</summary>
</details>
  
<details>
  <summary>Access Patterns</summary>
  
### Detailed Explanation

</details>

## Thanks

This is an incomplete list of the tools and people that I appreciate along with any contributors who may help along the way.

- [SST](https://sst.dev/): This is how I learn and build in serverless.
- [Rick Houlihan](https://youtu.be/6yqfmXiZTlM): This is the talk that made me think this is something I should learn.
- [Alex DeBrie](https://www.dynamodbbook.com/): This is the book I read to try to get this stuff.
- [Paul Swail](https://serverlessfirst.com/): This is one of the voices I trust
- [Dynobase](https://dynobase.dev/): This is how I visualize my tables.

note to self

I'm working on a model to continue to get comfortable with Single Table Design in ElectroDB. I think I may need another Entity but want to sanity check myself a little before I get too far down a rabbit hole.

I'm trying to do:

```
Product
Order
Warehouse
```

The stumbling block is that both `Warehouse` and `Order` contain a list of products and would have either an inventory or a count. I think getting the products in a warehouse is straightforward.

```
// assuming i have:
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
      }

// I can do:
export async function listProductsByWarehouse(warehouseId: string) {
 return WarehouseEntity.query
  .warehouseProducts({ warehouseId }).go()
}
```

A warehouse might have 5 of product `ABC-123`. An order might just contain a count. There are both slightly different. Does that information belong with the product, or the order/warehouse? My intuition is it's on the warehouse. If that's true, which seems right, I think I also need an `InventoryEntity`. Updating my model to something like this:

```
      warehouseProducts: {
        collection: "warehouseProducts",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["warehouseId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["inventory"],
        }
      }
```

I can't really get my mind around this however. Advice and thoughts appreciated. I think what I want is `Products`, `Inventory`, `Orders`, `Warehouses` and `OrderItems`

NOTE:

ERROR Runtime.UnhandledPromiseRejection: ElectroError: Partition Key (pk) on Access Pattern 'warehouseProducts' is defined with the composite attribute(s) "warehouseId", but the accessPattern '(Primary Index)' defines this field with the composite attributes '. Key fields must have the same composite attribute definitions across all indexes they are involved with - For more detail on this error reference: https://github.com/tywalch/electrodb#inconsistent-index-definition

| pk        | sk  | gsi1pk      | gsi1sk    | gsi2pk | gsi2sk  | Access Pattern        |
| --------- | --- | ----------- | --------- | ------ | ------- | --------------------- |
| warehouse | id  |             |           |        |         | getWarehouse/s        |
|           |     | warehouseId | productId |        |         | getWarehousesProducts |
|           |     |             |           | order  | orderID | getWarehouseOrders    |
| product   | id  |             |           |        |         | getProduct/s          |
| order     | id  |             |           |        |         | getOrder/s            |
|           |     | orderId     | productId |        |         | getAnOrdersProducts   |

This seemed promising! But when I wanted to add a count for each item it got a little confusing. I figured the count should go on the warehouse product. I just couldn't seem to get my ElectroDB Query and my Pothos builder to play nicely.
