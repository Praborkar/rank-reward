import { User, ClaimHistory, LeaderboardTab } from "@/types/user";

// Mock data for development - replace with real API calls
const MOCK_USERS: User[] = [
  { id: "1", name: "Alexandra Storm", totalPoints: 15420, avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612e740?w=150&h=150&fit=crop&crop=face" },
  { id: "2", name: "Marcus Thunder", totalPoints: 13890, avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { id: "3", name: "Luna Phoenix", totalPoints: 12650, avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { id: "4", name: "Kai Velocity", totalPoints: 11200, avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { id: "5", name: "Nova Sterling", totalPoints: 10800, avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
  { id: "6", name: "Zara Lightning", totalPoints: 9750, avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face" },
  { id: "7", name: "Orion Blaze", totalPoints: 8900, avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { id: "8", name: "Sage Cosmos", totalPoints: 8200, avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
  { id: "9", name: "River Eclipse", totalPoints: 7650, avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
  { id: "10", name: "Aria Quantum", totalPoints: 7100, avatarUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face" },
  { id: "11", name: "Phoenix Drake", totalPoints: 6800, avatarUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face" },
  { id: "12", name: "Ember Frost", totalPoints: 6400, avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face" },
  { id: "13", name: "Storm Walker", totalPoints: 5900, avatarUrl: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face" },
  { id: "14", name: "Raven Spark", totalPoints: 5500, avatarUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face" },
  { id: "15", name: "Atlas Prime", totalPoints: 5200, avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" }
];

let mockClaimHistory: ClaimHistory[] = [];

const TABS: LeaderboardTab[] = [
  { id: "weekly", name: "Weekly Ranking", icon: "🏆", active: true },
  { id: "party", name: "Party Ranking", icon: "🎉" },
  { id: "live", name: "Live Ranking", icon: "🔴" },
  { id: "hourly", name: "Hourly Ranking", icon: "⏰" },
  { id: "monthly", name: "Monthly Ranking", icon: "📅" }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Get all users with ranking
  async getLeaderboard(): Promise<User[]> {
    await delay(500);
    return MOCK_USERS
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((user, index) => ({ ...user, rank: index + 1 }));
  },

  // Get all users for selection
  async getUsers(): Promise<User[]> {
    await delay(300);
    return MOCK_USERS.sort((a, b) => a.name.localeCompare(b.name));
  },

  // Claim points for a user
  async claimPoints(userId: string): Promise<{ user: User; pointsClaimed: number }> {
    await delay(800);
    
    const pointsClaimed = Math.floor(Math.random() * 10) + 1; // 1-10 points
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    // Update user points
    MOCK_USERS[userIndex].totalPoints += pointsClaimed;
    const updatedUser = { ...MOCK_USERS[userIndex] };

    // Add to claim history
    const claim: ClaimHistory = {
      id: Date.now().toString(),
      userId,
      userName: updatedUser.name,
      pointsClaimed,
      claimedAt: new Date()
    };
    mockClaimHistory.unshift(claim);

    return { user: updatedUser, pointsClaimed };
  },

  // Get claim history
  async getClaimHistory(): Promise<ClaimHistory[]> {
    await delay(400);
    return [...mockClaimHistory];
  },

  // Get available tabs
  async getTabs(): Promise<LeaderboardTab[]> {
    await delay(200);
    return TABS;
  }
};

// Initialize some mock history
const initializeMockHistory = () => {
  const sampleClaims: ClaimHistory[] = [
    {
      id: "h1",
      userId: "1",
      userName: "Alexandra Storm",
      pointsClaimed: 7,
      claimedAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: "h2",
      userId: "3",
      userName: "Luna Phoenix",
      pointsClaimed: 4,
      claimedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      id: "h3",
      userId: "2",
      userName: "Marcus Thunder",
      pointsClaimed: 9,
      claimedAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
    },
    {
      id: "h4",
      userId: "5",
      userName: "Nova Sterling",
      pointsClaimed: 2,
      claimedAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    }
  ];
  
  mockClaimHistory = sampleClaims;
};

// Initialize mock data
initializeMockHistory();