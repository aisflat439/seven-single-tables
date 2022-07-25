export default {
    "scalars": [
        1,
        3,
        9,
        10
    ],
    "types": {
        "Comment": {
            "comment": [
                1
            ],
            "postId": [
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
                8,
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
                4,
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
            "createRedditor": [
                6,
                {
                    "name": [
                        3,
                        "String!"
                    ]
                }
            ],
            "createTeam": [
                7,
                {
                    "name": [
                        3,
                        "String!"
                    ]
                }
            ],
            "updateStatus": [
                8,
                {
                    "status": [
                        9,
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
        "Post": {
            "comments": [
                0
            ],
            "post": [
                1
            ],
            "postId": [
                1
            ],
            "redditorId": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "Query": {
            "getPost": [
                4,
                {
                    "postId": [
                        3,
                        "String!"
                    ]
                }
            ],
            "getPosts": [
                4,
                {
                    "redditorId": [
                        3,
                        "String!"
                    ]
                }
            ],
            "redditors": [
                6
            ],
            "teams": [
                7
            ],
            "tickets": [
                8,
                {
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "Redditor": {
            "name": [
                1
            ],
            "redditorId": [
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
        "Boolean": {}
    }
}