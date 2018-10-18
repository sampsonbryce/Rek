module.exports = {
        typeDefs: /* GraphQL */ `type AggregateEmployeeToService {
  count: Int!
}

type AggregateRole {
  count: Int!
}

type AggregateService {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type EmployeeToService {
  employee: User!
  service: Service!
}

type EmployeeToServiceConnection {
  pageInfo: PageInfo!
  edges: [EmployeeToServiceEdge]!
  aggregate: AggregateEmployeeToService!
}

input EmployeeToServiceCreateInput {
  employee: UserCreateOneInput!
  service: ServiceCreateOneInput!
}

type EmployeeToServiceEdge {
  node: EmployeeToService!
  cursor: String!
}

enum EmployeeToServiceOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EmployeeToServiceSubscriptionPayload {
  mutation: MutationType!
  node: EmployeeToService
  updatedFields: [String!]
}

input EmployeeToServiceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EmployeeToServiceWhereInput
  AND: [EmployeeToServiceSubscriptionWhereInput!]
  OR: [EmployeeToServiceSubscriptionWhereInput!]
  NOT: [EmployeeToServiceSubscriptionWhereInput!]
}

input EmployeeToServiceUpdateInput {
  employee: UserUpdateOneRequiredInput
  service: ServiceUpdateOneRequiredInput
}

input EmployeeToServiceWhereInput {
  employee: UserWhereInput
  service: ServiceWhereInput
  AND: [EmployeeToServiceWhereInput!]
  OR: [EmployeeToServiceWhereInput!]
  NOT: [EmployeeToServiceWhereInput!]
}

scalar Long

type Mutation {
  createEmployeeToService(data: EmployeeToServiceCreateInput!): EmployeeToService!
  updateManyEmployeeToServices(data: EmployeeToServiceUpdateInput!, where: EmployeeToServiceWhereInput): BatchPayload!
  deleteManyEmployeeToServices(where: EmployeeToServiceWhereInput): BatchPayload!
  createRole(data: RoleCreateInput!): Role!
  updateManyRoles(data: RoleUpdateInput!, where: RoleWhereInput): BatchPayload!
  deleteManyRoles(where: RoleWhereInput): BatchPayload!
  createService(data: ServiceCreateInput!): Service!
  updateService(data: ServiceUpdateInput!, where: ServiceWhereUniqueInput!): Service
  updateManyServices(data: ServiceUpdateInput!, where: ServiceWhereInput): BatchPayload!
  upsertService(where: ServiceWhereUniqueInput!, create: ServiceCreateInput!, update: ServiceUpdateInput!): Service!
  deleteService(where: ServiceWhereUniqueInput!): Service
  deleteManyServices(where: ServiceWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  employeeToServices(where: EmployeeToServiceWhereInput, orderBy: EmployeeToServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EmployeeToService]!
  employeeToServicesConnection(where: EmployeeToServiceWhereInput, orderBy: EmployeeToServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EmployeeToServiceConnection!
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role]!
  rolesConnection(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoleConnection!
  service(where: ServiceWhereUniqueInput!): Service
  services(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Service]!
  servicesConnection(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ServiceConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Role {
  owner: User!
  admin: Boolean!
  employee: Boolean!
  user: Boolean!
}

type RoleConnection {
  pageInfo: PageInfo!
  edges: [RoleEdge]!
  aggregate: AggregateRole!
}

input RoleCreateInput {
  owner: UserCreateOneWithoutRolesInput!
  admin: Boolean
  employee: Boolean
  user: Boolean
}

input RoleCreateOneWithoutOwnerInput {
  create: RoleCreateWithoutOwnerInput
}

input RoleCreateWithoutOwnerInput {
  admin: Boolean
  employee: Boolean
  user: Boolean
}

type RoleEdge {
  node: Role!
  cursor: String!
}

enum RoleOrderByInput {
  admin_ASC
  admin_DESC
  employee_ASC
  employee_DESC
  user_ASC
  user_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RolePreviousValues {
  admin: Boolean!
  employee: Boolean!
  user: Boolean!
}

type RoleSubscriptionPayload {
  mutation: MutationType!
  node: Role
  updatedFields: [String!]
  previousValues: RolePreviousValues
}

input RoleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RoleWhereInput
  AND: [RoleSubscriptionWhereInput!]
  OR: [RoleSubscriptionWhereInput!]
  NOT: [RoleSubscriptionWhereInput!]
}

input RoleUpdateInput {
  owner: UserUpdateOneRequiredWithoutRolesInput
  admin: Boolean
  employee: Boolean
  user: Boolean
}

input RoleUpdateOneRequiredWithoutOwnerInput {
  create: RoleCreateWithoutOwnerInput
  update: RoleUpdateWithoutOwnerDataInput
  upsert: RoleUpsertWithoutOwnerInput
}

input RoleUpdateWithoutOwnerDataInput {
  admin: Boolean
  employee: Boolean
  user: Boolean
}

input RoleUpsertWithoutOwnerInput {
  update: RoleUpdateWithoutOwnerDataInput!
  create: RoleCreateWithoutOwnerInput!
}

input RoleWhereInput {
  owner: UserWhereInput
  admin: Boolean
  admin_not: Boolean
  employee: Boolean
  employee_not: Boolean
  user: Boolean
  user_not: Boolean
  AND: [RoleWhereInput!]
  OR: [RoleWhereInput!]
  NOT: [RoleWhereInput!]
}

type Service {
  id: ID!
  name: String!
}

type ServiceConnection {
  pageInfo: PageInfo!
  edges: [ServiceEdge]!
  aggregate: AggregateService!
}

input ServiceCreateInput {
  name: String!
}

input ServiceCreateOneInput {
  create: ServiceCreateInput
  connect: ServiceWhereUniqueInput
}

type ServiceEdge {
  node: Service!
  cursor: String!
}

enum ServiceOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ServicePreviousValues {
  id: ID!
  name: String!
}

type ServiceSubscriptionPayload {
  mutation: MutationType!
  node: Service
  updatedFields: [String!]
  previousValues: ServicePreviousValues
}

input ServiceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ServiceWhereInput
  AND: [ServiceSubscriptionWhereInput!]
  OR: [ServiceSubscriptionWhereInput!]
  NOT: [ServiceSubscriptionWhereInput!]
}

input ServiceUpdateDataInput {
  name: String
}

input ServiceUpdateInput {
  name: String
}

input ServiceUpdateOneRequiredInput {
  create: ServiceCreateInput
  update: ServiceUpdateDataInput
  upsert: ServiceUpsertNestedInput
  connect: ServiceWhereUniqueInput
}

input ServiceUpsertNestedInput {
  update: ServiceUpdateDataInput!
  create: ServiceCreateInput!
}

input ServiceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [ServiceWhereInput!]
  OR: [ServiceWhereInput!]
  NOT: [ServiceWhereInput!]
}

input ServiceWhereUniqueInput {
  id: ID
  name: String
}

type Subscription {
  employeeToService(where: EmployeeToServiceSubscriptionWhereInput): EmployeeToServiceSubscriptionPayload
  role(where: RoleSubscriptionWhereInput): RoleSubscriptionPayload
  service(where: ServiceSubscriptionWhereInput): ServiceSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  roles: Role!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  password: String!
  roles: RoleCreateOneWithoutOwnerInput!
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutRolesInput {
  create: UserCreateWithoutRolesInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutRolesInput {
  name: String!
  email: String!
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  name: String
  email: String
  password: String
  roles: RoleUpdateOneRequiredWithoutOwnerInput
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  roles: RoleUpdateOneRequiredWithoutOwnerInput
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutRolesInput {
  create: UserCreateWithoutRolesInput
  update: UserUpdateWithoutRolesDataInput
  upsert: UserUpsertWithoutRolesInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutRolesDataInput {
  name: String
  email: String
  password: String
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutRolesInput {
  update: UserUpdateWithoutRolesDataInput!
  create: UserCreateWithoutRolesInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  roles: RoleWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    