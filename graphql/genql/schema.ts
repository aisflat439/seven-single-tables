import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
}

export interface Comment {
    comment: Scalars['ID']
    postId: Scalars['ID']
    redditorId: Scalars['ID']
    __typename: 'Comment'
}

export interface Mutation {
    comment: Comment
    create: Ticket
    createPost: Post
    createRedditor: Redditor
    createTeam: Team
    updateStatus: Ticket
    __typename: 'Mutation'
}

export interface Post {
    post: Scalars['ID']
    postId: Scalars['ID']
    redditorId: Scalars['ID']
    __typename: 'Post'
}

export interface Query {
    getPost: Post
    getPosts: Post[]
    redditors: Redditor[]
    teams: Team[]
    tickets: Ticket[]
    __typename: 'Query'
}

export interface Redditor {
    name: Scalars['ID']
    redditorId: Scalars['ID']
    __typename: 'Redditor'
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

export interface CommentRequest{
    comment?: boolean | number
    postId?: boolean | number
    redditorId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    comment?: [{comment: Scalars['String'],postId: Scalars['String'],redditorId: Scalars['String']},CommentRequest]
    create?: [{teamId: Scalars['String'],title: Scalars['String']},TicketRequest]
    createPost?: [{post: Scalars['String'],redditorId: Scalars['String']},PostRequest]
    createRedditor?: [{name: Scalars['String']},RedditorRequest]
    createTeam?: [{name: Scalars['String']},TeamRequest]
    updateStatus?: [{status: ValidStatuses,teamId: Scalars['String'],ticketId: Scalars['String']},TicketRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostRequest{
    post?: boolean | number
    postId?: boolean | number
    redditorId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    getPost?: [{postId: Scalars['String']},PostRequest]
    getPosts?: [{redditorId: Scalars['String']},PostRequest]
    redditors?: RedditorRequest
    teams?: TeamRequest
    tickets?: [{id: Scalars['String']},TicketRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RedditorRequest{
    name?: boolean | number
    redditorId?: boolean | number
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


const Comment_possibleTypes: string[] = ['Comment']
export const isComment = (obj?: { __typename?: any } | null): obj is Comment => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isComment"')
  return Comment_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Post_possibleTypes: string[] = ['Post']
export const isPost = (obj?: { __typename?: any } | null): obj is Post => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPost"')
  return Post_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Redditor_possibleTypes: string[] = ['Redditor']
export const isRedditor = (obj?: { __typename?: any } | null): obj is Redditor => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRedditor"')
  return Redditor_possibleTypes.includes(obj.__typename)
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


export interface CommentPromiseChain{
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    postId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    redditorId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface CommentObservableChain{
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    postId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    redditorId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface MutationPromiseChain{
    comment: ((args: {comment: Scalars['String'],postId: Scalars['String'],redditorId: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>}),
    create: ((args: {teamId: Scalars['String'],title: Scalars['String']}) => TicketPromiseChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Promise<FieldsSelection<Ticket, R>>}),
    createPost: ((args: {post: Scalars['String'],redditorId: Scalars['String']}) => PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Promise<FieldsSelection<Post, R>>}),
    createRedditor: ((args: {name: Scalars['String']}) => RedditorPromiseChain & {get: <R extends RedditorRequest>(request: R, defaultValue?: FieldsSelection<Redditor, R>) => Promise<FieldsSelection<Redditor, R>>}),
    createTeam: ((args: {name: Scalars['String']}) => TeamPromiseChain & {get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>) => Promise<FieldsSelection<Team, R>>}),
    updateStatus: ((args: {status: ValidStatuses,teamId: Scalars['String'],ticketId: Scalars['String']}) => TicketPromiseChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Promise<FieldsSelection<Ticket, R>>})
}

export interface MutationObservableChain{
    comment: ((args: {comment: Scalars['String'],postId: Scalars['String'],redditorId: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>}),
    create: ((args: {teamId: Scalars['String'],title: Scalars['String']}) => TicketObservableChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Observable<FieldsSelection<Ticket, R>>}),
    createPost: ((args: {post: Scalars['String'],redditorId: Scalars['String']}) => PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Observable<FieldsSelection<Post, R>>}),
    createRedditor: ((args: {name: Scalars['String']}) => RedditorObservableChain & {get: <R extends RedditorRequest>(request: R, defaultValue?: FieldsSelection<Redditor, R>) => Observable<FieldsSelection<Redditor, R>>}),
    createTeam: ((args: {name: Scalars['String']}) => TeamObservableChain & {get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>) => Observable<FieldsSelection<Team, R>>}),
    updateStatus: ((args: {status: ValidStatuses,teamId: Scalars['String'],ticketId: Scalars['String']}) => TicketObservableChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Observable<FieldsSelection<Ticket, R>>})
}

export interface PostPromiseChain{
    post: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    postId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    redditorId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface PostObservableChain{
    post: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    postId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    redditorId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface QueryPromiseChain{
    getPost: ((args: {postId: Scalars['String']}) => PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Promise<FieldsSelection<Post, R>>}),
    getPosts: ((args: {redditorId: Scalars['String']}) => {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>[]) => Promise<FieldsSelection<Post, R>[]>}),
    redditors: ({get: <R extends RedditorRequest>(request: R, defaultValue?: FieldsSelection<Redditor, R>[]) => Promise<FieldsSelection<Redditor, R>[]>}),
    teams: ({get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>[]) => Promise<FieldsSelection<Team, R>[]>}),
    tickets: ((args: {id: Scalars['String']}) => {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>[]) => Promise<FieldsSelection<Ticket, R>[]>})
}

export interface QueryObservableChain{
    getPost: ((args: {postId: Scalars['String']}) => PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Observable<FieldsSelection<Post, R>>}),
    getPosts: ((args: {redditorId: Scalars['String']}) => {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>[]) => Observable<FieldsSelection<Post, R>[]>}),
    redditors: ({get: <R extends RedditorRequest>(request: R, defaultValue?: FieldsSelection<Redditor, R>[]) => Observable<FieldsSelection<Redditor, R>[]>}),
    teams: ({get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>[]) => Observable<FieldsSelection<Team, R>[]>}),
    tickets: ((args: {id: Scalars['String']}) => {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>[]) => Observable<FieldsSelection<Ticket, R>[]>})
}

export interface RedditorPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    redditorId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface RedditorObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    redditorId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
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