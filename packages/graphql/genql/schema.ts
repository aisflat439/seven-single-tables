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

export interface CommentGenqlSelection{
    comment?: boolean | number
    commentId?: boolean | number
    id?: boolean | number
    redditorId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    addManager?: (WarehouseGenqlSelection & { __args: {name: Scalars['String'], warehouseId: Scalars['String']} })
    addProductToWarehouse?: (ProductGenqlSelection & { __args: {name: Scalars['String'], productId: Scalars['String'], warehouseId: Scalars['String']} })
    comment?: (CommentGenqlSelection & { __args: {comment: Scalars['String'], postId: Scalars['String'], redditorId: Scalars['String']} })
    create?: (TicketGenqlSelection & { __args: {teamId: Scalars['String'], title: Scalars['String']} })
    createPost?: (PostGenqlSelection & { __args: {post: Scalars['String'], redditorId: Scalars['String']} })
    createProduct?: (ProductGenqlSelection & { __args: {description?: (Scalars['String'] | null), name: Scalars['String'], price?: (Scalars['Int'] | null)} })
    createRedditor?: (RedditorGenqlSelection & { __args: {name: Scalars['String']} })
    createTeam?: (TeamGenqlSelection & { __args: {name: Scalars['String']} })
    createWarehouse?: (WarehouseGenqlSelection & { __args: {input: WarehouseInput} })
    updateStatus?: (TicketGenqlSelection & { __args: {status: ValidStatuses, teamId: Scalars['String'], ticketId: Scalars['String']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostGenqlSelection{
    comments?: CommentGenqlSelection
    id?: boolean | number
    post?: boolean | number
    redditorId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductGenqlSelection{
    description?: boolean | number
    id?: boolean | number
    name?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    getPost?: (PostGenqlSelection & { __args: {postId: Scalars['String']} })
    getPostersComments?: (CommentGenqlSelection & { __args: {redditorId: Scalars['String']} })
    getPosts?: (PostGenqlSelection & { __args: {redditorId: Scalars['String']} })
    getWarehouse?: (WarehouseGenqlSelection & { __args: {id: Scalars['String']} })
    posts?: PostGenqlSelection
    products?: ProductGenqlSelection
    redditors?: RedditorGenqlSelection
    teams?: TeamGenqlSelection
    tickets?: (TicketGenqlSelection & { __args: {id: Scalars['String']} })
    warehouses?: WarehouseGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RedditorGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TeamGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TicketGenqlSelection{
    status?: boolean | number
    teamId?: boolean | number
    ticketId?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WarehouseGenqlSelection{
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
    

export const enumValidStatuses = {
   blocked: 'blocked' as const,
   complete: 'complete' as const,
   inprogress: 'inprogress' as const,
   pending: 'pending' as const
}
