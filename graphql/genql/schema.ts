import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Int: number,
    Boolean: boolean,
}

export interface Comment {
    comment: Scalars['ID']
    commentId: Scalars['ID']
    id: Scalars['ID']
    redditorId: Scalars['ID']
    __typename: 'Comment'
}

export interface Mutation {
    addManager: Warehouse
    addProductToWarehouse: Product
    comment: Comment
    create: Ticket
    createPost: Post
    createProduct: Product
    createRedditor: Redditor
    createTeam: Team
    createWarehouse: Warehouse
    updateStatus: Ticket
    __typename: 'Mutation'
}

export interface Post {
    comments: Comment[]
    id: Scalars['ID']
    post: Scalars['ID']
    redditorId: Scalars['ID']
    __typename: 'Post'
}

export interface Product {
    description?: Scalars['String']
    id: Scalars['ID']
    name: Scalars['ID']
    price?: Scalars['Int']
    __typename: 'Product'
}

export interface Query {
    getPost: Post[]
    getPostersComments: Comment[]
    getPosts: Post[]
    getWarehouse: Warehouse[]
    posts: Post[]
    products: Product[]
    redditors: Redditor[]
    teams: Team[]
    tickets: Ticket[]
    warehouses: Warehouse[]
    __typename: 'Query'
}

export interface Redditor {
    id: Scalars['ID']
    name: Scalars['ID']
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

export interface Warehouse {
    address: Scalars['String']
    id: Scalars['ID']
    manager?: Scalars['String']
    name: Scalars['String']
    __typename: 'Warehouse'
}

export interface CommentRequest{
    comment?: boolean | number
    commentId?: boolean | number
    id?: boolean | number
    redditorId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    addManager?: [{name: Scalars['String'],warehouseId: Scalars['String']},WarehouseRequest]
    addProductToWarehouse?: [{name: Scalars['String'],productId: Scalars['String'],warehouseId: Scalars['String']},ProductRequest]
    comment?: [{comment: Scalars['String'],postId: Scalars['String'],redditorId: Scalars['String']},CommentRequest]
    create?: [{teamId: Scalars['String'],title: Scalars['String']},TicketRequest]
    createPost?: [{post: Scalars['String'],redditorId: Scalars['String']},PostRequest]
    createProduct?: [{description?: (Scalars['String'] | null),name: Scalars['String'],price?: (Scalars['Int'] | null)},ProductRequest]
    createRedditor?: [{name: Scalars['String']},RedditorRequest]
    createTeam?: [{name: Scalars['String']},TeamRequest]
    createWarehouse?: [{input: WarehouseInput},WarehouseRequest]
    updateStatus?: [{status: ValidStatuses,teamId: Scalars['String'],ticketId: Scalars['String']},TicketRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostRequest{
    comments?: CommentRequest
    id?: boolean | number
    post?: boolean | number
    redditorId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductRequest{
    description?: boolean | number
    id?: boolean | number
    name?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    getPost?: [{postId: Scalars['String']},PostRequest]
    getPostersComments?: [{redditorId: Scalars['String']},CommentRequest]
    getPosts?: [{redditorId: Scalars['String']},PostRequest]
    getWarehouse?: [{id: Scalars['String']},WarehouseRequest]
    posts?: PostRequest
    products?: ProductRequest
    redditors?: RedditorRequest
    teams?: TeamRequest
    tickets?: [{id: Scalars['String']},TicketRequest]
    warehouses?: WarehouseRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RedditorRequest{
    id?: boolean | number
    name?: boolean | number
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

export interface WarehouseRequest{
    address?: boolean | number
    id?: boolean | number
    manager?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WarehouseInput {address?: (Scalars['String'] | null),name: Scalars['String']}


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



const Product_possibleTypes: string[] = ['Product']
export const isProduct = (obj?: { __typename?: any } | null): obj is Product => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isProduct"')
  return Product_possibleTypes.includes(obj.__typename)
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



const Warehouse_possibleTypes: string[] = ['Warehouse']
export const isWarehouse = (obj?: { __typename?: any } | null): obj is Warehouse => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isWarehouse"')
  return Warehouse_possibleTypes.includes(obj.__typename)
}


export interface CommentPromiseChain{
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    commentId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    redditorId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface CommentObservableChain{
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    commentId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    redditorId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface MutationPromiseChain{
    addManager: ((args: {name: Scalars['String'],warehouseId: Scalars['String']}) => WarehousePromiseChain & {get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>) => Promise<FieldsSelection<Warehouse, R>>}),
    addProductToWarehouse: ((args: {name: Scalars['String'],productId: Scalars['String'],warehouseId: Scalars['String']}) => ProductPromiseChain & {get: <R extends ProductRequest>(request: R, defaultValue?: FieldsSelection<Product, R>) => Promise<FieldsSelection<Product, R>>}),
    comment: ((args: {comment: Scalars['String'],postId: Scalars['String'],redditorId: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>}),
    create: ((args: {teamId: Scalars['String'],title: Scalars['String']}) => TicketPromiseChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Promise<FieldsSelection<Ticket, R>>}),
    createPost: ((args: {post: Scalars['String'],redditorId: Scalars['String']}) => PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Promise<FieldsSelection<Post, R>>}),
    createProduct: ((args: {description?: (Scalars['String'] | null),name: Scalars['String'],price?: (Scalars['Int'] | null)}) => ProductPromiseChain & {get: <R extends ProductRequest>(request: R, defaultValue?: FieldsSelection<Product, R>) => Promise<FieldsSelection<Product, R>>}),
    createRedditor: ((args: {name: Scalars['String']}) => RedditorPromiseChain & {get: <R extends RedditorRequest>(request: R, defaultValue?: FieldsSelection<Redditor, R>) => Promise<FieldsSelection<Redditor, R>>}),
    createTeam: ((args: {name: Scalars['String']}) => TeamPromiseChain & {get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>) => Promise<FieldsSelection<Team, R>>}),
    createWarehouse: ((args: {input: WarehouseInput}) => WarehousePromiseChain & {get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>) => Promise<FieldsSelection<Warehouse, R>>}),
    updateStatus: ((args: {status: ValidStatuses,teamId: Scalars['String'],ticketId: Scalars['String']}) => TicketPromiseChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Promise<FieldsSelection<Ticket, R>>})
}

export interface MutationObservableChain{
    addManager: ((args: {name: Scalars['String'],warehouseId: Scalars['String']}) => WarehouseObservableChain & {get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>) => Observable<FieldsSelection<Warehouse, R>>}),
    addProductToWarehouse: ((args: {name: Scalars['String'],productId: Scalars['String'],warehouseId: Scalars['String']}) => ProductObservableChain & {get: <R extends ProductRequest>(request: R, defaultValue?: FieldsSelection<Product, R>) => Observable<FieldsSelection<Product, R>>}),
    comment: ((args: {comment: Scalars['String'],postId: Scalars['String'],redditorId: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>}),
    create: ((args: {teamId: Scalars['String'],title: Scalars['String']}) => TicketObservableChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Observable<FieldsSelection<Ticket, R>>}),
    createPost: ((args: {post: Scalars['String'],redditorId: Scalars['String']}) => PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Observable<FieldsSelection<Post, R>>}),
    createProduct: ((args: {description?: (Scalars['String'] | null),name: Scalars['String'],price?: (Scalars['Int'] | null)}) => ProductObservableChain & {get: <R extends ProductRequest>(request: R, defaultValue?: FieldsSelection<Product, R>) => Observable<FieldsSelection<Product, R>>}),
    createRedditor: ((args: {name: Scalars['String']}) => RedditorObservableChain & {get: <R extends RedditorRequest>(request: R, defaultValue?: FieldsSelection<Redditor, R>) => Observable<FieldsSelection<Redditor, R>>}),
    createTeam: ((args: {name: Scalars['String']}) => TeamObservableChain & {get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>) => Observable<FieldsSelection<Team, R>>}),
    createWarehouse: ((args: {input: WarehouseInput}) => WarehouseObservableChain & {get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>) => Observable<FieldsSelection<Warehouse, R>>}),
    updateStatus: ((args: {status: ValidStatuses,teamId: Scalars['String'],ticketId: Scalars['String']}) => TicketObservableChain & {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>) => Observable<FieldsSelection<Ticket, R>>})
}

export interface PostPromiseChain{
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Promise<FieldsSelection<Comment, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    post: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    redditorId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface PostObservableChain{
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Observable<FieldsSelection<Comment, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    post: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    redditorId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface ProductPromiseChain{
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    price: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface ProductObservableChain{
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    price: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface QueryPromiseChain{
    getPost: ((args: {postId: Scalars['String']}) => {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>[]) => Promise<FieldsSelection<Post, R>[]>}),
    getPostersComments: ((args: {redditorId: Scalars['String']}) => {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Promise<FieldsSelection<Comment, R>[]>}),
    getPosts: ((args: {redditorId: Scalars['String']}) => {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>[]) => Promise<FieldsSelection<Post, R>[]>}),
    getWarehouse: ((args: {id: Scalars['String']}) => {get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>[]) => Promise<FieldsSelection<Warehouse, R>[]>}),
    posts: ({get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>[]) => Promise<FieldsSelection<Post, R>[]>}),
    products: ({get: <R extends ProductRequest>(request: R, defaultValue?: FieldsSelection<Product, R>[]) => Promise<FieldsSelection<Product, R>[]>}),
    redditors: ({get: <R extends RedditorRequest>(request: R, defaultValue?: FieldsSelection<Redditor, R>[]) => Promise<FieldsSelection<Redditor, R>[]>}),
    teams: ({get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>[]) => Promise<FieldsSelection<Team, R>[]>}),
    tickets: ((args: {id: Scalars['String']}) => {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>[]) => Promise<FieldsSelection<Ticket, R>[]>}),
    warehouses: ({get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>[]) => Promise<FieldsSelection<Warehouse, R>[]>})
}

export interface QueryObservableChain{
    getPost: ((args: {postId: Scalars['String']}) => {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>[]) => Observable<FieldsSelection<Post, R>[]>}),
    getPostersComments: ((args: {redditorId: Scalars['String']}) => {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Observable<FieldsSelection<Comment, R>[]>}),
    getPosts: ((args: {redditorId: Scalars['String']}) => {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>[]) => Observable<FieldsSelection<Post, R>[]>}),
    getWarehouse: ((args: {id: Scalars['String']}) => {get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>[]) => Observable<FieldsSelection<Warehouse, R>[]>}),
    posts: ({get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>[]) => Observable<FieldsSelection<Post, R>[]>}),
    products: ({get: <R extends ProductRequest>(request: R, defaultValue?: FieldsSelection<Product, R>[]) => Observable<FieldsSelection<Product, R>[]>}),
    redditors: ({get: <R extends RedditorRequest>(request: R, defaultValue?: FieldsSelection<Redditor, R>[]) => Observable<FieldsSelection<Redditor, R>[]>}),
    teams: ({get: <R extends TeamRequest>(request: R, defaultValue?: FieldsSelection<Team, R>[]) => Observable<FieldsSelection<Team, R>[]>}),
    tickets: ((args: {id: Scalars['String']}) => {get: <R extends TicketRequest>(request: R, defaultValue?: FieldsSelection<Ticket, R>[]) => Observable<FieldsSelection<Ticket, R>[]>}),
    warehouses: ({get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>[]) => Observable<FieldsSelection<Warehouse, R>[]>})
}

export interface RedditorPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface RedditorObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
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

export interface WarehousePromiseChain{
    address: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    manager: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface WarehouseObservableChain{
    address: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    manager: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}