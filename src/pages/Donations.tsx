import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { 
  BarChart, 
  DollarSign, 
  Download, 
  MoreHorizontal, 
  TrendingUp, 
  Users 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface Donation {
  id: string;
  donor: {
    name: string;
    avatar?: string;
  };
  recipient: {
    name: string;
    avatar?: string;
  };
  amount: number;
  date: string;
  message?: string;
  status: 'completed' | 'pending' | 'failed';
}

const Donations = () => {
  // Mock data
  const recentDonations: Donation[] = [
    {
      id: '1',
      donor: { name: 'John Doe' },
      recipient: { name: 'Jane Smith' },
      amount: 50.00,
      date: 'Today, 10:30 AM',
      message: 'Great stream, keep it up!',
      status: 'completed',
    },
    {
      id: '2',
      donor: { name: 'Mike Johnson' },
      recipient: { name: 'Sarah Wilson' },
      amount: 25.00,
      date: 'Today, 9:15 AM',
      message: 'Love your music!',
      status: 'completed',
    },
    {
      id: '3',
      donor: { name: 'Emily Clarke' },
      recipient: { name: 'Robert Miles' },
      amount: 100.00,
      date: 'Yesterday, 8:45 PM',
      message: 'Amazing performance last night!',
      status: 'completed',
    },
    {
      id: '4',
      donor: { name: 'Alex Turner' },
      recipient: { name: 'Luna Ray' },
      amount: 15.00,
      date: 'Yesterday, 6:20 PM',
      status: 'completed',
    },
    {
      id: '5',
      donor: { name: 'Anonymous' },
      recipient: { name: 'Jane Smith' },
      amount: 75.00,
      date: 'Yesterday, 3:10 PM',
      message: 'Your music helped me through tough times',
      status: 'completed',
    },
    {
      id: '6',
      donor: { name: 'Sarah Wilson' },
      recipient: { name: 'DJ Maxwell' },
      amount: 30.00,
      date: 'May 10, 2023',
      status: 'completed',
    },
    {
      id: '7',
      donor: { name: 'Robert Miles' },
      recipient: { name: 'Producer Mike' },
      amount: 45.00,
      date: 'May 9, 2023',
      message: 'Thanks for the production tips',
      status: 'completed',
    },
    {
      id: '8',
      donor: { name: 'Luna Ray' },
      recipient: { name: 'Emily Clarke' },
      amount: 20.00,
      date: 'May 8, 2023',
      status: 'completed',
    },
  ];

  const getStatusColor = (status: Donation['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const topDonors = [
    { name: 'John Doe', amount: 250.00, count: 12 },
    { name: 'Emily Clarke', amount: 175.00, count: 8 },
    { name: 'Mike Johnson', amount: 150.00, count: 10 },
    { name: 'Anonymous', amount: 120.00, count: 5 },
    { name: 'Sarah Wilson', amount: 100.00, count: 7 },
  ];

  const topRecipients = [
    { name: 'Jane Smith', amount: 450.00, count: 15 },
    { name: 'DJ Maxwell', amount: 320.00, count: 9 },
    { name: 'Luna Ray', amount: 280.00, count: 12 },
    { name: 'Robert Miles', amount: 235.00, count: 8 },
    { name: 'Emily Clarke', amount: 180.00, count: 6 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Donations" />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Donations</h1>
            <p className="text-muted-foreground">
              Track and manage donations on your platform
            </p>
          </div>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Donations
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Donations This Month
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,845</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Donors
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Donation
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$28.50</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="transactions">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="donors">Top Donors</TabsTrigger>
            <TabsTrigger value="recipients">Top Recipients</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>
                  A list of recent donations on your platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDonations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={donation.donor.avatar} />
                              <AvatarFallback>{donation.donor.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{donation.donor.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={donation.recipient.avatar} />
                              <AvatarFallback>{donation.recipient.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{donation.recipient.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          ${donation.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {donation.date}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(donation.status)}>
                            {donation.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Receipt</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="donors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Donors</CardTitle>
                <CardDescription>
                  Users who have contributed the most on your platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Donations</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topDonors.map((donor, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback>{donor.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{donor.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          ${donor.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {donor.count}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Profile</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recipients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Recipients</CardTitle>
                <CardDescription>
                  Creators who have received the most donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Creator</TableHead>
                      <TableHead>Total Received</TableHead>
                      <TableHead>Donations</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topRecipients.map((recipient, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback>{recipient.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{recipient.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          ${recipient.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {recipient.count}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Profile</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Donations;