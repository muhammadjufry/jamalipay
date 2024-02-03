"use client";
import * as z from "zod";
import { Sidebar } from "@/components/dashboard/settings/sidebar";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/dashboard/header";

type Props = {};

function Page({}: Props) {
  const session = useSession();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: session.data?.user?.name || "",
      username: session.data?.user?.name?.toLowerCase() || "",
      email: session.data?.user?.email || "",
      bio: "",
    },
  });

  const groups = [
    {
      label: "Personal Account",
      list: [
        {
          name: session.data?.user?.name || "",
          value: session.data?.user?.name?.toLowerCase() || "",
        },
      ],
    },
    {
      label: "Teams",
      list: [
        {
          name: "Jamali Shop",
          value: "jamali-shop",
        },
        {
          name: "Jamali TV",
          value: "jamali-tv",
        },
      ],
    },
  ];

  const onSubmit = () => {};

  return (
    <>
      <Header groups={groups} userData={session.data?.user} />
      <section className="mt-[69px]">
        <div className="p-4 flex flex-col gap-2 border-b">
          <h1 className="text-2xl font-bold tracking-light">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and settings
          </p>
        </div>
        <div className="grid grid-cols-[300px_1fr]">
          <div className="w-full">
            <Sidebar />
          </div>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-muted-foreground text-sm">
                This is how others will see your profile
              </p>
            </div>
            <Separator />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Abdullah" />
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
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="abdullah-12c" />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="abdullah@example.com" />
                      </FormControl>
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
                          {...field}
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-fit">
                  Update
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
