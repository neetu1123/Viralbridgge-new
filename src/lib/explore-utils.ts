export function platformBadgeStyle(platform: string): { bg: string; color: string } {
  const map: Record<string, { bg: string; color: string }> = {
    Instagram: { bg: '#FFF0F6', color: '#E1306C' },
    TikTok: { bg: '#F2F3F7', color: '#1F1F2E' },
    YouTube: { bg: '#FFF5F5', color: '#FF0000' },
    'Twitter/X': { bg: '#F0F8FF', color: '#1DA1F2' },
    Pinterest: { bg: '#FFF5F5', color: '#E60023' },
    LinkedIn: { bg: '#F0F8FF', color: '#0A66C2' },
  };
  return map[platform] || { bg: '#F2F3F7', color: '#6B6B8A' };
}

export function mapCreatorSort(sortBy: string): string {
  switch (sortBy) {
    case 'followers_desc':
      return 'followers_desc';
    case 'engagement_desc':
      return 'engagement_desc';
    case 'deals_desc':
      return 'deals_desc';
    default:
      return 'relevance';
  }
}

export function mapCampaignSort(sortBy: string): string {
  switch (sortBy) {
    case 'budget_high':
      return 'budget_high';
    case 'budget_low':
      return 'budget_low';
    case 'deadline':
      return 'deadline';
    case 'popular':
      return 'popular';
    default:
      return 'newest';
  }
}
