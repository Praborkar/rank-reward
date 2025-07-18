import { User } from "@/types/user";

interface RankingListProps {
  users: User[];
  startRank?: number;
}

export function RankingList({ users, startRank = 4 }: RankingListProps) {
  const rankedUsers = users.slice(startRank - 1);

  const getTrophyIcon = (rank: number) => {
    if (rank <= 10) return "🏆";
    if (rank <= 20) return "🥇";
    if (rank <= 50) return "🎖️";
    return "🏅";
  };

  const getRankStyle = (rank: number) => {
    if (rank <= 10) return "text-primary font-bold";
    if (rank <= 20) return "text-secondary font-semibold";
    return "text-muted-foreground";
  };

  return (
    <div className="px-4">
      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <div className="bg-gradient-secondary p-4">
          <h3 className="text-lg font-bold text-center">
            🔥 Rising Stars
          </h3>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {rankedUsers.map((user, index) => {
            const rank = startRank + index;
            return (
              <div
                key={user.id}
                className="
                  flex items-center gap-4 p-4 border-b border-border
                  hover:bg-muted/50 transition-colors duration-200
                  animate-bounce-in
                "
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Rank number */}
                <div className={`
                  w-8 h-8 rounded-full bg-muted flex items-center justify-center
                  text-sm font-bold ${getRankStyle(rank)}
                `}>
                  {rank}
                </div>
                
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                {/* User info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Rank #{rank}
                  </p>
                </div>
                
                {/* Points and trophy */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-bold text-primary">
                      {user.totalPoints.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">pts</div>
                  </div>
                  <span className="text-lg">{getTrophyIcon(rank)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}