import { useState, useEffect } from "react";
import { User, ClaimHistory, LeaderboardTab } from "@/types/user";
import { mockApi } from "@/services/mockApi";
import { LeaderboardTabs } from "@/components/LeaderboardTabs";
import { TopThreeRanking } from "@/components/TopThreeRanking";
import { RankingList } from "@/components/RankingList";
import { UserSelector } from "@/components/UserSelector";
import { ClaimHistoryModal } from "@/components/ClaimHistoryModal";
import { PointsAnimation } from "@/components/PointsAnimation";
import { useToast } from "@/hooks/use-toast";

export function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [claimHistory, setClaimHistory] = useState<ClaimHistory[]>([]);
  const [tabs, setTabs] = useState<LeaderboardTab[]>([]);
  const [activeTab, setActiveTab] = useState("weekly");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaimingPoints, setIsClaimingPoints] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState<number | null>(null);
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [leaderboardData, usersData, historyData, tabsData] = await Promise.all([
          mockApi.getLeaderboard(),
          mockApi.getUsers(),
          mockApi.getClaimHistory(),
          mockApi.getTabs()
        ]);
        
        setUsers(leaderboardData);
        setAllUsers(usersData);
        setClaimHistory(historyData);
        setTabs(tabsData);
      } catch (error) {
        console.error("Failed to load data:", error);
        toast({
          title: "Error",
          description: "Failed to load leaderboard data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // In a real app, you would fetch different data based on the tab
    toast({
      title: `Switched to ${tabs.find(t => t.id === tabId)?.name}`,
      description: "Showing ranking data for this category"
    });
  };

  // Handle point claiming
  const handleClaimPoints = async () => {
    if (!selectedUserId) return;

    try {
      setIsClaimingPoints(true);
      const result = await mockApi.claimPoints(selectedUserId);
      
      // Update local state
      setUsers(prev => prev.map(user => 
        user.id === selectedUserId 
          ? { ...user, totalPoints: result.user.totalPoints }
          : user
      ).sort((a, b) => b.totalPoints - a.totalPoints)
        .map((user, index) => ({ ...user, rank: index + 1 })));
      
      setAllUsers(prev => prev.map(user => 
        user.id === selectedUserId 
          ? { ...user, totalPoints: result.user.totalPoints }
          : user
      ));

      // Refresh claim history
      const newHistory = await mockApi.getClaimHistory();
      setClaimHistory(newHistory);

      // Show success animation
      setShowPointsAnimation(result.pointsClaimed);
      
      // Show success toast
      toast({
        title: "Points Claimed! 🎉",
        description: `${result.user.name} received ${result.pointsClaimed} points!`,
        variant: "default"
      });

      // Reset selection
      setSelectedUserId(null);
      
    } catch (error) {
      console.error("Failed to claim points:", error);
      toast({
        title: "Claim Failed",
        description: "Could not claim points. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsClaimingPoints(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              🏆 Dynamic Leaderboard
            </h1>
            <div className="text-sm text-muted-foreground">
              {users.length} Players
            </div>
          </div>
          
          <LeaderboardTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto pb-8">
        {/* Top 3 ranking */}
        <TopThreeRanking users={users} />

        {/* Ranking list for 4+ */}
        {users.length > 3 && (
          <RankingList users={users} startRank={4} />
        )}

        {/* Spacer */}
        <div className="h-8" />

        {/* User selector and claim section */}
        <UserSelector
          users={allUsers}
          selectedUserId={selectedUserId}
          onUserSelect={setSelectedUserId}
          onClaim={handleClaimPoints}
          isLoading={isClaimingPoints}
        />

        {/* Claim history */}
        <div className="px-4 mt-6">
          <ClaimHistoryModal history={claimHistory} />
        </div>

        {/* Footer info */}
        <div className="px-4 mt-8 text-center text-sm text-muted-foreground">
          <p>Rankings update in real-time • Points are awarded randomly (1-10)</p>
          <p className="mt-2">
            Ready for backend integration with Node.js + MongoDB
          </p>
        </div>
      </div>

      {/* Points claim animation */}
      {showPointsAnimation && (
        <PointsAnimation
          points={showPointsAnimation}
          onComplete={() => setShowPointsAnimation(null)}
        />
      )}
    </div>
  );
}