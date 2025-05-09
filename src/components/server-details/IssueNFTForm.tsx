
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Attendance } from '@/types';

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type IssueNFTFormProps = {
  attendee: Attendance;
  onSubmit: (values: FormValues & { attendeeId: string }) => void;
  onCancel: () => void;
};

export function IssueNFTForm({ attendee, onSubmit, onCancel }: IssueNFTFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'Attendance Certificate',
      description: `This certificate is awarded to ${attendee.userName} for their attendance and participation.`,
      imageUrl: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (values: FormValues) => {
    onSubmit({
      ...values,
      attendeeId: attendee.id,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recipient</h4>
          <div className="p-4 bg-muted/50 rounded-md">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">{attendee.userName}</span>
              <span className="text-xs text-muted-foreground font-mono">{attendee.userAddress}</span>
              {attendee.email && <span className="text-xs text-muted-foreground">{attendee.email}</span>}
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>NFT Image</FormLabel>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
            <input
              type="file"
              id="nft-image"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="nft-image" className="cursor-pointer w-full h-full block">
              {previewUrl ? (
                <div className="space-y-2">
                  <img src={previewUrl} alt="NFT Preview" className="max-h-48 mx-auto" />
                  <p className="text-sm text-muted-foreground">Click to change image</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <svg className="w-12 h-12 mx-auto text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                    <line x1="16" x2="22" y1="5" y2="5" />
                    <line x1="19" x2="19" y1="2" y2="8" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.86-3.86a2 2 0 0 0-2.84 0L7 18" />
                  </svg>
                  <p className="text-sm font-medium">Upload NFT Image</p>
                  <p className="text-sm text-muted-foreground">Click to select or drag and drop</p>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Issue NFT Credential
          </Button>
        </div>
      </form>
    </Form>
  );
}
