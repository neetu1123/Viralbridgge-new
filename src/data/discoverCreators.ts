export interface DiscoverCreator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  alt: string;
  followers: number;
  followersDisplay: string;
  engagement: number;
  engagementDisplay: string;
  languages: string[];
  city: string;
  categories: string[];
  platform: string;
  verified: boolean;
  premium: boolean;
  available: boolean;
  startingPrice: number;
  startingPriceDisplay: string;
  joinedAt: string;
  nicheBg: string;
  nicheColor: string;
}

export const CITIES = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Ahmedabad', 'Chennai', 'Kolkata',
] as const;

export const LANGUAGES = [
  'Hindi', 'English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Punjabi', 'Gujarati', 'Marathi',
] as const;

export const CATEGORIES = [
  'Technology', 'Gaming', 'Fashion', 'Beauty', 'Travel', 'Fitness', 'Food', 'Education', 'Business', 'Lifestyle',
] as const;

export const PLATFORMS = [
  'Instagram', 'YouTube', 'LinkedIn', 'Facebook', 'TikTok', 'Twitter (X)',
] as const;

export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'followers_desc', label: 'Highest Followers' },
  { value: 'engagement_desc', label: 'Highest Engagement' },
  { value: 'newest', label: 'Newest' },
  { value: 'recommended', label: 'Recommended' },
] as const;

export const DISCOVER_CREATORS: DiscoverCreator[] = [
  {
    id: 'disc-001',
    name: 'Priya Sharma',
    username: '@priyacooks',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_12ea42ac5-1772258592389.png',
    alt: 'Indian woman with bright smile in warm-toned kitchen setting',
    followers: 198000,
    followersDisplay: '198K',
    engagement: 8.1,
    engagementDisplay: '8.1%',
    languages: ['Hindi', 'English'],
    city: 'Mumbai',
    categories: ['Food', 'Lifestyle'],
    platform: 'TikTok',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 1200,
    startingPriceDisplay: '₹1,200',
    joinedAt: '2024-03-15',
    nicheBg: '#FFF8EC',
    nicheColor: '#F9A826',
  },
  {
    id: 'disc-002',
    name: 'Arjun Mehta',
    username: '@arjuntech',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_17e162e7d-1763293508256.png',
    alt: 'Young Indian man with glasses in tech office setting',
    followers: 841000,
    followersDisplay: '841K',
    engagement: 3.6,
    engagementDisplay: '3.6%',
    languages: ['English', 'Hindi'],
    city: 'Bangalore',
    categories: ['Technology', 'Education'],
    platform: 'YouTube',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 4500,
    startingPriceDisplay: '₹4,500',
    joinedAt: '2023-08-20',
    nicheBg: '#F0F8FF',
    nicheColor: '#1DA1F2',
  },
  {
    id: 'disc-003',
    name: 'Kavya Reddy',
    username: '@kavyabeauty',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1043799f0-1772896429674.png',
    alt: 'Young woman with long dark hair and bright smile',
    followers: 284000,
    followersDisplay: '284K',
    engagement: 6.8,
    engagementDisplay: '6.8%',
    languages: ['Telugu', 'English'],
    city: 'Hyderabad',
    categories: ['Beauty', 'Fashion'],
    platform: 'Instagram',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 1800,
    startingPriceDisplay: '₹1,800',
    joinedAt: '2024-01-10',
    nicheBg: '#FFF0F6',
    nicheColor: '#F357A8',
  },
  {
    id: 'disc-004',
    name: 'Rahul Singh',
    username: '@rahulfitness',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1cce18851-1772227416987.png',
    alt: 'Athletic man in gym setting',
    followers: 512000,
    followersDisplay: '512K',
    engagement: 4.2,
    engagementDisplay: '4.2%',
    languages: ['Hindi', 'Punjabi'],
    city: 'Delhi',
    categories: ['Fitness', 'Lifestyle'],
    platform: 'YouTube',
    verified: true,
    premium: false,
    available: true,
    startingPrice: 3200,
    startingPriceDisplay: '₹3,200',
    joinedAt: '2023-11-05',
    nicheBg: '#EFEAFF',
    nicheColor: '#7B2FF7',
  },
  {
    id: 'disc-005',
    name: 'Ananya Iyer',
    username: '@ananyatravel',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_10ca6927d-1772977923048.png',
    alt: 'Woman smiling outdoors in city setting',
    followers: 623000,
    followersDisplay: '623K',
    engagement: 4.8,
    engagementDisplay: '4.8%',
    languages: ['Tamil', 'English'],
    city: 'Chennai',
    categories: ['Travel', 'Lifestyle'],
    platform: 'Instagram',
    verified: false,
    premium: false,
    available: true,
    startingPrice: 3800,
    startingPriceDisplay: '₹3,800',
    joinedAt: '2024-06-22',
    nicheBg: '#FFF8EC',
    nicheColor: '#F9A826',
  },
  {
    id: 'disc-006',
    name: 'Vikram Patel',
    username: '@vikramgaming',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1882b194b-1763293730336.png',
    alt: 'Young man with headphones in gaming setup',
    followers: 1200000,
    followersDisplay: '1.2M',
    engagement: 7.4,
    engagementDisplay: '7.4%',
    languages: ['Gujarati', 'Hindi', 'English'],
    city: 'Ahmedabad',
    categories: ['Gaming', 'Technology'],
    platform: 'TikTok',
    verified: true,
    premium: true,
    available: false,
    startingPrice: 5800,
    startingPriceDisplay: '₹5,800',
    joinedAt: '2023-05-18',
    nicheBg: '#EFEAFF',
    nicheColor: '#7B2FF7',
  },
  {
    id: 'disc-007',
    name: 'Meera Nair',
    username: '@meerafashion',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_155421363-1772465849095.png',
    alt: 'Woman with elegant style against street background',
    followers: 445000,
    followersDisplay: '445K',
    engagement: 5.3,
    engagementDisplay: '5.3%',
    languages: ['Malayalam', 'English'],
    city: 'Bangalore',
    categories: ['Fashion', 'Beauty'],
    platform: 'Instagram',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 2900,
    startingPriceDisplay: '₹2,900',
    joinedAt: '2024-02-28',
    nicheBg: '#FFF0F6',
    nicheColor: '#F357A8',
  },
  {
    id: 'disc-008',
    name: 'Aditya Joshi',
    username: '@adityabiz',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_19f0fd5cb-1763295525028.png',
    alt: 'Professional man in business casual attire',
    followers: 734000,
    followersDisplay: '734K',
    engagement: 3.9,
    engagementDisplay: '3.9%',
    languages: ['Marathi', 'English', 'Hindi'],
    city: 'Pune',
    categories: ['Business', 'Education'],
    platform: 'LinkedIn',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 4200,
    startingPriceDisplay: '₹4,200',
    joinedAt: '2023-09-12',
    nicheBg: '#F0FFF4',
    nicheColor: '#22C55E',
  },
  {
    id: 'disc-009',
    name: 'Sneha Das',
    username: '@snehalifestyle',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1703231c0-1765278179841.png',
    alt: 'Woman with natural hair wearing colorful outfit',
    followers: 376000,
    followersDisplay: '376K',
    engagement: 5.9,
    engagementDisplay: '5.9%',
    languages: ['Hindi', 'English'],
    city: 'Kolkata',
    categories: ['Lifestyle', 'Fashion'],
    platform: 'Instagram',
    verified: true,
    premium: false,
    available: true,
    startingPrice: 2400,
    startingPriceDisplay: '₹2,400',
    joinedAt: '2024-04-08',
    nicheBg: '#F0FFF4',
    nicheColor: '#22C55E',
  },
  {
    id: 'disc-010',
    name: 'Rohan Kapoor',
    username: '@rohanedu',
    avatar: 'https://images.unsplash.com/flagged/photo-1559264243-77e7b0942b77',
    alt: 'Young man with glasses in academic setting',
    followers: 478000,
    followersDisplay: '478K',
    engagement: 5.1,
    engagementDisplay: '5.1%',
    languages: ['Hindi', 'English'],
    city: 'Delhi',
    categories: ['Education', 'Technology'],
    platform: 'YouTube',
    verified: true,
    premium: false,
    available: true,
    startingPrice: 2800,
    startingPriceDisplay: '₹2,800',
    joinedAt: '2024-07-01',
    nicheBg: '#F0F8FF',
    nicheColor: '#1DA1F2',
  },
  {
    id: 'disc-011',
    name: 'Divya Krishnan',
    username: '@divyakannada',
    avatar: 'https://images.unsplash.com/photo-1616254105677-39d969b03326',
    alt: 'Woman with gentle smile in bright home setting',
    followers: 214000,
    followersDisplay: '214K',
    engagement: 7.6,
    engagementDisplay: '7.6%',
    languages: ['Kannada', 'English'],
    city: 'Bangalore',
    categories: ['Food', 'Lifestyle'],
    platform: 'Facebook',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 1500,
    startingPriceDisplay: '₹1,500',
    joinedAt: '2024-05-14',
    nicheBg: '#FFF0F6',
    nicheColor: '#F357A8',
  },
  {
    id: 'disc-012',
    name: 'Karan Malhotra',
    username: '@karanx',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ef6a4c1c-1772101813406.png',
    alt: 'Man with calm expression against neutral background',
    followers: 289000,
    followersDisplay: '289K',
    engagement: 6.2,
    engagementDisplay: '6.2%',
    languages: ['Punjabi', 'Hindi', 'English'],
    city: 'Delhi',
    categories: ['Business', 'Lifestyle'],
    platform: 'Twitter (X)',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 2100,
    startingPriceDisplay: '₹2,100',
    joinedAt: '2023-12-20',
    nicheBg: '#F0FFF4',
    nicheColor: '#22C55E',
  },
  {
    id: 'disc-013',
    name: 'Lakshmi Venkat',
    username: '@lakshmifit',
    avatar: 'https://images.unsplash.com/photo-1724828236694-67f52d25968f',
    alt: 'Person with friendly smile in fitness setting',
    followers: 892000,
    followersDisplay: '892K',
    engagement: 11.2,
    engagementDisplay: '11.2%',
    languages: ['Tamil', 'English'],
    city: 'Chennai',
    categories: ['Fitness', 'Food'],
    platform: 'TikTok',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 3600,
    startingPriceDisplay: '₹3,600',
    joinedAt: '2024-08-30',
    nicheBg: '#F0F8FF',
    nicheColor: '#1DA1F2',
  },
  {
    id: 'disc-014',
    name: 'Neha Gupta',
    username: '@nehatech',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ae8c149f-1773079673053.png',
    alt: 'Woman in minimalist home interior setting',
    followers: 162000,
    followersDisplay: '162K',
    engagement: 9.4,
    engagementDisplay: '9.4%',
    languages: ['Hindi', 'English'],
    city: 'Mumbai',
    categories: ['Technology', 'Business'],
    platform: 'LinkedIn',
    verified: false,
    premium: false,
    available: true,
    startingPrice: 950,
    startingPriceDisplay: '₹950',
    joinedAt: '2025-01-15',
    nicheBg: '#FFF8EC',
    nicheColor: '#F9A826',
  },
  {
    id: 'disc-015',
    name: 'Suresh Babu',
    username: '@sureshgaming',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1882b194b-1763293730336.png',
    alt: 'Gaming content creator with headset',
    followers: 567000,
    followersDisplay: '567K',
    engagement: 6.5,
    engagementDisplay: '6.5%',
    languages: ['Telugu', 'English'],
    city: 'Hyderabad',
    categories: ['Gaming', 'Technology'],
    platform: 'YouTube',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 3400,
    startingPriceDisplay: '₹3,400',
    joinedAt: '2024-09-05',
    nicheBg: '#EFEAFF',
    nicheColor: '#7B2FF7',
  },
  {
    id: 'disc-016',
    name: 'Pooja Shah',
    username: '@poojabeauty',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1043799f0-1772896429674.png',
    alt: 'Beauty creator with glowing skin',
    followers: 325000,
    followersDisplay: '325K',
    engagement: 7.2,
    engagementDisplay: '7.2%',
    languages: ['Gujarati', 'Hindi'],
    city: 'Ahmedabad',
    categories: ['Beauty', 'Fashion'],
    platform: 'Instagram',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 2200,
    startingPriceDisplay: '₹2,200',
    joinedAt: '2024-10-12',
    nicheBg: '#FFF0F6',
    nicheColor: '#F357A8',
  },
  {
    id: 'disc-017',
    name: 'Amit Deshmukh',
    username: '@amittravel',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_10ca6927d-1772977923048.png',
    alt: 'Travel vlogger exploring outdoors',
    followers: 412000,
    followersDisplay: '412K',
    engagement: 5.5,
    engagementDisplay: '5.5%',
    languages: ['Marathi', 'Hindi', 'English'],
    city: 'Pune',
    categories: ['Travel', 'Food'],
    platform: 'YouTube',
    verified: false,
    premium: false,
    available: true,
    startingPrice: 2600,
    startingPriceDisplay: '₹2,600',
    joinedAt: '2024-11-20',
    nicheBg: '#FFF8EC',
    nicheColor: '#F9A826',
  },
  {
    id: 'disc-018',
    name: 'Isha Menon',
    username: '@ishafashion',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_155421363-1772465849095.png',
    alt: 'Fashion influencer in stylish outfit',
    followers: 198000,
    followersDisplay: '198K',
    engagement: 8.8,
    engagementDisplay: '8.8%',
    languages: ['Malayalam', 'English'],
    city: 'Kolkata',
    categories: ['Fashion', 'Lifestyle'],
    platform: 'Instagram',
    verified: true,
    premium: true,
    available: true,
    startingPrice: 1700,
    startingPriceDisplay: '₹1,700',
    joinedAt: '2025-02-01',
    nicheBg: '#FFF0F6',
    nicheColor: '#F357A8',
  },
];

export function filterCreators(
  creators: DiscoverCreator[],
  filters: {
    search?: string;
    cities?: string[];
    languages?: string[];
    categories?: string[];
    platforms?: string[];
    followersMin?: number;
    followersMax?: number;
    priceMin?: number;
    priceMax?: number;
    verified?: boolean | null;
    premium?: boolean | null;
    available?: boolean | null;
    sortBy?: string;
  }
): DiscoverCreator[] {
  let result = [...creators];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.username.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.categories.some((cat) => cat.toLowerCase().includes(q)) ||
        c.languages.some((lang) => lang.toLowerCase().includes(q))
    );
  }

  if (filters.cities?.length) {
    result = result.filter((c) => filters.cities!.includes(c.city));
  }

  if (filters.languages?.length) {
    result = result.filter((c) => c.languages.some((l) => filters.languages!.includes(l)));
  }

  if (filters.categories?.length) {
    result = result.filter((c) => c.categories.some((cat) => filters.categories!.includes(cat)));
  }

  if (filters.platforms?.length) {
    result = result.filter((c) => filters.platforms!.includes(c.platform));
  }

  if (filters.followersMin !== undefined) {
    result = result.filter((c) => c.followers >= filters.followersMin!);
  }

  if (filters.followersMax !== undefined && filters.followersMax < 5000000) {
    result = result.filter((c) => c.followers <= filters.followersMax!);
  }

  if (filters.priceMin !== undefined) {
    result = result.filter((c) => c.startingPrice >= filters.priceMin!);
  }

  if (filters.priceMax !== undefined && filters.priceMax < 10000) {
    result = result.filter((c) => c.startingPrice <= filters.priceMax!);
  }

  if (filters.verified === true) {
    result = result.filter((c) => c.verified);
  }

  if (filters.premium === true) {
    result = result.filter((c) => c.premium);
  }

  if (filters.available === true) {
    result = result.filter((c) => c.available);
  }

  switch (filters.sortBy) {
    case 'followers_desc':
      result.sort((a, b) => b.followers - a.followers);
      break;
    case 'engagement_desc':
      result.sort((a, b) => b.engagement - a.engagement);
      break;
    case 'newest':
      result.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
      break;
    case 'recommended':
      result.sort((a, b) => {
        const scoreA = (a.premium ? 2 : 0) + (a.verified ? 1 : 0) + a.engagement / 10;
        const scoreB = (b.premium ? 2 : 0) + (b.verified ? 1 : 0) + b.engagement / 10;
        return scoreB - scoreA;
      });
      break;
    case 'popular':
    default:
      result.sort((a, b) => b.followers * b.engagement - a.followers * a.engagement);
      break;
  }

  return result;
}

export const DEFAULT_DISCOVER_FILTERS = {
  search: '',
  cities: [] as string[],
  languages: [] as string[],
  categories: [] as string[],
  platforms: [] as string[],
  followersMin: 0,
  followersMax: 5000000,
  priceMin: 0,
  priceMax: 10000,
  verified: null as boolean | null,
  premium: null as boolean | null,
  available: null as boolean | null,
  sortBy: 'popular',
};

export type DiscoverFilters = typeof DEFAULT_DISCOVER_FILTERS;
