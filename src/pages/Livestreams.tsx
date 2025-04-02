import { Header } from "../components/layout/Header";
import { MediaGrid } from "../components/media/MediaGrid";
import { Button } from "../components/ui/button";
import { Radio, Plus } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

const Livestreams = () => {
  // Mock data
  const liveStreams = [
    {
      id: "1",
      title: "Friday Night Live",
      artist: "Jane Smith",
      thumbnail: "/placeholder.svg",
      plays: 3200,
      likes: 180,
      type: "stream" as const,
      isLive: true,
    },
    {
      id: "2",
      title: "Music Production Masterclass",
      artist: "Producer Mike",
      thumbnail: "/placeholder.svg",
      plays: 1850,
      likes: 124,
      type: "stream" as const,
      isLive: true,
    },
    {
      id: "3",
      title: "Acoustic Guitar Session",
      artist: "Emily Clarke",
      thumbnail: "/placeholder.svg",
      plays: 1200,
      likes: 95,
      type: "stream" as const,
      isLive: true,
    },
  ];

  const upcomingStreams = [
    {
      id: "4",
      title: "Saturday Jam Session",
      artist: "John Doe",
      thumbnail: "/placeholder.svg",
      plays: 0,
      likes: 45,
      type: "stream" as const,
      scheduledTime: "Tomorrow, 3:00 PM",
    },
    {
      id: "5",
      title: "Album Release Party",
      artist: "Luna Ray",
      thumbnail: "/placeholder.svg",
      plays: 0,
      likes: 67,
      type: "stream" as const,
      scheduledTime: "Jun 15, 8:00 PM",
    },
  ];

  const pastStreams = [
    {
      id: "6",
      title: "DJ Set: Electronic Beats",
      artist: "DJ Maxwell",
      thumbnail: "/placeholder.svg",
      plays: 8500,
      likes: 420,
      type: "stream" as const,
      duration: "2:15:30",
    },
    {
      id: "7",
      title: "Q&A with Music Producers",
      artist: "Producer Panel",
      thumbnail: "/placeholder.svg",
      plays: 5200,
      likes: 310,
      type: "stream" as const,
      duration: "1:45:20",
    },
    {
      id: "8",
      title: "Vinyl Listening Party",
      artist: "Retro Music Club",
      thumbnail: "/placeholder.svg",
      plays: 3800,
      likes: 230,
      type: "stream" as const,
      duration: "3:20:15",
    },
    {
      id: "9",
      title: "Music Theory Workshop",
      artist: "Professor Smith",
      thumbnail: "/placeholder.svg",
      plays: 6100,
      likes: 380,
      type: "stream" as const,
      duration: "1:30:45",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Livestreams" />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Livestreams</h1>
            <p className="text-muted-foreground">Manage your livestreams</p>
          </div>

          <Button className="w-full sm:w-auto" asChild>
            <Link to="/dashboard/livestreams/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Stream
            </Link>
          </Button>
        </div>

        <div className="flex items-center">
          <div className="mr-4 p-2 rounded-full bg-red-500/20 text-red-500 animate-pulse">
            <Radio className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Live Now</h2>
            <p className="text-sm text-muted-foreground">
              {liveStreams.length} active streams
            </p>
          </div>
        </div>

        <MediaGrid items={liveStreams} />

        <Tabs defaultValue="upcoming" className="mt-8">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Streams</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4 space-y-6">
            <h2 className="text-lg font-semibold">Scheduled Streams</h2>
            {upcomingStreams.map((stream) => (
              <Card key={stream.id}>
                <CardContent className="p-4 flex gap-4 items-center">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{stream.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {stream.artist}
                    </p>
                    <p className="text-sm font-medium text-primary mt-1">
                      {stream.scheduledTime}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button size="sm">Go Live</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="mt-4">
            <MediaGrid items={pastStreams} />
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="p-8 text-center">
              <h3 className="font-medium text-lg">Stream Analytics</h3>
              <p className="text-muted-foreground">
                Detailed analytics module will be available in the next update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Livestreams;
