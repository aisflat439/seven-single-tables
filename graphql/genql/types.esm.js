export default {
    "scalars": [
        1,
        3,
        7
    ],
    "types": {
        "Article": {
            "id": [
                1
            ],
            "title": [
                1
            ],
            "url": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "ID": {},
        "Mutation": {
            "create": [
                6,
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
            "createArticle": [
                0,
                {
                    "title": [
                        3,
                        "String!"
                    ],
                    "url": [
                        3,
                        "String!"
                    ]
                }
            ],
            "createTeam": [
                5,
                {
                    "name": [
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
        "Query": {
            "articles": [
                0
            ],
            "teams": [
                5
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
            "id": [
                1
            ],
            "teamId": [
                1
            ],
            "title": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "Boolean": {}
    }
}