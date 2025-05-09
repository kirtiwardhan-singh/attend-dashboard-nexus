
import React from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';
import { Server } from '@/types';

const formSchema = z.object({
  walletAddress: z
    .string()
    .min(1, { message: "Wallet address is required" })
    .regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Must be a valid Ethereum wallet address",
    }),
  role: z.enum(['TEACHER', 'USER', 'EVENT_MANAGER'], {
    required_error: "Role is required",
  }),
  permissions: z.object({
    read: z.boolean().default(true),
    write: z.boolean().default(false),
  }),
});

type FormValues = z.infer<typeof formSchema>;

type InviteUserFormProps = {
  server: Server;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
};

export function InviteUserForm({ server, onSubmit, onCancel }: InviteUserFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: '',
      role: server.type === 'CLASSROOM' ? 'TEACHER' : 'USER',
      permissions: {
        read: true,
        write: false,
      },
    },
  });

  const handleRoleChange = (value: string) => {
    // Automatically set permissions based on role
    if (value === 'TEACHER' || value === 'EVENT_MANAGER') {
      form.setValue('permissions.write', true);
    } else {
      form.setValue('permissions.write', false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="walletAddress"
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
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleRoleChange(value);
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {server.type === 'CLASSROOM' ? (
                    <>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="TEACHER" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Teacher (Can mark attendance and issue credentials)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="USER" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Student (Read-only access)
                        </FormLabel>
                      </FormItem>
                    </>
                  ) : server.type === 'EVENT' ? (
                    <>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="EVENT_MANAGER" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Event Manager (Full access)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="USER" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Attendee (Read-only access)
                        </FormLabel>
                      </FormItem>
                    </>
                  ) : (
                    <>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="USER" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          User
                        </FormLabel>
                      </FormItem>
                    </>
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="permissions.read"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={true} // Always read permission
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Read Access
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Can view content in this server
                </p>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="permissions.write"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Write Access
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Can mark attendance and issue credentials
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Send Invitation
          </Button>
        </div>
      </form>
    </Form>
  );
}
