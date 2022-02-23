import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '@the-devoyage/micro-auth-helpers';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ObjectID: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  _Any: any;
};

export enum ArrayFilterByEnum {
  In = 'IN',
  Nin = 'NIN'
}

export type BooleanArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
};

export type BooleanFieldFilter = {
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
};

export enum BooleanFilterByEnum {
  Eq = 'EQ',
  Ne = 'NE'
}

export type DeleteMediaInput = {
  _ids: Array<Scalars['ObjectID']>;
};

export type DeleteMediaResponse = {
  __typename?: 'DeleteMediaResponse';
  deletedCount: Scalars['Int'];
};

export type FilterConfig = {
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  pagination?: InputMaybe<Pagination>;
};

export type GetMediaInput = {
  _id?: InputMaybe<StringFieldFilter>;
  config?: InputMaybe<FilterConfig>;
  createdAt?: InputMaybe<StringFieldFilter>;
  created_by?: InputMaybe<StringFieldFilter>;
  mimetype?: InputMaybe<StringFieldFilter>;
  path?: InputMaybe<StringFieldFilter>;
  title?: InputMaybe<StringFieldFilter>;
  updatedAt?: InputMaybe<StringFieldFilter>;
};

export type GetMediaResponse = {
  __typename?: 'GetMediaResponse';
  data: Array<Media>;
  stats?: Maybe<Stats>;
};

export type IntArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: IntFilterByEnum;
  int: Scalars['Int'];
};

export type IntFieldFilter = {
  filterBy: IntFilterByEnum;
  int: Scalars['Int'];
};

export enum IntFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type Media = {
  __typename?: 'Media';
  _id: Scalars['ObjectID'];
  createdAt: Scalars['String'];
  created_by: User;
  mimetype: Scalars['String'];
  path: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteMedia: DeleteMediaResponse;
  singleFileUpload: Media;
};


export type MutationDeleteMediaArgs = {
  deleteMediaInput: DeleteMediaInput;
};


export type MutationSingleFileUploadArgs = {
  singleFileUploadInput: SingleFileUploadInput;
};

export enum OperatorFieldConfigEnum {
  And = 'AND',
  Or = 'OR'
}

export type Pagination = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  reverse?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getMedia: GetMediaResponse;
};


export type QueryGetMediaArgs = {
  getMediaInput: GetMediaInput;
};

export type SingleFileUploadInput = {
  file: Scalars['Upload'];
  title: Scalars['String'];
};

export type Stats = {
  __typename?: 'Stats';
  cursor?: Maybe<Scalars['DateTime']>;
  page?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type StringArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: StringFilterByEnum;
  string: Array<Scalars['String']>;
};

export type StringFieldFilter = {
  filterBy: StringFilterByEnum;
  string: Scalars['String'];
};

export enum StringFilterByEnum {
  Match = 'MATCH',
  Objectid = 'OBJECTID',
  Regex = 'REGEX'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectID'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ArrayFilterByEnum: ArrayFilterByEnum;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanArrayFilter: BooleanArrayFilter;
  BooleanFieldFilter: BooleanFieldFilter;
  BooleanFilterByEnum: BooleanFilterByEnum;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteMediaInput: DeleteMediaInput;
  DeleteMediaResponse: ResolverTypeWrapper<DeleteMediaResponse>;
  FilterConfig: FilterConfig;
  GetMediaInput: GetMediaInput;
  GetMediaResponse: ResolverTypeWrapper<GetMediaResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntArrayFilter: IntArrayFilter;
  IntFieldFilter: IntFieldFilter;
  IntFilterByEnum: IntFilterByEnum;
  Media: ResolverTypeWrapper<Media>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  OperatorFieldConfigEnum: OperatorFieldConfigEnum;
  Pagination: Pagination;
  Query: ResolverTypeWrapper<{}>;
  SingleFileUploadInput: SingleFileUploadInput;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringArrayFilter: StringArrayFilter;
  StringFieldFilter: StringFieldFilter;
  StringFilterByEnum: StringFilterByEnum;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _Entity: ResolversTypes['Media'] | ResolversTypes['User'];
  _Service: ResolverTypeWrapper<_Service>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  BooleanArrayFilter: BooleanArrayFilter;
  BooleanFieldFilter: BooleanFieldFilter;
  DateTime: Scalars['DateTime'];
  DeleteMediaInput: DeleteMediaInput;
  DeleteMediaResponse: DeleteMediaResponse;
  FilterConfig: FilterConfig;
  GetMediaInput: GetMediaInput;
  GetMediaResponse: GetMediaResponse;
  Int: Scalars['Int'];
  IntArrayFilter: IntArrayFilter;
  IntFieldFilter: IntFieldFilter;
  Media: Media;
  Mutation: {};
  ObjectID: Scalars['ObjectID'];
  Pagination: Pagination;
  Query: {};
  SingleFileUploadInput: SingleFileUploadInput;
  Stats: Stats;
  String: Scalars['String'];
  StringArrayFilter: StringArrayFilter;
  StringFieldFilter: StringFieldFilter;
  Upload: Scalars['Upload'];
  User: User;
  _Any: Scalars['_Any'];
  _Entity: ResolversParentTypes['Media'] | ResolversParentTypes['User'];
  _Service: _Service;
}>;

export type ExtendsDirectiveArgs = { };

export type ExtendsDirectiveResolver<Result, Parent, ContextType = Context, Args = ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteMediaResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteMediaResponse'] = ResolversParentTypes['DeleteMediaResponse']> = ResolversObject<{
  deletedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetMediaResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetMediaResponse'] = ResolversParentTypes['GetMediaResponse']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Media']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MediaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_by?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  deleteMedia?: Resolver<ResolversTypes['DeleteMediaResponse'], ParentType, ContextType, RequireFields<MutationDeleteMediaArgs, 'deleteMediaInput'>>;
  singleFileUpload?: Resolver<ResolversTypes['Media'], ParentType, ContextType, RequireFields<MutationSingleFileUploadArgs, 'singleFileUploadInput'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _entities?: Resolver<Array<Maybe<ResolversTypes['_Entity']>>, ParentType, ContextType, RequireFields<Query_EntitiesArgs, 'representations'>>;
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  getMedia?: Resolver<ResolversTypes['GetMediaResponse'], ParentType, ContextType, RequireFields<QueryGetMediaArgs, 'getMediaInput'>>;
}>;

export type StatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  remaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface _AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any';
}

export type _EntityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Media' | 'User', ParentType, ContextType>;
}>;

export type _ServiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']> = ResolversObject<{
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  DeleteMediaResponse?: DeleteMediaResponseResolvers<ContextType>;
  GetMediaResponse?: GetMediaResponseResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  _Any?: GraphQLScalarType;
  _Entity?: _EntityResolvers<ContextType>;
  _Service?: _ServiceResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
}>;
