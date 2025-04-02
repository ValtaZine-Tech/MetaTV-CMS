
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

const UploadMusic = () => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: '',
      artist: '',
      genre: '',
      releaseDate: '',
      isFeatured: false,
      isExplicit: false,
      description: '',
      file: null,
      artwork: null,
    }
  });

  interface FormData {
    title: string;
    artist: string;
    genre: string;
    releaseDate: string;
    isFeatured: boolean;
    isExplicit: boolean;
    description: string;
    file: File | null;
    artwork: File | null;
  }

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    
    // Simulate successful upload
    setTimeout(() => {
      toast({
        title: "Upload successful",
        description: "Your music track has been uploaded.",
      });
      
      // Reset form
      form.reset();
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Upload Music" />
      
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/music">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Music
            </Link>
          </Button>
        </div>
        
        <MediaHeader 
          title="Upload Music"
          description="Add a new track to your music library"
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
                        <FormLabel>Track Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter track title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="artist"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Artist *</FormLabel>
                          <FormControl>
                            <Input placeholder="Artist name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="genre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Genre</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select genre" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pop">Pop</SelectItem>
                              <SelectItem value="rock">Rock</SelectItem>
                              <SelectItem value="hiphop">Hip Hop</SelectItem>
                              <SelectItem value="electronic">Electronic</SelectItem>
                              <SelectItem value="jazz">Jazz</SelectItem>
                              <SelectItem value="classical">Classical</SelectItem>
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
                            placeholder="Describe your track..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="releaseDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Release Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
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
                            <FormLabel>Featured Track</FormLabel>
                            <FormDescription>
                              Display this track in featured sections
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isExplicit"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Explicit Content</FormLabel>
                            <FormDescription>
                              Mark this track as containing explicit content
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Track
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
                  <Label htmlFor="audioFile">Audio File *</Label>
                  <div className="mt-2 flex items-center justify-center w-full">
                    <label
                      htmlFor="audioFile"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          MP3, WAV, FLAC (MAX. 50MB)
                        </p>
                      </div>
                      <input id="audioFile" type="file" className="hidden" accept="audio/*" />
                    </label>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="artworkFile">Cover Artwork</Label>
                  <div className="mt-2 flex items-center justify-center w-full">
                    <label
                      htmlFor="artworkFile"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          JPG, PNG (1:1 ratio recommended)
                        </p>
                      </div>
                      <input id="artworkFile" type="file" className="hidden" accept="image/*" />
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
                  <Label htmlFor="license">License</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="exclusive">Exclusive</SelectItem>
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

export default UploadMusic;