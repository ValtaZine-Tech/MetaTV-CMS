import { Header } from "../components/layout/Header";
import { StatsCard } from "../components/dashboard/StatsCard";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { MediaGrid } from "../components/media/MediaGrid";
import { Music, Video, Radio, Users, DollarSign } from "lucide-react";

const Dashboard = () => {
  // Mock data
  const recentActivities = [
    {
      id: "1",
      user: { name: "John Doe", initials: "JD" },
      type: "upload" as const,
      content: 'Uploaded a new song "Summer Vibes"',
      time: "2 hours ago",
    },
    {
      id: "2",
      user: { name: "Jane Smith", initials: "JS" },
      type: "stream" as const,
      content: 'Started a live stream "Friday Night Live"',
      time: "3 hours ago",
    },
    {
      id: "3",
      user: { name: "Mike Johnson", initials: "MJ" },
      type: "donation" as const,
      content: "Donated $50 to Jane Smith",
      time: "5 hours ago",
    },
    {
      id: "4",
      user: { name: "Sarah Wilson", initials: "SW" },
      type: "comment" as const,
      content: 'Commented on "Summer Vibes"',
      time: "6 hours ago",
    },
  ];

  const trendingMedia = [
    {
      id: "1",
      title: "Summer Vibes",
      artist: "John Doe",
      thumbnail: "/placeholder.svg",
      plays: 12500,
      likes: 840,
      type: "music" as const,
      duration: "3:45",
    },
    {
      id: "2",
      title: "How to Mix Like a Pro",
      artist: "Jane Smith",
      thumbnail: "/placeholder.svg",
      plays: 8700,
      likes: 325,
      type: "video" as const,
      duration: "15:20",
    },
    {
      id: "3",
      title: "Friday Night Live",
      artist: "Jane Smith",
      thumbnail: "/placeholder.svg",
      plays: 3200,
      likes: 180,
      type: "stream" as const,
      isLive: true,
    },
    {
      id: "4",
      title: "Electric Dreams",
      artist: "Mike Johnson",
      thumbnail: "/placeholder.svg",
      plays: 6300,
      likes: 420,
      type: "music" as const,
      duration: "4:12",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Dashboard" />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <StatsCard
            title="Total Music"
            value="1,245"
            icon={<Music className="h-5 w-5" />}
            trend={8}
            trendLabel="from last month"
          />
          <StatsCard
            title="Total Videos"
            value="482"
            icon={<Video className="h-5 w-5" />}
            trend={12}
            trendLabel="from last month"
          />
          <StatsCard
            title="Active Streams"
            value="24"
            icon={<Radio className="h-5 w-5" />}
            trend={-3}
            trendLabel="from yesterday"
          />
          <StatsCard
            title="Registered Users"
            value="18,392"
            icon={<Users className="h-5 w-5" />}
            trend={5}
            trendLabel="from last month"
          />
          <StatsCard
            title="Monthly Revenue"
            value="$12,850"
            icon={<DollarSign className="h-5 w-5" />}
            trend={15}
            trendLabel="from last month"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Trending Content</h2>
            <div className="flex-wrap p-6 space-y-6">
              <MediaGrid items={trendingMedia} />
            </div>
          </div>
          <RecentActivity activities={recentActivities} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
