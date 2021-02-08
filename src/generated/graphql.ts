import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export enum Genre {
  Action = 'ACTION',
  Adventure = 'ADVENTURE',
  Animation = 'ANIMATION',
  Comedy = 'COMEDY',
  Crime = 'CRIME',
  Documentary = 'DOCUMENTARY',
  Drama = 'DRAMA',
  Family = 'FAMILY',
  Fantasy = 'FANTASY',
  History = 'HISTORY',
  Horror = 'HORROR',
  Music = 'MUSIC',
  Mystery = 'MYSTERY',
  Romance = 'ROMANCE',
  Scifi = 'SCIFI',
  Tv = 'TV',
  Thriller = 'THRILLER',
  War = 'WAR',
  Western = 'WESTERN'
}

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['ID'];
  title: Scalars['String'];
  genre_ids: Array<Scalars['Int']>;
  genre_names: Array<Genre>;
  original_title: Maybe<Scalars['String']>;
  popularity: Maybe<Scalars['Float']>;
  vote_count: Maybe<Scalars['Int']>;
  poster_path: Maybe<Scalars['String']>;
  vote_average: Maybe<Scalars['Float']>;
  release_date: Maybe<Scalars['String']>;
};

export type MovieList = {
  __typename?: 'MovieList';
  movies: Array<Movie>;
  moreMovies: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  movie: Movie;
  movieSearch: MovieList;
  movieDiscover: MovieList;
};


export type QueryMovieArgs = {
  id: Scalars['String'];
};


export type QueryMovieSearchArgs = {
  query: Scalars['String'];
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryMovieDiscoverArgs = {
  sort_by: Maybe<SortBy>;
  sort_order: Maybe<SortOrder>;
  year: Maybe<Scalars['String']>;
  genres: Maybe<Array<Maybe<Genre>>>;
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};

export enum SortBy {
  Popularity = 'popularity',
  ReleaseDate = 'release_date',
  Revenue = 'revenue',
  OriginalTitle = 'original_title',
  VoteAverage = 'vote_average',
  VoteCount = 'vote_count'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Movie: ResolverTypeWrapper<Movie>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Genre: Genre;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  MovieList: ResolverTypeWrapper<MovieList>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  SortBy: SortBy;
  SortOrder: SortOrder;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  Movie: Movie;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Float: Scalars['Float'];
  MovieList: MovieList;
  Boolean: Scalars['Boolean'];
  Upload: Scalars['Upload'];
};

export type CacheControlDirectiveArgs = {   maxAge: Maybe<Scalars['Int']>;
  scope: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genre_ids: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  genre_names: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>;
  original_title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  poster_path: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  release_date: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieListResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieList'] = ResolversParentTypes['MovieList']> = {
  movies: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  moreMovies: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  movie: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<QueryMovieArgs, 'id'>>;
  movieSearch: Resolver<ResolversTypes['MovieList'], ParentType, ContextType, RequireFields<QueryMovieSearchArgs, 'query'>>;
  movieDiscover: Resolver<ResolversTypes['MovieList'], ParentType, ContextType, RequireFields<QueryMovieDiscoverArgs, never>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  Movie: MovieResolvers<ContextType>;
  MovieList: MovieListResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Upload: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;