export default {
    "scalars": [
        1,
        3,
        4,
        11,
        14
    ],
    "types": {
        "Comment": {
            "comment": [
                1
            ],
            "commentId": [
                1
            ],
            "id": [
                1
            ],
            "redditorId": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "ID": {},
        "Mutation": {
            "addManager": [
                12,
                {
                    "name": [
                        3,
                        "String!"
                    ],
                    "warehouseId": [
                        3,
                        "String!"
                    ]
                }
            ],
            "addProductToWarehouse": [
                6,
                {
                    "name": [
                        3,
                        "String!"
                    ],
                    "productId": [
                        3,
                        "String!"
                    ],
                    "warehouseId": [
                        3,
                        "String!"
                    ]
                }
            ],
            "comment": [
                0,
                {
                    "comment": [
                        3,
                        "String!"
                    ],
                    "postId": [
                        3,
                        "String!"
                    ],
                    "redditorId": [
                        3,
                        "String!"
                    ]
                }
            ],
            "create": [
                10,
                {
                    "teamId": [
                        3,
                        "String!"
                    ],
                    "title": [
                        3,
                        "String!"
                    ]
                }
            ],
            "createPost": [
                5,
                {
                    "post": [
                        3,
                        "String!"
                    ],
                    "redditorId": [
                        3,
                        "String!"
                    ]
                }
            ],
            "createProduct": [
                6,
                {
                    "description": [
                        3
                    ],
                    "name": [
                        3,
                        "String!"
                    ],
                    "price": [
                        4
                    ]
                }
            ],
            "createRedditor": [
                8,
                {
                    "name": [
                        3,
                        "String!"
                    ]
                }
            ],
            "createTeam": [
                9,
                {
                    "name": [
                        3,
                        "String!"
                    ]
                }
            ],
            "createWarehouse": [
                12,
                {
                    "input": [
                        13,
                        "WarehouseInput!"
                    ]
                }
            ],
            "updateStatus": [
                10,
                {
                    "status": [
                        11,
                        "ValidStatuses!"
                    ],
                    "teamId": [
                        3,
                        "String!"
                    ],
                    "ticketId": [
                        3,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "String": {},
        "Int": {},
        "Post": {
            "comments": [
                0
            ],
            "id": [
                1
            ],
            "post": [
                1
            ],
            "redditorId": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "Product": {
            "description": [
                3
            ],
            "id": [
                1
            ],
            "name": [
                1
            ],
            "price": [
                4
            ],
            "__typename": [
                3
            ]
        },
        "Query": {
            "getPost": [
                5,
                {
                    "postId": [
                        3,
                        "String!"
                    ]
                }
            ],
            "getPostersComments": [
                0,
                {
                    "redditorId": [
                        3,
                        "String!"
                    ]
                }
            ],
            "getPosts": [
                5,
                {
                    "redditorId": [
                        3,
                        "String!"
                    ]
                }
            ],
            "getWarehouse": [
                12,
                {
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "posts": [
                5
            ],
            "products": [
                6
            ],
            "redditors": [
                8
            ],
            "teams": [
                9
            ],
            "tickets": [
                10,
                {
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "warehouses": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "Redditor": {
            "id": [
                1
            ],
            "name": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "Team": {
            "id": [
                1
            ],
            "name": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "Ticket": {
            "status": [
                1
            ],
            "teamId": [
                1
            ],
            "ticketId": [
                1
            ],
            "title": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "ValidStatuses": {},
        "Warehouse": {
            "address": [
                3
            ],
            "id": [
                1
            ],
            "manager": [
                3
            ],
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "WarehouseInput": {
            "address": [
                3
            ],
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "Boolean": {}
    }
}