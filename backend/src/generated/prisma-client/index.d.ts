// Code generated by Prisma (prisma@1.17.1). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { GraphQLSchema } from "graphql";
import { IResolvers } from "graphql-tools/dist/Interfaces";
import { makePrismaClientClass, BaseClientOptions } from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  role: (where?: RoleWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export interface Fragmentable {
  $fragment<T>(fragment: string | Object): T;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;
  $getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;

  /**
   * Queries
   */

  roles: (
    args?: {
      where?: RoleWhereInput;
      orderBy?: RoleOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => Promise<Array<RoleNode>>;
  rolesConnection: (
    args?: {
      where?: RoleWhereInput;
      orderBy?: RoleOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => RoleConnection;
  user: (where: UserWhereUniqueInput) => User;
  users: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => Promise<Array<UserNode>>;
  usersConnection: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => UserConnection;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createRole: (data: RoleCreateInput) => Role;
  updateManyRoles: (
    args: { data: RoleUpdateInput; where?: RoleWhereInput }
  ) => BatchPayload;
  deleteManyRoles: (where?: RoleWhereInput) => BatchPayload;
  createUser: (data: UserCreateInput) => User;
  updateUser: (
    args: { data: UserUpdateInput; where: UserWhereUniqueInput }
  ) => User;
  updateManyUsers: (
    args: { data: UserUpdateInput; where?: UserWhereInput }
  ) => BatchPayload;
  upsertUser: (
    args: {
      where: UserWhereUniqueInput;
      create: UserCreateInput;
      update: UserUpdateInput;
    }
  ) => User;
  deleteUser: (where: UserWhereUniqueInput) => User;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayload;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  role: (
    where?: RoleSubscriptionWhereInput
  ) => RoleSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type RoleOrderByInput =
  | "admin_ASC"
  | "admin_DESC"
  | "employee_ASC"
  | "employee_DESC"
  | "user_ASC"
  | "user_DESC"
  | "id_ASC"
  | "id_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "email_ASC"
  | "email_DESC"
  | "password_ASC"
  | "password_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface UserCreateWithoutRolesInput {
  name: String;
  email: String;
  password: String;
}

export interface RoleWhereInput {
  owner?: UserWhereInput;
  admin?: Boolean;
  admin_not?: Boolean;
  employee?: Boolean;
  employee_not?: Boolean;
  user?: Boolean;
  user_not?: Boolean;
  AND?: RoleWhereInput[] | RoleWhereInput;
  OR?: RoleWhereInput[] | RoleWhereInput;
  NOT?: RoleWhereInput[] | RoleWhereInput;
}

export interface RoleCreateOneWithoutOwnerInput {
  create?: RoleCreateWithoutOwnerInput;
}

export interface UserUpdateWithoutRolesDataInput {
  name?: String;
  email?: String;
  password?: String;
}

export interface UserCreateInput {
  name: String;
  email: String;
  password: String;
  roles: RoleCreateOneWithoutOwnerInput;
}

export interface UserUpdateOneRequiredWithoutRolesInput {
  create?: UserCreateWithoutRolesInput;
  update?: UserUpdateWithoutRolesDataInput;
  upsert?: UserUpsertWithoutRolesInput;
  connect?: UserWhereUniqueInput;
}

export interface UserUpsertWithoutRolesInput {
  update: UserUpdateWithoutRolesDataInput;
  create: UserCreateWithoutRolesInput;
}

export interface RoleSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: RoleWhereInput;
  AND?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput;
  OR?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput;
  NOT?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput;
}

export interface RoleUpdateWithoutOwnerDataInput {
  admin?: Boolean;
  employee?: Boolean;
  user?: Boolean;
}

export interface UserUpdateInput {
  name?: String;
  email?: String;
  password?: String;
  roles?: RoleUpdateOneRequiredWithoutOwnerInput;
}

export interface RoleUpdateInput {
  owner?: UserUpdateOneRequiredWithoutRolesInput;
  admin?: Boolean;
  employee?: Boolean;
  user?: Boolean;
}

export interface UserWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  email?: String;
  email_not?: String;
  email_in?: String[] | String;
  email_not_in?: String[] | String;
  email_lt?: String;
  email_lte?: String;
  email_gt?: String;
  email_gte?: String;
  email_contains?: String;
  email_not_contains?: String;
  email_starts_with?: String;
  email_not_starts_with?: String;
  email_ends_with?: String;
  email_not_ends_with?: String;
  password?: String;
  password_not?: String;
  password_in?: String[] | String;
  password_not_in?: String[] | String;
  password_lt?: String;
  password_lte?: String;
  password_gt?: String;
  password_gte?: String;
  password_contains?: String;
  password_not_contains?: String;
  password_starts_with?: String;
  password_not_starts_with?: String;
  password_ends_with?: String;
  password_not_ends_with?: String;
  roles?: RoleWhereInput;
  AND?: UserWhereInput[] | UserWhereInput;
  OR?: UserWhereInput[] | UserWhereInput;
  NOT?: UserWhereInput[] | UserWhereInput;
}

export interface UserCreateOneWithoutRolesInput {
  create?: UserCreateWithoutRolesInput;
  connect?: UserWhereUniqueInput;
}

export interface RoleCreateInput {
  owner: UserCreateOneWithoutRolesInput;
  admin?: Boolean;
  employee?: Boolean;
  user?: Boolean;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  email?: String;
}>;

export interface RoleUpdateOneRequiredWithoutOwnerInput {
  create?: RoleCreateWithoutOwnerInput;
  update?: RoleUpdateWithoutOwnerDataInput;
  upsert?: RoleUpsertWithoutOwnerInput;
}

export interface RoleUpsertWithoutOwnerInput {
  update: RoleUpdateWithoutOwnerDataInput;
  create: RoleCreateWithoutOwnerInput;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: UserWhereInput;
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
}

export interface RoleCreateWithoutOwnerInput {
  admin?: Boolean;
  employee?: Boolean;
  user?: Boolean;
}

export interface NodeNode {
  id: ID_Output;
}

export interface UserPreviousValuesNode {
  id: ID_Output;
  name: String;
  email: String;
  password: String;
}

export interface UserPreviousValues
  extends Promise<UserPreviousValuesNode>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValuesNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
}

export interface AggregateRoleNode {
  count: Int;
}

export interface AggregateRole
  extends Promise<AggregateRoleNode>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateRoleSubscription
  extends Promise<AsyncIterator<AggregateRoleNode>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface RoleSubscriptionPayloadNode {
  mutation: MutationType;
  updatedFields?: String[];
}

export interface RoleSubscriptionPayload
  extends Promise<RoleSubscriptionPayloadNode>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = Role>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = RolePreviousValues>() => T;
}

export interface RoleSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<RoleSubscriptionPayloadNode>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = RoleSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = RolePreviousValuesSubscription>() => T;
}

export interface RoleEdgeNode {
  cursor: String;
}

export interface RoleEdge extends Promise<RoleEdgeNode>, Fragmentable {
  node: <T = Role>() => T;
  cursor: () => Promise<String>;
}

export interface RoleEdgeSubscription
  extends Promise<AsyncIterator<RoleEdgeNode>>,
    Fragmentable {
  node: <T = RoleSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface PageInfoNode {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfo extends Promise<PageInfoNode>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfoNode>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayloadNode {
  mutation: MutationType;
  updatedFields?: String[];
}

export interface UserSubscriptionPayload
  extends Promise<UserSubscriptionPayloadNode>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = User>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValues>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayloadNode>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface RolePreviousValuesNode {
  admin: Boolean;
  employee: Boolean;
  user: Boolean;
}

export interface RolePreviousValues
  extends Promise<RolePreviousValuesNode>,
    Fragmentable {
  admin: () => Promise<Boolean>;
  employee: () => Promise<Boolean>;
  user: () => Promise<Boolean>;
}

export interface RolePreviousValuesSubscription
  extends Promise<AsyncIterator<RolePreviousValuesNode>>,
    Fragmentable {
  admin: () => Promise<AsyncIterator<Boolean>>;
  employee: () => Promise<AsyncIterator<Boolean>>;
  user: () => Promise<AsyncIterator<Boolean>>;
}

export interface UserNode {
  id: ID_Output;
  name: String;
  email: String;
  password: String;
}

export interface User extends Promise<UserNode>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  roles: <T = Role>() => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<UserNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  roles: <T = RoleSubscription>() => T;
}

export interface RoleConnectionNode {}

export interface RoleConnection
  extends Promise<RoleConnectionNode>,
    Fragmentable {
  pageInfo: <T = PageInfo>() => T;
  edges: <T = Promise<Array<RoleEdgeNode>>>() => T;
  aggregate: <T = AggregateRole>() => T;
}

export interface RoleConnectionSubscription
  extends Promise<AsyncIterator<RoleConnectionNode>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<Array<RoleEdgeSubscription>>>>() => T;
  aggregate: <T = AggregateRoleSubscription>() => T;
}

export interface AggregateUserNode {
  count: Int;
}

export interface AggregateUser
  extends Promise<AggregateUserNode>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUserNode>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserEdgeNode {
  cursor: String;
}

export interface UserEdge extends Promise<UserEdgeNode>, Fragmentable {
  node: <T = User>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdgeNode>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface BatchPayloadNode {
  count: Long;
}

export interface BatchPayload extends Promise<BatchPayloadNode>, Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayloadNode>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface RoleNode {
  admin: Boolean;
  employee: Boolean;
  user: Boolean;
}

export interface Role extends Promise<RoleNode>, Fragmentable {
  owner: <T = User>() => T;
  admin: () => Promise<Boolean>;
  employee: () => Promise<Boolean>;
  user: () => Promise<Boolean>;
}

export interface RoleSubscription
  extends Promise<AsyncIterator<RoleNode>>,
    Fragmentable {
  owner: <T = UserSubscription>() => T;
  admin: () => Promise<AsyncIterator<Boolean>>;
  employee: () => Promise<AsyncIterator<Boolean>>;
  user: () => Promise<AsyncIterator<Boolean>>;
}

export interface UserConnectionNode {}

export interface UserConnection
  extends Promise<UserConnectionNode>,
    Fragmentable {
  pageInfo: <T = PageInfo>() => T;
  edges: <T = Promise<Array<UserEdgeNode>>>() => T;
  aggregate: <T = AggregateUser>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnectionNode>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<Array<UserEdgeSubscription>>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

export type Long = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/**
 * Type Defs
 */

export const prisma: Prisma;
