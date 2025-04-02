import { Header } from "../components/layout/Header";
import { MediaGrid } from "../components/media/MediaGrid";
import { Button } from "../components/ui/button";
import { Plus, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Music = () => {
  // Mock data
  const musicItems = [
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
      title: "Electric Dreams",
      artist: "Mike Johnson",
      thumbnail: "/placeholder.svg",
      plays: 6300,
      likes: 420,
      type: "music" as const,
      duration: "4:12",
    },
    {
      id: "3",
      title: "Midnight Groove",
      artist: "Sarah Wilson",
      thumbnail: "/placeholder.svg",
      plays: 8900,
      likes: 650,
      type: "music" as const,
      duration: "3:22",
    },
    {
      id: "4",
      title: "Urban Beats",
      artist: "DJ Maxwell",
      thumbnail: "/placeholder.svg",
      plays: 15200,
      likes: 980,
      type: "music" as const,
      duration: "5:18",
    },
    {
      id: "5",
      title: "Chill Waves",
      artist: "Luna Ray",
      thumbnail: "/placeholder.svg",
      plays: 9300,
      likes: 720,
      type: "music" as const,
      duration: "4:05",
    },
    {
      id: "6",
      title: "Deep House Mix",
      artist: "Alex Turner",
      thumbnail: "/placeholder.svg",
      plays: 11600,
      likes: 830,
      type: "music" as const,
      duration: "3:58",
    },
    {
      id: "7",
      title: "Acoustic Sessions",
      artist: "Emily Clarke",
      thumbnail: "/placeholder.svg",
      plays: 7400,
      likes: 510,
      type: "music" as const,
      duration: "3:37",
    },
    {
      id: "8",
      title: "Jazz Improvisations",
      artist: "Robert Miles",
      thumbnail: "/placeholder.svg",
      plays: 6200,
      likes: 430,
      type: "music" as const,
      duration: "6:14",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Music Library" />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Music Library</h1>
            <p className="text-muted-foreground">Manage your music tracks</p>
          </div>

          <Button className="w-full sm:w-auto" asChild>
            <Link to="/dashboard/music/upload">
              <Plus className="h-4 w-4 mr-2" />
              Upload Music
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 w-full sm:w-auto">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="az">A-Z</SelectItem>
                <SelectItem value="za">Z-A</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem checked>
                  Singles
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Albums
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Featured
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-right">
            Showing <strong>8</strong> of <strong>120</strong> tracks
          </p>
        </div>

        <MediaGrid items={musicItems} />
      </main>
    </div>
  );
};

export default Music;
