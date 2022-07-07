# Seven Single Tables

## Table of contents

- [Concept](#concept)
- [Tickets](#1--tickets)
- [Thanks](#thanks)

## Concept

Seven Single Tables is a series of exercises that are for practicing and teaching single table design. This project was inspired by [7 GUIs](https://eugenkiss.github.io/7guis/). This is also [Alex Debrie](https://www.alexdebrie.com/) and his wonderful book on single table design.

Generally, I believe in practice. This represents an example of that.

## 1 - Tickets

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


## Thanks

This is an incomplete list of the tools and people that I appreciate along with any contributors who may help along the way.

- [SST](https://sst.dev/): This is how I learn and build in serverless.
- [Paul Swail](https://serverlessfirst.com/): This is one of the voices I trust
- [Dynobase](https://dynobase.dev/): This is how I visualize my tables.
