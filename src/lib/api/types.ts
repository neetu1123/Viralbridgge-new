export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PublicCreator {
  id: string;
  name: string;
  username: string;
  handle: string;
  niche: string;
  platform: string;
  followers: number;
  followersDisplay: string;
  engagement: number;
  engagementDisplay: string;
  avgRate: number;
  avgRateDisplay: string;
  responseRate: number;
  completedDeals: number;
  rating: number;
  avatar: string;
  alt: string;
  verified: boolean;
  premium: boolean;
  nicheBg: string;
  nicheColor: string;
  platformColor: string;
  bio: string;
  tags: string[];
  languages: string[];
  location: string;
}

export interface PublicCreatorDetail extends PublicCreator {
  coverImage: string;
  portfolio: string;
  mediaKit: string;
  socialLinks: Record<string, string>;
  brandsWorkedWith: string[];
  recentCampaigns: Array<{
    id: string;
    title: string;
    brand: string;
    status: string;
  }>;
  reviews: unknown[];
}

export interface PublicCampaign {
  id: string;
  brand: string;
  brandInitial: string;
  brandColor: string;
  brandBg: string;
  brandLogo: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  budget: number;
  budgetLabel: string;
  platform: string;
  category: string;
  deadlineDays: number;
  deadline: string;
  deadlineLabel: string;
  deliverables: string;
  deliverablesList: string[];
  applicants: number;
  languages: string[];
  location: string;
  status: string;
  statusColor: string;
  statusBg: string;
}

export interface PublicCampaignDetail extends PublicCampaign {
  creatorRequirements: string;
  skills: string[];
}

export interface PlatformStats {
  verifiedCreators: number;
  activeBrands: number;
  liveCampaigns: number;
  campaignsCompleted: number;
  totalPayouts: number;
  citiesCovered: number;
  languagesSupported: number;
  premiumMembers: number;
}
