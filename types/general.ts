import type { SvgIconTypeMap } from '@material-ui/core';
import type { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { Moment } from 'moment';

import { GROUP } from '../constants/slugs';

export type DevtoSortOptions = 'date' | 'views' | 'likes' | 'comments';

export interface IArticle {
  id: string;
  title: string;
  published_at: string;
  url: string;
  public_reactions_count: number;
  page_views_count: number;
  comments_count: number;
  cover_image: string;
  tag_list: Array<string>;
}

export type DailyViews = {
  date: string;
  views: number;
};

export interface IViews {
  id: string;
  slug: string;
  totalViews: number;
  viewsData: DailyViews[];
}

export interface IRepo {
  name: string;
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  homepage: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  license: {
    spdx_id: string;
  };
  owner: {
    login: string;
  };
}

export interface IGithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  followers: number;
  totalStarsAndForks: {
    stars: number;
    forks: number;
  };
}

export type GithubSortOptions = 'stars' | 'forks' | 'upd';

export interface ISlug {
  slug: string;
  description: string;
  published: string;
  group: GROUP;
}

export interface IMappedDoc extends ISlug {
  _id: number | string;
  totalViews: number;
  viewsData: DailyViews[];
  thisWeekViews: number;
  change: number;
}

export type TwitterSortOptions = 'date' | 'retweets' | 'likes';

export interface INpmDownloads {
  downloads: number;
  day: string;
}

export interface ITweet {
  text: string;
  created_at: string;
  retweet_count: number;
  favorite_count: number;
  in_reply_to_status_id: boolean;
  truncated: boolean;
}

export interface ITweeterUser {
  profile_image_url_https: string;
  screen_name: string;
  name: string;
  location: string;
  created_at: string;
  followers_count: number;
  friends_count: number;
}

export interface IViewsComparison {
  thisWeekViews: number;
  change: number;
}

export interface IMenuItem {
  name: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
  route: string;
}

export type APIFollowersData = {
  date: Date;
  count: number;
};

export type FollowersData = {
  date: string;
  count: number;
};

export interface DevtoStatsDoc {
  _id: number | string;
  name: string;
  followers: FollowersData[];
}
