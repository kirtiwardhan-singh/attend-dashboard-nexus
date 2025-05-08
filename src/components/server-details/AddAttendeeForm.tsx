
import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

// Form schema for adding an attendee
const attendeeFormSchema = z.object({
  userName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  userAddress: z.string().min(10, { message: "Please enter a valid wallet address." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
});

export type AttendeeFormValues = z.infer<typeof attendeeFormSchema>;

type AddAttendeeFormProps = {
  onSubmit: (values: AttendeeFormValues) => void;
};

export function AddAttendeeForm({ onSubmit }: AddAttendeeFormProps) {
  const form = useForm<AttendeeFormValues>({
    resolver: zodResolver(attendeeFormSchema),
    defaultValues: {
      userName: "",
      userAddress: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (Optional)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Used for notifications about attendance and credentials.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Add Attendee</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
