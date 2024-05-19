"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, SquareUserRound } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  avatar: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  firstName: z.string({ message: "Please enter your first name." }).min(2, {
    message: "First name must be at least 2 characters long.",
  }),
  lastName: z.string({ message: "Please enter your first name." }).min(2, {
    message: "Last name must be at least 2 characters long.",
  }),
  email: z.string({ message: "Please enter your email." }).email({
    message: "Please enter a valid email address.",
  }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(form.getValues());
    console.log(form.formState.errors);
  };
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <div className="gap-y-2 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Profile details</h1>
          <p className="text-gray-600 text-sm">
            Add your details to create a personal touch to your profile
          </p>
        </div>{" "}
      </div>
      <Form {...form}>
        <form
          className="py-4 flex flex-col pb-32 gap-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="bg-gray-50/70 rounded-md flex items-center px-4 py-3">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="flex items-center w-full space-y-0">
                  <FormLabel className="text-xs text-gray-600 basis-1/3">
                    Profile Picture
                  </FormLabel>
                  <div className="basis-2/3 flex items-center gap-x-4">
                    <div
                      className={cn(
                        "size-32 shrink-0 cursor-pointer relative rounded-lg",
                        {
                          "border-destructive border-2 border-dashed ":
                            form.formState.errors.avatar,
                        }
                      )}
                    >
                      <Input
                        type="file"
                        {...field}
                        id="avatar"
                        className="hidden"
                        placeholder="Picture"
                        accept="image/*"
                        onChange={(event) => console.log(event)}
                        title=""
                      />
                      <Label
                        htmlFor="avatar"
                        className="w-full h-full cursor-pointer relative group"
                      >
                        <img
                          className="w-full h-full rounded-lg"
                          src="/account-placeholder.jpg"
                          alt="account placeholder avatar"
                        />
                        <div className="rounded-lg font-light text-white gap-y-2 absolute inset-0 z-50 group-hover:flex flex-col items-center justify-center hidden transition-all backdrop-brightness-50">
                          <Image size={32} />
                          <p className="text-sm">Choose image</p>
                        </div>
                      </Label>
                    </div>

                    <FormDescription
                      className={cn("text-xs text-gray-600", {
                        "text-destructive": form.formState.errors.avatar,
                      })}
                    >
                      Image must be less than 5MB. Use PNG, JPG, or BMP format.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="bg-gray-50/70 rounded-md flex items-center px-4 flex-col gap-y-5 py-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex items-center w-full space-y-0">
                  <FormLabel className="text-xs text-gray-600 basis-1/3">
                    First name
                  </FormLabel>
                  <div className="basis-2/3">
                    <Input {...field} className="w-full" />
                    {form.formState.errors.firstName && (
                      <p className="text-destructive text-xs pt-2">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex items-center w-full space-y-0">
                  <FormLabel className="text-xs text-gray-600 basis-1/3">
                    Last name
                  </FormLabel>
                  <div className="basis-2/3">
                    <Input {...field} className="w-full" />
                    {form.formState.errors.lastName && (
                      <p className="text-destructive text-xs pt-2">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex items-center w-full space-y-0">
                  <Label className="text-xs text-gray-600 basis-1/3">
                    Email
                  </Label>
                  <div className="basis-2/3">
                    <Input {...field} className="w-full" />
                    {form.formState.errors.email && (
                      <p className="text-destructive text-xs pt-2">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="absolute inset-x-0 h-[40px] bottom-20 bg-gradient-to-t from-white to-transparent from-50%" />
          <div className="absolute inset-x-0 bottom-0 bg-white flex justify-end py-6 border-t border-t-gray-300/80 pr-4 z-[999]">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Page;
