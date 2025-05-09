import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Server } from '@/types';

type EditServerFormProps = {
  server: Server;
  onCancel: () => void;
  onSave: () => void;
};

export function EditServerForm({ server, onCancel, onSave }: EditServerFormProps) {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none" htmlFor="server-name">
          Server Name
        </label>
        <Input id="server-name" defaultValue={server.name} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none" htmlFor="server-type">
          Server Type
        </label>
        <select 
          id="server-type" 
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
          defaultValue={server.type}
        >
          <option value="CLASSROOM">Classroom</option>
          <option value="EVENT">Event</option>
          <option value="MEETING">Meeting</option>
        </select>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save Changes</Button>
      </DialogFooter>
    </form>
  );
}
