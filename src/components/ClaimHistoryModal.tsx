import { ClaimHistory } from "@/types/user";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ClaimHistoryModalProps {
  history: ClaimHistory[];
  isLoading?: boolean;
}

export function ClaimHistoryModal({ history, isLoading = false }: ClaimHistoryModalProps) {
  const totalClaimed = history.reduce((sum, claim) => sum + claim.pointsClaimed, 0);
  const recentClaims = history.slice(0, 50); // Show recent 50 claims

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getClaimIcon = (points: number) => {
    if (points >= 8) return "🎉";
    if (points >= 5) return "✨";
    if (points >= 3) return "⭐";
    return "🔥";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          📊 View Claim History
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center">
            🏆 Claim History
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary stats */}
          <div className="bg-gradient-primary rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">
              {totalClaimed.toLocaleString()}
            </div>
            <div className="text-sm opacity-90">
              Total Points Claimed
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="font-bold text-lg">{history.length}</div>
              <div className="text-sm text-muted-foreground">Claims</div>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="font-bold text-lg">
                {history.length > 0 ? Math.round(totalClaimed / history.length) : 0}
              </div>
              <div className="text-sm text-muted-foreground">Avg Points</div>
            </div>
          </div>

          {/* History list */}
          <div>
            <h4 className="font-semibold mb-3">Recent Claims</h4>
            
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-muted rounded-lg p-3 animate-pulse">
                    <div className="h-4 bg-background/20 rounded mb-2"></div>
                    <div className="h-3 bg-background/20 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : recentClaims.length > 0 ? (
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {recentClaims.map((claim, index) => (
                    <div
                      key={claim.id}
                      className="
                        bg-muted rounded-lg p-3 flex items-center justify-between
                        animate-bounce-in hover:bg-accent/50 transition-colors
                      "
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {getClaimIcon(claim.pointsClaimed)}
                        </span>
                        <div>
                          <div className="font-medium">{claim.userName}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(claim.claimedAt)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          +{claim.pointsClaimed}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          pts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-4xl mb-2">🎯</div>
                <p>No claims yet!</p>
                <p className="text-sm">Start claiming points to see history here.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}