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
  brandId?: string;
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

export interface PublicBrandProfile {
  id: string;
  name: string;
  slug: string;
  initial: string;
  industry: string;
  industryColor: string;
  industryBg: string;
  logo: string;
  description: string;
  website: string;
  location: string;
  verified: boolean;
  memberSince: string;
  activeCampaigns: number;
  completedCampaigns: number;
  totalApplicants: number;
  campaigns: PublicCampaign[];
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

export interface DiscoveryCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  type: string;
}

export interface DiscoveryLocation {
  name: string;
  state: string;
  slug: string;
  areas: string[];
}

export interface DiscoveryListing {
  id: string;
  type: 'BUSINESS' | 'CREATOR';
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  shortDescription: string;
  category: string;
  subcategory: string;
  city: string;
  state: string;
  area: string;
  locationLabel: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  services: string[];
  tags: string[];
  discoveryStatus?: string;
  createdAt: string;
}

export interface DiscoveryProfile extends DiscoveryListing {
  description: string;
  website?: string;
  languages?: string[];
  followers?: number;
  engagement?: number;
  portfolio?: string;
  gallery: string[];
  businessHours?: unknown;
  establishedYear?: number | null;
  socialLinks: Record<string, string>;
  campaigns?: Array<{ id: string; title: string; status: string }>;
  contact: {
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
    website: string | null;
    address: string | null;
  };
}

export interface DiscoverySearchResponse {
  data: DiscoveryListing[];
  pagination: PaginationMeta;
  meta?: PaginationMeta;
}
