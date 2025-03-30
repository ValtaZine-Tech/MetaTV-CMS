
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../components/ui/form';
import { MediaHeader } from '../components/media/MediaHeader';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Upload, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';

const AddUser = () => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      role: '',
      bio: '',
      website: '',
      avatar: null,
    }
  });

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
    bio: string;
    website: string;
    avatar: File | null;
  }

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    
    // Simulate successful user creation
    setTimeout(() => {
      toast({
        title: "User created",
        description: "New user has been added successfully.",
      });
      
      // Reset form
      form.reset();
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Add User" />
      
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/users">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Users
            </Link>
          </Button>
        </div>
        
        <MediaHeader 
          title="Add New User"
          description="Create a new user account"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border p-6 space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username *</FormLabel>
                          <FormControl>
                            <Input placeholder="username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select user role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="creator">Creator</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                            <SelectItem value="user">Standard User</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This determines the user's permissions in the system
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description about the user..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create User
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6 space-y-6">
              <h3 className="text-lg font-medium">User Preview</h3>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback className="text-lg">
                    {form.watch('firstName')?.[0] || ''}
                    {form.watch('lastName')?.[0] || ''}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h4 className="font-medium text-base">
                    {form.watch('firstName') || 'First'} {form.watch('lastName') || 'Last'}
                  </h4>
                  <p className="text-sm text-muted-foreground">@{form.watch('username') || 'username'}</p>
                  <div className="mt-1">
                    <Badge variant={form.watch('role') === 'admin' ? 'default' : 'outline'}>
                      {form.watch('role') || 'Role'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="avatarFile">Profile Picture</Label>
                <div className="mt-2 flex items-center justify-center w-full">
                  <label
                    htmlFor="avatarFile"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG (square ratio recommended)
                      </p>
                    </div>
                    <input id="avatarFile" type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-4">Account Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="status">Initial Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="access-level">Access Level</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                      <SelectItem value="full">Full Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-4">Account Creation</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="send-welcome-email" 
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked 
                  />
                  <Label htmlFor="send-welcome-email">Send welcome email</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="require-password-change" 
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked 
                  />
                  <Label htmlFor="require-password-change">Require password change on first login</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddUser;