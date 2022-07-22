import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    String: string,
    ID: string,
    Boolean: boolean,
}

export interface Mutation {
    create: Ticket
    createTeam: Team
    updateStatus: Ticket
    __typename: 'Mutation'
}

export interface Query {
    teams: Team[]
    tickets: Ticket[]
    __typename: 'Query'
}

export interface Team {
    id: Scalars['ID']
    name: Scalars['ID']
    __typename: 'Team'
}

export interface Ticket {
    status: Scalars['ID']
    teamId: Scalars['ID']
    ticketId: Scalars['ID']
    title: Scalars['ID']
    __typename: 'Ticket'
}

export type ValidStatuses = 'blocked' | 'complete' | 'inprogress' | 'pending'

export interface MutationRequest{
    create?: [{teamId: Scalars['String'],title: Scalars['String']},TicketRequest]
    createTeam?: [{name: Scalars['String']},TeamRequest]
    updateStatus?: [{status: ValidStatuses,teamId: Scalars['String'],ticketId: Scalars['String']},TicketRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    teams?: TeamRequest
    tickets?: [{id: Scalars['String']},TicketRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TeamRequest{
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TicketRequest{
    status?: boolean | number
    teamId?: boolean | number
    ticketId?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Team_possibleTypes: string[] = ['Team']
export const isTeam = (obj?: { __typename?: any } | null): obj is Team => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTeam"')
  return Team_possibleTypes.includes(obj.__typename)
}



const Ticket_possibleTypes: string[] = ['Ticket']
export const isTicket = (obj?: { __typename?: any } | null): obj is Ticket => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTicket"')
  return Ticket_possibleTypes.includes(obj.__typename)
}


export interface MutationPromiseChain{
    create: ((args: {teamId: Scalars['String'],title: Scalars['String']}) => TicketPromiseChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Promise<FieldsSelection<Ticket, R>>}),
    createTeam: ((args: {name: Scalars['String']}) => TeamPromiseChain & {get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>) => Promise<FieldsSelection<Team, R>>}),
    updateStatus: ((args: {status: ValidStatuses,teamId: Scalars['String'],ticketId: Scalars['String']}) => TicketPromiseChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Promise<FieldsSelection<Ticket, R>>})
}

export interface MutationObservableChain{
    create: ((args: {teamId: Scalars['String'],title: Scalars['String']}) => TicketObservableChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Observable<FieldsSelection<Ticket, R>>}),
    createTeam: ((args: {name: Scalars['String']}) => TeamObservableChain & {get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>) => Observable<FieldsSelection<Team, R>>}),
    updateStatus: ((args: {status: ValidStatuses,teamId: Scalars['String'],ticketId: Scalars['String']}) => TicketObservableChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Observable<FieldsSelection<Ticket, R>>})
}

export interface QueryPromiseChain{
    teams: ({get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>[]) => Promise<FieldsSelection<Team, R>[]>}),
    tickets: ((args: {id: Scalars['String']}) => {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>[]) => Promise<FieldsSelection<Ticket, R>[]>})
}

export interface QueryObservableChain{
    teams: ({get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>[]) => Observable<FieldsSelection<Team, R>[]>}),
    tickets: ((args: {id: Scalars['String']}) => {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>[]) => Observable<FieldsSelection<Ticket, R>[]>})
}

export interface TeamPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface TeamObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface TicketPromiseChain{
    status: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    teamId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    ticketId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface TicketObservableChain{
    status: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    teamId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    ticketId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}