import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
}

export interface Article {
    id: Scalars['ID']
    title: Scalars['ID']
    url: Scalars['ID']
    __typename: 'Article'
}

export interface Mutation {
    create: Ticket
    createArticle: Article
    createTeam: Team
    __typename: 'Mutation'
}

export interface Query {
    articles: Article[]
    teams: Team[]
    __typename: 'Query'
}

export interface Team {
    id: Scalars['ID']
    name: Scalars['ID']
    __typename: 'Team'
}

export interface Ticket {
    id: Scalars['ID']
    teamId: Scalars['ID']
    title: Scalars['ID']
    __typename: 'Ticket'
}

export interface ArticleRequest{
    id?: boolean | number
    title?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    create?: [{teamId: Scalars['String'],title: Scalars['String']},TicketRequest]
    createArticle?: [{title: Scalars['String'],url: Scalars['String']},ArticleRequest]
    createTeam?: [{name: Scalars['String']},TeamRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    articles?: ArticleRequest
    teams?: TeamRequest
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
    id?: boolean | number
    teamId?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Article_possibleTypes: string[] = ['Article']
export const isArticle = (obj?: { __typename?: any } | null): obj is Article => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isArticle"')
  return Article_possibleTypes.includes(obj.__typename)
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


export interface ArticlePromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface ArticleObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface MutationPromiseChain{
    create: ((args: {teamId: Scalars['String'],title: Scalars['String']}) => TicketPromiseChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Promise<FieldsSelection<Ticket, R>>}),
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticlePromiseChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Promise<FieldsSelection<Article, R>>}),
    createTeam: ((args: {name: Scalars['String']}) => TeamPromiseChain & {get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>) => Promise<FieldsSelection<Team, R>>})
}

export interface MutationObservableChain{
    create: ((args: {teamId: Scalars['String'],title: Scalars['String']}) => TicketObservableChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Observable<FieldsSelection<Ticket, R>>}),
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticleObservableChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Observable<FieldsSelection<Article, R>>}),
    createTeam: ((args: {name: Scalars['String']}) => TeamObservableChain & {get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>) => Observable<FieldsSelection<Team, R>>})
}

export interface QueryPromiseChain{
    articles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Promise<FieldsSelection<Article, R>[]>}),
    teams: ({get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>[]) => Promise<FieldsSelection<Team, R>[]>})
}

export interface QueryObservableChain{
    articles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Observable<FieldsSelection<Article, R>[]>}),
    teams: ({get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>[]) => Observable<FieldsSelection<Team, R>[]>})
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
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    teamId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface TicketObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    teamId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}