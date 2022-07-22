export default {
    "scalars": [
        1,
        4,
        6,
        7
    ],
    "types": {
        "Mutation": {
            "create": [
                5,
                {
                    "teamId": [
                        1,
                        "String!"
                    ],
                    "title": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createTeam": [
                3,
                {
                    "name": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updateStatus": [
                5,
                {
                    "status": [
                        6,
                        "ValidStatuses!"
                    ],
                    "teamId": [
                        1,
                        "String!"
                    ],
                    "ticketId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "Query": {
            "teams": [
                3
            ],
            "tickets": [
                5,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "Team": {
            "id": [
                4
            ],
            "name": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ID": {},
        "Ticket": {
            "status": [
                4
            ],
            "teamId": [
                4
            ],
            "ticketId": [
                4
            ],
            "title": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ValidStatuses": {},
        "Boolean": {}
    }
}