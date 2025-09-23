// Generated from OpenAPI spec

// Authentication Types
export interface UserCreate {
  email: string;
  username: string;
  password: string;
  full_name?: string | null;
  avatar_upload_id?: string | null;
  green_points?: number;
  achievements?: string[];
  is_active?: boolean;
}

export interface LoginRequest {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
}

export interface GoogleAuthRequest {
  token: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  user: any; // UserProfile object
}

// User Types
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  full_name?: string | null;
  avatar_upload_url?: string | null;
  green_points: number;
  achievements: string[];
  rank?: number | null;
  created_at: string;
}

export interface UserObj {
  id: string;
  username: string;
  avatar_upload_url?: string | null;
}

export interface UserUpdate {
  full_name?: string | null;
  avatar_upload_id?: string | null;
}

// Post Types
export interface PostCreate {
  content: string;
  image_upload_ids?: string[];
  location?: Record<string, number> | null;
  is_heat_report?: boolean;
  temperature?: number | null;
  heat_severity?: string | null;
}

export interface PostUpdate {
  content?: string | null;
  image_upload_ids?: string[] | null;
  temperature?: number | null;
  heat_severity?: string | null;
}

export interface PostResponse {
  id: string;
  content: string;
  image_upload_urls: string[];
  location?: Record<string, number> | null;
  user_obj: UserObj;
  reactions: Reaction[];
  comments: Comment[];
  reaction_counts: Record<string, number>;
  user_reaction?: string | null;
  created_at: string;
  updated_at: string;
  is_heat_report?: boolean;
  temperature?: number | null;
  heat_severity?: string | null;
}

export interface Comment {
  id: string;
  user_obj: UserObj;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CommentRequest {
  content: string;
}

export interface Reaction {
  user_obj: UserObj;
  type: ReactionType;
  created_at: string;
}

export interface ReactionRequest {
  reaction_type: ReactionType;
}

export type ReactionType = 'heart' | 'like';

// Storage Types
export interface FileUploadResponse {
  upload_id: string;
  filename: string;
  content_type: string;
  file_size: number;
  created_at: string;
}

// Heat Reports Types
export interface HeatReportCreate {
  content: string;
  location: Record<string, number>;
  temperature?: number | null;
  heat_severity?: string;
  image_upload_ids?: string[];
}

export interface HeatReportResponse {
  id: string;
  content: string;
  image_upload_urls: string[];
  location: Record<string, number>;
  user_obj: UserObj;
  reactions: Reaction[];
  comments: Comment[];
  reaction_counts: Record<string, number>;
  user_reaction?: string | null;
  created_at: string;
  updated_at: string;
  is_heat_report: boolean;
  temperature?: number | null;
  heat_severity: string;
}

// Green Map Types
export interface GreenLocationCreate {
  name: string;
  description?: string | null;
  location: Record<string, number>;
  type: string;
  data?: Record<string, any> | null;
  is_active?: boolean;
}

export interface GreenLocationUpdate {
  name?: string | null;
  description?: string | null;
  location?: Record<string, number> | null;
  type?: string | null;
  data?: Record<string, any> | null;
  is_active?: boolean | null;
}

export interface GreenLocation {
  name: string;
  description?: string | null;
  location: Record<string, number>;
  type: string;
  data?: Record<string, any> | null;
  is_active: boolean;
  _id: string;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

// Achievement Types
export interface Achievement {
  name: string;
  description: string;
  icon: string;
  points_required: number;
  type: string;
  criteria: Record<string, any>;
  _id: string;
  created_at: string;
}

// Notification Types
export interface Notification {
  user_id: string;
  type: string;
  content: Record<string, Record<string, string>>;
  data?: Record<string, any> | null;
  is_read: boolean;
  _id: string;
  created_at: string;
}

export interface NotificationResponse {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, any> | null;
  is_read: boolean;
  created_at: string;
}

// Statistics Types
export interface LeaderboardEntry {
  rank: number;
  id: string;
  username: string;
  full_name?: string | null;
  green_points: number;
  avatar_upload_url?: string | null;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  total_users?: number | null;
}

export interface UserStatisticsResponse {
  user: StatisticsUserProfile;
  points: PointsInfo;
  activities: ActivityStats;
  achievements: StatisticsAchievement[];
}

export interface StatisticsUserProfile {
  id: string;
  username: string;
  full_name?: string | null;
  email: string;
  avatar_upload_url?: string | null;
  created_at: string;
}

export interface PointsInfo {
  total: number;
  rank?: number | null;
  breakdown: Record<string, any>;
}

export interface ActivityStats {
  posts_created: number;
  heat_reports: number;
  green_locations_added: number;
  reactions_received: number;
  comments_made: number;
}

export interface StatisticsAchievement {
  type: string;
  title: string;
  description: string;
  icon: string;
  earned_at?: string | null;
}

export interface UserRankResponse {
  user_obj: UserObj;
  rank: number;
  green_points: number;
}

export interface TopContributor {
  user_obj: UserObj;
  points: number;
  activities_count: number;
}

export interface TopContributorsResponse {
  contributors: TopContributor[];
  period: string;
}

// Enums
export type Language = 'vi' | 'en';
export type PeriodEnum = 'day' | 'week' | 'month';

// Error Types
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// API Response wrapper
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}