import { Header } from "../components/layout/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import { Search, MoreHorizontal, Plus, Download } from "lucide-react";
import { Link } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joined: string;
  avatar?: string;
}

const Users = () => {
  // Mock data
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Creator",
      status: "active",
      joined: "Jan 10, 2023",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "active",
      joined: "Mar 15, 2023",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Creator",
      status: "active",
      joined: "Feb 8, 2023",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "User",
      status: "inactive",
      joined: "Apr 22, 2023",
    },
    {
      id: "5",
      name: "Robert Miles",
      email: "robert@example.com",
      role: "Creator",
      status: "active",
      joined: "May 3, 2023",
    },
    {
      id: "6",
      name: "Emily Clarke",
      email: "emily@example.com",
      role: "User",
      status: "pending",
      joined: "Jun 12, 2023",
    },
    {
      id: "7",
      name: "Alex Turner",
      email: "alex@example.com",
      role: "Creator",
      status: "active",
      joined: "Jul 5, 2023",
    },
    {
      id: "8",
      name: "Luna Ray",
      email: "luna@example.com",
      role: "User",
      status: "active",
      joined: "Aug 18, 2023",
    },
  ];

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="User Management" />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
              Manage your platform users and their roles
            </p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="w-full sm:w-auto" asChild>
              <Link to="/users/add">
                <Plus className="h-4 w-4 mr-1" />
                Add User
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 bg-muted text-muted-foreground w-full"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "Admin" ? "default" : "outline"}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      />
                      <span className="capitalize">{user.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing <strong>1-8</strong> of <strong>100</strong> users
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;
