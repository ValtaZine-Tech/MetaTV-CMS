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

const Videos = () => {
  // Mock data
  const videoItems = [
    {
      id: "1",
      title: "How to Mix Like a Pro",
      artist: "Jane Smith",
      thumbnail: "/placeholder.svg",
      plays: 8700,
      likes: 325,
      type: "video" as const,
      duration: "15:20",
    },
    {
      id: "2",
      title: "Studio Tour 2023",
      artist: "Producer Mike",
      thumbnail: "/placeholder.svg",
      plays: 12600,
      likes: 940,
      type: "video" as const,
      duration: "22:45",
    },
    {
      id: "3",
      title: "Mastering Bass Techniques",
      artist: "Bass Master",
      thumbnail: "/placeholder.svg",
      plays: 6800,
      likes: 412,
      type: "video" as const,
      duration: "18:10",
    },
    {
      id: "4",
      title: "Vocal Recording Tips",
      artist: "Vocal Coach Sarah",
      thumbnail: "/placeholder.svg",
      plays: 9200,
      likes: 560,
      type: "video" as const,
      duration: "12:35",
    },
    {
      id: "5",
      title: "Behind the Scenes: Music Video",
      artist: "Director Alex",
      thumbnail: "/placeholder.svg",
      plays: 4500,
      likes: 280,
      type: "video" as const,
      duration: "25:18",
    },
    {
      id: "6",
      title: "Live Performance Highlights",
      artist: "Festival Productions",
      thumbnail: "/placeholder.svg",
      plays: 7300,
      likes: 520,
      type: "video" as const,
      duration: "32:40",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Video Library" />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Video Library</h1>
            <p className="text-muted-foreground">Manage your video content</p>
          </div>

          <Button className="w-full sm:w-auto" asChild>
            <Link to="/dashboard/videos/upload">
              <Plus className="h-4 w-4 mr-2" />
              Upload Video
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
                  Tutorials
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Music Videos
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Performances
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Behind the Scenes
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-right">
            Showing <strong>6</strong> of <strong>85</strong> videos
          </p>
        </div>

        <MediaGrid items={videoItems} />
      </main>
    </div>
  );
};

export default Videos;
