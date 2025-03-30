
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
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
import { Radio, Calendar, ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

const CreateStream = () => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: '',
      host: '',
      category: '',
      description: '',
      scheduleType: 'now',
      scheduledDate: '',
      scheduledTime: '',
      isRecurring: false,
      allowChat: true,
      thumbnail: null,
    }
  });

  const watchScheduleType = form.watch('scheduleType');

  interface FormData {
    title: string;
    host: string;
    category: string;
    description: string;
    scheduleType: string;
    scheduledDate: string;
    scheduledTime: string;
    isRecurring: boolean;
    allowChat: boolean;
    thumbnail: File | null;
  }

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    
    if (data.scheduleType === 'now') {
      // Simulate going live immediately
      toast({
        title: "You're live!",
        description: "Your livestream has started.",
      });
    } else {
      // Simulate scheduling a stream
      toast({
        title: "Stream scheduled",
        description: `Your stream has been scheduled for ${data.scheduledDate} at ${data.scheduledTime}.`,
      });
      form.reset();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Create Livestream" />
      
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/livestreams">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Livestreams
            </Link>
          </Button>
        </div>
        
        <MediaHeader 
          title="Create Livestream"
          description="Set up a new livestream session"
          action={
            watchScheduleType === 'now' 
              ? {
                  label: "Go Live Now",
                  icon: <Radio className="h-4 w-4" />,
                  onClick: () => form.handleSubmit(onSubmit)(),
                }
              : undefined
          }
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border p-6 space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stream Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter stream title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="host"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Host *</FormLabel>
                          <FormControl>
                            <Input placeholder="Host name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="music">Music</SelectItem>
                              <SelectItem value="talk-show">Talk Show</SelectItem>
                              <SelectItem value="performance">Live Performance</SelectItem>
                              <SelectItem value="qa">Q&A Session</SelectItem>
                              <SelectItem value="tutorial">Tutorial</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your livestream..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="scheduleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>When to go live</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select when to go live" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="now">Go live now</SelectItem>
                            <SelectItem value="scheduled">Schedule for later</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {watchScheduleType === 'scheduled' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="scheduledDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type="date" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="scheduledTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-8">
                    {watchScheduleType === 'scheduled' && (
                      <FormField
                        control={form.control}
                        name="isRecurring"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Recurring Stream</FormLabel>
                              <FormDescription>
                                Repeat this stream on a regular schedule
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={form.control}
                      name="allowChat"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Enable Live Chat</FormLabel>
                            <FormDescription>
                              Allow viewers to chat during the stream
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {watchScheduleType === 'scheduled' && (
                    <Button type="submit" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Stream
                    </Button>
                  )}
                </form>
              </Form>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6 space-y-4">
              <h3 className="text-lg font-medium">Stream Thumbnail</h3>
              
              <Label htmlFor="thumbnailFile">Thumbnail Image</Label>
              <div className="mt-2 flex items-center justify-center w-full">
                <label
                  htmlFor="thumbnailFile"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG (16:9 ratio recommended)
                    </p>
                  </div>
                  <input id="thumbnailFile" type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-4">Stream Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select defaultValue="public">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="quality">Stream Quality</Label>
                  <Select defaultValue="hd">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="hd">HD (720p)</SelectItem>
                      <SelectItem value="fullhd">Full HD (1080p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="dvr">DVR Mode</Label>
                  <Select defaultValue="enabled">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-4">After the Stream</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="save-recording" />
                  <Label htmlFor="save-recording">Save recording after stream</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="publish-recording" />
                  <Label htmlFor="publish-recording">Publish recording automatically</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateStream;