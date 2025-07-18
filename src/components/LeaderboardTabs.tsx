import { LeaderboardTab } from "@/types/user";

interface LeaderboardTabsProps {
  tabs: LeaderboardTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function LeaderboardTabs({ tabs, activeTab, onTabChange }: LeaderboardTabsProps) {
  return (
    <div className="flex gap-2 p-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            transition-all duration-300 whitespace-nowrap
            ${activeTab === tab.id 
              ? 'bg-gradient-primary text-foreground shadow-glow' 
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }
          `}
        >
          <span className="text-lg">{tab.icon}</span>
          {tab.name}
        </button>
      ))}
    </div>
  );
}