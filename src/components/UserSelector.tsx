import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserSelectorProps {
  users: User[];
  selectedUserId: string | null;
  onUserSelect: (userId: string) => void;
  onClaim: () => void;
  isLoading?: boolean;
}

export function UserSelector({ 
  users, 
  selectedUserId, 
  onUserSelect, 
  onClaim, 
  isLoading = false 
}: UserSelectorProps) {
  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div className="px-4 py-6">
      <div className="bg-card rounded-lg shadow-card p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">🎁 Claim Points</h3>
          <p className="text-muted-foreground">
            Select a user and award them 1-10 random points!
          </p>
        </div>

        <div className="space-y-4">
          {/* User selector dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Choose User
            </label>
            <Select value={selectedUserId || ""} onValueChange={onUserSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a user to award points..." />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-3">
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span>{user.name}</span>
                      <span className="text-muted-foreground ml-auto">
                        {user.totalPoints} pts
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected user preview */}
          {selectedUser && (
            <div className="bg-muted rounded-lg p-4 animate-bounce-in">
              <div className="flex items-center gap-3">
                {selectedUser.avatarUrl ? (
                  <img
                    src={selectedUser.avatarUrl}
                    alt={selectedUser.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold">{selectedUser.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Current: {selectedUser.totalPoints.toLocaleString()} points
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Claim button */}
          <Button
            onClick={onClaim}
            disabled={!selectedUserId || isLoading}
            className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6 font-bold shadow-glow"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Claiming...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                🎲 Claim Random Points (1-10)
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}