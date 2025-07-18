export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  totalPoints: number;
  rank?: number;
}

export interface ClaimHistory {
  id: string;
  userId: string;
  pointsClaimed: number;
  claimedAt: Date;
  userName: string;
}

export interface LeaderboardTab {
  id: string;
  name: string;
  icon: string;
  active?: boolean;
}