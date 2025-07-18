import { User } from "@/types/user";

interface TopThreeRankingProps {
  users: User[];
}

export function TopThreeRanking({ users }: TopThreeRankingProps) {
  const topThree = users.slice(0, 3);
  
  const getRankingStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          crown: "👑",
          gradient: "bg-gradient-gold",
          size: "w-24 h-24",
          shadow: "shadow-ranking"
        };
      case 2:
        return {
          crown: "🥈",
          gradient: "bg-gradient-silver",
          size: "w-20 h-20",
          shadow: "shadow-card"
        };
      case 3:
        return {
          crown: "🥉",
          gradient: "bg-gradient-bronze",
          size: "w-20 h-20",
          shadow: "shadow-card"
        };
      default:
        return {
          crown: "",
          gradient: "bg-muted",
          size: "w-16 h-16",
          shadow: "shadow-card"
        };
    }
  };

  const getPositionOrder = (index: number) => {
    // Display order: 2nd, 1st, 3rd for visual hierarchy
    if (index === 0) return "order-2"; // 1st place in center
    if (index === 1) return "order-1"; // 2nd place on left
    if (index === 2) return "order-3"; // 3rd place on right
    return "";
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-primary bg-clip-text text-transparent">
        🏆 Weekly Champions
      </h2>
      
      <div className="flex justify-center items-end gap-4 mb-8">
        {topThree.map((user, index) => {
          const rank = index + 1;
          const style = getRankingStyle(rank);
          const isFirst = rank === 1;
          
          return (
            <div
              key={user.id}
              className={`
                flex flex-col items-center gap-3 
                ${getPositionOrder(index)}
                ${isFirst ? 'scale-110' : ''}
                animate-bounce-in
              `}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Crown */}
              <div className="text-4xl animate-pulse-glow">
                {style.crown}
              </div>
              
              {/* Avatar */}
              <div className={`
                ${style.size} ${style.gradient} ${style.shadow}
                rounded-full p-1 relative overflow-hidden
                transition-transform duration-300 hover:scale-105
              `}>
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                
                {/* Rank badge */}
                <div className={`
                  absolute -top-2 -right-2 w-8 h-8 
                  ${style.gradient} rounded-full
                  flex items-center justify-center text-sm font-bold
                  border-2 border-background
                `}>
                  {rank}
                </div>
              </div>
              
              {/* User info */}
              <div className="text-center">
                <h3 className={`font-bold ${isFirst ? 'text-lg' : 'text-md'}`}>
                  {user.name}
                </h3>
                <div className={`
                  ${style.gradient} bg-clip-text text-transparent font-extrabold
                  ${isFirst ? 'text-2xl' : 'text-xl'}
                `}>
                  {user.totalPoints.toLocaleString()}
                </div>
                <p className="text-muted-foreground text-sm">points</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}