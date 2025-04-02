
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
import { Upload, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

const UploadVideo = () => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: '',
      creator: '',
      category: '',
      description: '',
      tags: '',
      isFeatured: false,
      allowComments: true,
      file: null,
      thumbnail: null,
    }
  });

  interface FormData {
    title: string;
    creator: string;
    category: string;
    description: string;
    tags: string;
    isFeatured: boolean;
    allowComments: boolean;
    file: File | null;
    thumbnail: File | null;
  }

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    
    // Simulate successful upload
    setTimeout(() => {
      toast({
        title: "Upload successful",
        description: "Your video has been uploaded.",
      });
      
      // Reset form
      form.reset();
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Upload Video" />
      
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/videos">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Videos
            </Link>
          </Button>
        </div>
        
        <MediaHeader 
          title="Upload Video"
          description="Add a new video to your library"
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
                        <FormLabel>Video Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter video title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="creator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Creator *</FormLabel>
                          <FormControl>
                            <Input placeholder="Creator name" {...field} />
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
                              <SelectItem value="tutorial">Tutorial</SelectItem>
                              <SelectItem value="vlog">Vlog</SelectItem>
                              <SelectItem value="performance">Performance</SelectItem>
                              <SelectItem value="behind-the-scenes">Behind the Scenes</SelectItem>
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
                            placeholder="Describe your video..."
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
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input placeholder="Add tags separated by commas" {...field} />
                        </FormControl>
                        <FormDescription>
                          Example: music, performance, studio
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-wrap gap-8">
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Featured Video</FormLabel>
                            <FormDescription>
                              Display this video in featured sections
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="allowComments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Allow Comments</FormLabel>
                            <FormDescription>
                              Allow viewers to comment on this video
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Video
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6 space-y-4">
              <h3 className="text-lg font-medium">Media Files</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="videoFile">Video File *</Label>
                  <div className="mt-2 flex items-center justify-center w-full">
                    <label
                      htmlFor="videoFile"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          MP4, MOV, AVI (MAX. 2GB)
                        </p>
                      </div>
                      <input id="videoFile" type="file" className="hidden" accept="video/*" />
                    </label>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="thumbnailFile">Thumbnail</Label>
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
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-4">Publishing Options</h3>
              
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
                  <Label htmlFor="monetization">Monetization</Label>
                  <Select defaultValue="none">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="ads">Ads</SelectItem>
                      <SelectItem value="premium">Premium Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadVideo;