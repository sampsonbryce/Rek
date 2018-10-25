module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAppointment {
  count: Int!
}

type AggregateEmployeeSchedule {
  count: Int!
}

type AggregateEmployeeToScheduleToServices {
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

type AggregateUserSchedule {
  count: Int!
}

type AggregateUserToSchedule {
  count: Int!
}

type AggregateWorkingTime {
  count: Int!
}

type Appointment {
  start: DateTime!
  end: DateTime!
}

type AppointmentConnection {
  pageInfo: PageInfo!
  edges: [AppointmentEdge]!
  aggregate: AggregateAppointment!
}

input AppointmentCreateInput {
  start: DateTime!
  end: DateTime!
}

input AppointmentCreateManyInput {
  create: [AppointmentCreateInput!]
}

type AppointmentEdge {
  node: Appointment!
  cursor: String!
}

enum AppointmentOrderByInput {
  start_ASC
  start_DESC
  end_ASC
  end_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AppointmentPreviousValues {
  start: DateTime!
  end: DateTime!
}

type AppointmentSubscriptionPayload {
  mutation: MutationType!
  node: Appointment
  updatedFields: [String!]
  previousValues: AppointmentPreviousValues
}

input AppointmentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AppointmentWhereInput
  AND: [AppointmentSubscriptionWhereInput!]
  OR: [AppointmentSubscriptionWhereInput!]
  NOT: [AppointmentSubscriptionWhereInput!]
}

input AppointmentUpdateInput {
  start: DateTime
  end: DateTime
}

input AppointmentUpdateManyInput {
  create: [AppointmentCreateInput!]
}

input AppointmentWhereInput {
  start: DateTime
  start_not: DateTime
  start_in: [DateTime!]
  start_not_in: [DateTime!]
  start_lt: DateTime
  start_lte: DateTime
  start_gt: DateTime
  start_gte: DateTime
  end: DateTime
  end_not: DateTime
  end_in: [DateTime!]
  end_not_in: [DateTime!]
  end_lt: DateTime
  end_lte: DateTime
  end_gt: DateTime
  end_gte: DateTime
  AND: [AppointmentWhereInput!]
  OR: [AppointmentWhereInput!]
  NOT: [AppointmentWhereInput!]
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type EmployeeSchedule {
  employee: User!
  workingTimes(where: WorkingTimeWhereInput, orderBy: WorkingTimeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [WorkingTime!]
  appointments(where: AppointmentWhereInput, orderBy: AppointmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Appointment!]
}

type EmployeeScheduleConnection {
  pageInfo: PageInfo!
  edges: [EmployeeScheduleEdge]!
  aggregate: AggregateEmployeeSchedule!
}

input EmployeeScheduleCreateInput {
  employee: UserCreateOneInput!
  workingTimes: WorkingTimeCreateManyInput
  appointments: AppointmentCreateManyInput
}

input EmployeeScheduleCreateOneInput {
  create: EmployeeScheduleCreateInput
}

type EmployeeScheduleEdge {
  node: EmployeeSchedule!
  cursor: String!
}

enum EmployeeScheduleOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EmployeeScheduleSubscriptionPayload {
  mutation: MutationType!
  node: EmployeeSchedule
  updatedFields: [String!]
}

input EmployeeScheduleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EmployeeScheduleWhereInput
  AND: [EmployeeScheduleSubscriptionWhereInput!]
  OR: [EmployeeScheduleSubscriptionWhereInput!]
  NOT: [EmployeeScheduleSubscriptionWhereInput!]
}

input EmployeeScheduleUpdateDataInput {
  employee: UserUpdateOneRequiredInput
  workingTimes: WorkingTimeUpdateManyInput
  appointments: AppointmentUpdateManyInput
}

input EmployeeScheduleUpdateInput {
  employee: UserUpdateOneRequiredInput
  workingTimes: WorkingTimeUpdateManyInput
  appointments: AppointmentUpdateManyInput
}

input EmployeeScheduleUpdateOneRequiredInput {
  create: EmployeeScheduleCreateInput
  update: EmployeeScheduleUpdateDataInput
  upsert: EmployeeScheduleUpsertNestedInput
}

input EmployeeScheduleUpsertNestedInput {
  update: EmployeeScheduleUpdateDataInput!
  create: EmployeeScheduleCreateInput!
}

input EmployeeScheduleWhereInput {
  employee: UserWhereInput
  workingTimes_every: WorkingTimeWhereInput
  workingTimes_some: WorkingTimeWhereInput
  workingTimes_none: WorkingTimeWhereInput
  appointments_every: AppointmentWhereInput
  appointments_some: AppointmentWhereInput
  appointments_none: AppointmentWhereInput
  AND: [EmployeeScheduleWhereInput!]
  OR: [EmployeeScheduleWhereInput!]
  NOT: [EmployeeScheduleWhereInput!]
}

type EmployeeToScheduleToServices {
  id: ID!
  employee: User!
  schedule: EmployeeSchedule!
  services(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Service!]
}

type EmployeeToScheduleToServicesConnection {
  pageInfo: PageInfo!
  edges: [EmployeeToScheduleToServicesEdge]!
  aggregate: AggregateEmployeeToScheduleToServices!
}

input EmployeeToScheduleToServicesCreateInput {
  employee: UserCreateOneInput!
  schedule: EmployeeScheduleCreateOneInput!
  services: ServiceCreateManyInput
}

type EmployeeToScheduleToServicesEdge {
  node: EmployeeToScheduleToServices!
  cursor: String!
}

enum EmployeeToScheduleToServicesOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EmployeeToScheduleToServicesPreviousValues {
  id: ID!
}

type EmployeeToScheduleToServicesSubscriptionPayload {
  mutation: MutationType!
  node: EmployeeToScheduleToServices
  updatedFields: [String!]
  previousValues: EmployeeToScheduleToServicesPreviousValues
}

input EmployeeToScheduleToServicesSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EmployeeToScheduleToServicesWhereInput
  AND: [EmployeeToScheduleToServicesSubscriptionWhereInput!]
  OR: [EmployeeToScheduleToServicesSubscriptionWhereInput!]
  NOT: [EmployeeToScheduleToServicesSubscriptionWhereInput!]
}

input EmployeeToScheduleToServicesUpdateInput {
  employee: UserUpdateOneRequiredInput
  schedule: EmployeeScheduleUpdateOneRequiredInput
  services: ServiceUpdateManyInput
}

input EmployeeToScheduleToServicesWhereInput {
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
  employee: UserWhereInput
  schedule: EmployeeScheduleWhereInput
  services_every: ServiceWhereInput
  services_some: ServiceWhereInput
  services_none: ServiceWhereInput
  AND: [EmployeeToScheduleToServicesWhereInput!]
  OR: [EmployeeToScheduleToServicesWhereInput!]
  NOT: [EmployeeToScheduleToServicesWhereInput!]
}

input EmployeeToScheduleToServicesWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createAppointment(data: AppointmentCreateInput!): Appointment!
  updateManyAppointments(data: AppointmentUpdateInput!, where: AppointmentWhereInput): BatchPayload!
  deleteManyAppointments(where: AppointmentWhereInput): BatchPayload!
  createEmployeeSchedule(data: EmployeeScheduleCreateInput!): EmployeeSchedule!
  updateManyEmployeeSchedules(data: EmployeeScheduleUpdateInput!, where: EmployeeScheduleWhereInput): BatchPayload!
  deleteManyEmployeeSchedules(where: EmployeeScheduleWhereInput): BatchPayload!
  createEmployeeToScheduleToServices(data: EmployeeToScheduleToServicesCreateInput!): EmployeeToScheduleToServices!
  updateEmployeeToScheduleToServices(data: EmployeeToScheduleToServicesUpdateInput!, where: EmployeeToScheduleToServicesWhereUniqueInput!): EmployeeToScheduleToServices
  updateManyEmployeeToScheduleToServiceses(data: EmployeeToScheduleToServicesUpdateInput!, where: EmployeeToScheduleToServicesWhereInput): BatchPayload!
  upsertEmployeeToScheduleToServices(where: EmployeeToScheduleToServicesWhereUniqueInput!, create: EmployeeToScheduleToServicesCreateInput!, update: EmployeeToScheduleToServicesUpdateInput!): EmployeeToScheduleToServices!
  deleteEmployeeToScheduleToServices(where: EmployeeToScheduleToServicesWhereUniqueInput!): EmployeeToScheduleToServices
  deleteManyEmployeeToScheduleToServiceses(where: EmployeeToScheduleToServicesWhereInput): BatchPayload!
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
  createUserSchedule(data: UserScheduleCreateInput!): UserSchedule!
  updateManyUserSchedules(data: UserScheduleUpdateInput!, where: UserScheduleWhereInput): BatchPayload!
  deleteManyUserSchedules(where: UserScheduleWhereInput): BatchPayload!
  createUserToSchedule(data: UserToScheduleCreateInput!): UserToSchedule!
  updateManyUserToSchedules(data: UserToScheduleUpdateInput!, where: UserToScheduleWhereInput): BatchPayload!
  deleteManyUserToSchedules(where: UserToScheduleWhereInput): BatchPayload!
  createWorkingTime(data: WorkingTimeCreateInput!): WorkingTime!
  updateManyWorkingTimes(data: WorkingTimeUpdateInput!, where: WorkingTimeWhereInput): BatchPayload!
  deleteManyWorkingTimes(where: WorkingTimeWhereInput): BatchPayload!
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
  appointments(where: AppointmentWhereInput, orderBy: AppointmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Appointment]!
  appointmentsConnection(where: AppointmentWhereInput, orderBy: AppointmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AppointmentConnection!
  employeeSchedules(where: EmployeeScheduleWhereInput, orderBy: EmployeeScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EmployeeSchedule]!
  employeeSchedulesConnection(where: EmployeeScheduleWhereInput, orderBy: EmployeeScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EmployeeScheduleConnection!
  employeeToScheduleToServices(where: EmployeeToScheduleToServicesWhereUniqueInput!): EmployeeToScheduleToServices
  employeeToScheduleToServiceses(where: EmployeeToScheduleToServicesWhereInput, orderBy: EmployeeToScheduleToServicesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EmployeeToScheduleToServices]!
  employeeToScheduleToServicesesConnection(where: EmployeeToScheduleToServicesWhereInput, orderBy: EmployeeToScheduleToServicesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EmployeeToScheduleToServicesConnection!
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role]!
  rolesConnection(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoleConnection!
  service(where: ServiceWhereUniqueInput!): Service
  services(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Service]!
  servicesConnection(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ServiceConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  userSchedules(where: UserScheduleWhereInput, orderBy: UserScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserSchedule]!
  userSchedulesConnection(where: UserScheduleWhereInput, orderBy: UserScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserScheduleConnection!
  userToSchedules(where: UserToScheduleWhereInput, orderBy: UserToScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserToSchedule]!
  userToSchedulesConnection(where: UserToScheduleWhereInput, orderBy: UserToScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserToScheduleConnection!
  workingTimes(where: WorkingTimeWhereInput, orderBy: WorkingTimeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [WorkingTime]!
  workingTimesConnection(where: WorkingTimeWhereInput, orderBy: WorkingTimeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WorkingTimeConnection!
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
  female_title: String!
  male_title: String!
  time_blocks: Int!
}

type ServiceConnection {
  pageInfo: PageInfo!
  edges: [ServiceEdge]!
  aggregate: AggregateService!
}

input ServiceCreateInput {
  name: String!
  female_title: String!
  male_title: String!
  time_blocks: Int
}

input ServiceCreateManyInput {
  create: [ServiceCreateInput!]
  connect: [ServiceWhereUniqueInput!]
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
  female_title_ASC
  female_title_DESC
  male_title_ASC
  male_title_DESC
  time_blocks_ASC
  time_blocks_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ServicePreviousValues {
  id: ID!
  name: String!
  female_title: String!
  male_title: String!
  time_blocks: Int!
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
  female_title: String
  male_title: String
  time_blocks: Int
}

input ServiceUpdateInput {
  name: String
  female_title: String
  male_title: String
  time_blocks: Int
}

input ServiceUpdateManyInput {
  create: [ServiceCreateInput!]
  update: [ServiceUpdateWithWhereUniqueNestedInput!]
  upsert: [ServiceUpsertWithWhereUniqueNestedInput!]
  delete: [ServiceWhereUniqueInput!]
  connect: [ServiceWhereUniqueInput!]
  disconnect: [ServiceWhereUniqueInput!]
}

input ServiceUpdateWithWhereUniqueNestedInput {
  where: ServiceWhereUniqueInput!
  data: ServiceUpdateDataInput!
}

input ServiceUpsertWithWhereUniqueNestedInput {
  where: ServiceWhereUniqueInput!
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
  female_title: String
  female_title_not: String
  female_title_in: [String!]
  female_title_not_in: [String!]
  female_title_lt: String
  female_title_lte: String
  female_title_gt: String
  female_title_gte: String
  female_title_contains: String
  female_title_not_contains: String
  female_title_starts_with: String
  female_title_not_starts_with: String
  female_title_ends_with: String
  female_title_not_ends_with: String
  male_title: String
  male_title_not: String
  male_title_in: [String!]
  male_title_not_in: [String!]
  male_title_lt: String
  male_title_lte: String
  male_title_gt: String
  male_title_gte: String
  male_title_contains: String
  male_title_not_contains: String
  male_title_starts_with: String
  male_title_not_starts_with: String
  male_title_ends_with: String
  male_title_not_ends_with: String
  time_blocks: Int
  time_blocks_not: Int
  time_blocks_in: [Int!]
  time_blocks_not_in: [Int!]
  time_blocks_lt: Int
  time_blocks_lte: Int
  time_blocks_gt: Int
  time_blocks_gte: Int
  AND: [ServiceWhereInput!]
  OR: [ServiceWhereInput!]
  NOT: [ServiceWhereInput!]
}

input ServiceWhereUniqueInput {
  id: ID
  name: String
}

type Subscription {
  appointment(where: AppointmentSubscriptionWhereInput): AppointmentSubscriptionPayload
  employeeSchedule(where: EmployeeScheduleSubscriptionWhereInput): EmployeeScheduleSubscriptionPayload
  employeeToScheduleToServices(where: EmployeeToScheduleToServicesSubscriptionWhereInput): EmployeeToScheduleToServicesSubscriptionPayload
  role(where: RoleSubscriptionWhereInput): RoleSubscriptionPayload
  service(where: ServiceSubscriptionWhereInput): ServiceSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  userSchedule(where: UserScheduleSubscriptionWhereInput): UserScheduleSubscriptionPayload
  userToSchedule(where: UserToScheduleSubscriptionWhereInput): UserToScheduleSubscriptionPayload
  workingTime(where: WorkingTimeSubscriptionWhereInput): WorkingTimeSubscriptionPayload
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

type UserSchedule {
  appointments(where: AppointmentWhereInput, orderBy: AppointmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Appointment!]
}

type UserScheduleConnection {
  pageInfo: PageInfo!
  edges: [UserScheduleEdge]!
  aggregate: AggregateUserSchedule!
}

input UserScheduleCreateInput {
  appointments: AppointmentCreateManyInput
}

input UserScheduleCreateOneInput {
  create: UserScheduleCreateInput
}

type UserScheduleEdge {
  node: UserSchedule!
  cursor: String!
}

enum UserScheduleOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserScheduleSubscriptionPayload {
  mutation: MutationType!
  node: UserSchedule
  updatedFields: [String!]
}

input UserScheduleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserScheduleWhereInput
  AND: [UserScheduleSubscriptionWhereInput!]
  OR: [UserScheduleSubscriptionWhereInput!]
  NOT: [UserScheduleSubscriptionWhereInput!]
}

input UserScheduleUpdateDataInput {
  appointments: AppointmentUpdateManyInput
}

input UserScheduleUpdateInput {
  appointments: AppointmentUpdateManyInput
}

input UserScheduleUpdateOneRequiredInput {
  create: UserScheduleCreateInput
  update: UserScheduleUpdateDataInput
  upsert: UserScheduleUpsertNestedInput
}

input UserScheduleUpsertNestedInput {
  update: UserScheduleUpdateDataInput!
  create: UserScheduleCreateInput!
}

input UserScheduleWhereInput {
  appointments_every: AppointmentWhereInput
  appointments_some: AppointmentWhereInput
  appointments_none: AppointmentWhereInput
  AND: [UserScheduleWhereInput!]
  OR: [UserScheduleWhereInput!]
  NOT: [UserScheduleWhereInput!]
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

type UserToSchedule {
  user: User!
  schedule: UserSchedule!
}

type UserToScheduleConnection {
  pageInfo: PageInfo!
  edges: [UserToScheduleEdge]!
  aggregate: AggregateUserToSchedule!
}

input UserToScheduleCreateInput {
  user: UserCreateOneInput!
  schedule: UserScheduleCreateOneInput!
}

type UserToScheduleEdge {
  node: UserToSchedule!
  cursor: String!
}

enum UserToScheduleOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserToScheduleSubscriptionPayload {
  mutation: MutationType!
  node: UserToSchedule
  updatedFields: [String!]
}

input UserToScheduleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserToScheduleWhereInput
  AND: [UserToScheduleSubscriptionWhereInput!]
  OR: [UserToScheduleSubscriptionWhereInput!]
  NOT: [UserToScheduleSubscriptionWhereInput!]
}

input UserToScheduleUpdateInput {
  user: UserUpdateOneRequiredInput
  schedule: UserScheduleUpdateOneRequiredInput
}

input UserToScheduleWhereInput {
  user: UserWhereInput
  schedule: UserScheduleWhereInput
  AND: [UserToScheduleWhereInput!]
  OR: [UserToScheduleWhereInput!]
  NOT: [UserToScheduleWhereInput!]
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

type WorkingTime {
  start: DateTime!
  end: DateTime!
}

type WorkingTimeConnection {
  pageInfo: PageInfo!
  edges: [WorkingTimeEdge]!
  aggregate: AggregateWorkingTime!
}

input WorkingTimeCreateInput {
  start: DateTime!
  end: DateTime!
}

input WorkingTimeCreateManyInput {
  create: [WorkingTimeCreateInput!]
}

type WorkingTimeEdge {
  node: WorkingTime!
  cursor: String!
}

enum WorkingTimeOrderByInput {
  start_ASC
  start_DESC
  end_ASC
  end_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type WorkingTimePreviousValues {
  start: DateTime!
  end: DateTime!
}

type WorkingTimeSubscriptionPayload {
  mutation: MutationType!
  node: WorkingTime
  updatedFields: [String!]
  previousValues: WorkingTimePreviousValues
}

input WorkingTimeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: WorkingTimeWhereInput
  AND: [WorkingTimeSubscriptionWhereInput!]
  OR: [WorkingTimeSubscriptionWhereInput!]
  NOT: [WorkingTimeSubscriptionWhereInput!]
}

input WorkingTimeUpdateInput {
  start: DateTime
  end: DateTime
}

input WorkingTimeUpdateManyInput {
  create: [WorkingTimeCreateInput!]
}

input WorkingTimeWhereInput {
  start: DateTime
  start_not: DateTime
  start_in: [DateTime!]
  start_not_in: [DateTime!]
  start_lt: DateTime
  start_lte: DateTime
  start_gt: DateTime
  start_gte: DateTime
  end: DateTime
  end_not: DateTime
  end_in: [DateTime!]
  end_not_in: [DateTime!]
  end_lt: DateTime
  end_lte: DateTime
  end_gt: DateTime
  end_gte: DateTime
  AND: [WorkingTimeWhereInput!]
  OR: [WorkingTimeWhereInput!]
  NOT: [WorkingTimeWhereInput!]
}
`
      }
    