"use client";

import { useAuthContext } from "@/app/lib/context/AuthContext";
import { usePlayersContext } from "@/app/lib/context/PlayersContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/app/lib/profileSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export default function SubmitProfileForm({ onClose }) {
  const { user, profile, setProfile } = useAuthContext();
  const { submitProfile } = usePlayersContext();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      code: "",
      team: "",
      level: "",
      tags: [],
      message: "",
    },
  });

  // Prepopulate form when profile changes
  useEffect(() => {
    if (profile) {
      form.reset({
        username: profile.username || "",
        code: profile.code || "",
        team: profile.team || "",
        level: profile.level || "",
        tags: profile.tags || [],
        message: profile.message || "",
      });
    }
  }, [profile, form]);

  const tagOptions = ["raids", "gifts", "pvp", "trades"];

  const onSubmit = async (values) => {
    await submitProfile(values, user);
    setProfile({ ...profile, ...values });
    onClose?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your trainer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Friend Code */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trainer Code</FormLabel>
              <FormControl>
                <Input placeholder="XXXXXXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Team Select */}
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="valor">Valor</SelectItem>
                  <SelectItem value="mystic">Mystic</SelectItem>
                  <SelectItem value="instinct">Instinct</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Level Select */}
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags Checkboxes */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-6">
                {tagOptions.map((tag) => (
                  <div key={tag} className="flex items-center gap-1">
                    <Checkbox
                      checked={field.value?.includes(tag)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, tag]
                          : field.value.filter((t) => t !== tag);
                        field.onChange(newValue);
                      }}
                    />
                    <span className="capitalize text-sm">{tag}</span>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Say something to other trainers..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {profile ? "Update Profile" : "Add Profile"}
        </Button>
      </form>
    </Form>
  );
}
