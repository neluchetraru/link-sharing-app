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
import { Image, LogOut } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { saveAccount } from "./actions";
import { useUploadThing } from "@/lib/uploadthing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhonePreview from "@/app/(authenticated)/configuration/PhonePreview";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { PreviewType, usePreview } from "@/hooks/usePreview";
import { useEffect } from "react";
import { Account } from "@/lib/constants";
import { getUserData } from "@/app/auth-callback/actions";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export type AccountFormValues = z.infer<typeof accountFormSchema>;
const accountFormSchema = z.object({
  picture: z.string().optional(),
  name: z.string({ message: "Please enter your  name." }).min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  email: z.string({ message: "Please enter your email." }).email({
    message: "Please enter a valid email address.",
  }),
});

const Page = () => {
  const { setPreview } = usePreview();
  const { user, isLoading } = useKindeBrowserClient();

  const { data: preview, isError } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => await getUserData(user as KindeUser),
    retry: true,
    retryDelay: 500,
  });
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onBlur",
    defaultValues: undefined,
  });

  form.watch(() => {
    setPreview({
      account: {
        ...(preview?.account || ({} as Account)),
        ...form.getValues(),
      },
      links: preview?.links!,
    });
  });

  useEffect(() => {
    form.reset({
      picture: preview?.account?.picture,
      name: preview?.account?.name,
      email: preview?.account?.email,
    });
  }, [preview, form]);

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: AccountFormValues;
    }) => saveAccount(userId, data),
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your account has been updated successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update account",
        description:
          error.message +
          "An error occurred while updating your account. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const onSubmit = (data: AccountFormValues) => {
    saveConfig({ userId: preview?.account?.id!, data });
  };

  const handleUpload = async (file: File) => {
    if (!file) return;
    const res = await startUpload([file]);
    form.setValue("picture", res?.[0].url);
  };

  return (
    <>
      {" "}
      <PhonePreview className="hidden md:flex lg:col-span-5 p-4 shadow-elevated rounded-md col-span-full" />
      <ScrollArea
        className={cn(
          "lg:col-span-7 p-4 shadow-elevated col-span-full w-full flex flex-col gap-y-2 px-4 py-6 rounded-md h-full md:h-[calc(100vh-8rem)]"
        )}
      >
        <div className="flex flex-col gap-y-2">
          <div className="gap-y-2 pb-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Profile details
              </h1>
              <Link href="/api/auth/logout">
                <LogOut size={25} className="mr-2 text-destructive" />
              </Link>
            </div>
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
                name="picture"
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
                              form.formState.errors.picture,
                          }
                        )}
                      >
                        <Input
                          type="file"
                          {...field}
                          id="picture"
                          className="hidden"
                          placeholder="Picture"
                          accept="image/*"
                          name={field.name}
                          onChange={(e) => {
                            handleUpload(e.target.files?.[0]!);
                          }}
                          value={undefined}
                          title=""
                        />
                        <Label
                          htmlFor="picture"
                          className="w-full h-full cursor-pointer relative group"
                        >
                          {form.getValues("picture") ? (
                            <img
                              className="w-full h-full rounded-lg aspect-square object-scale-down"
                              src={form.getValues("picture")}
                              alt="account picture"
                            />
                          ) : (
                            <img
                              className="w-full h-full rounded-lg"
                              src="/account-placeholder.jpg"
                              alt="account placeholder picture"
                            />
                          )}

                          <div className="rounded-lg font-light text-white gap-y-2 absolute inset-0 z-50 opacity-0 hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 backdrop-brightness-50">
                            <Image
                              size={32}
                              className="transform group-hover:scale-110 transition-transform duration-300"
                            />
                            <p className="text-sm transform group-hover:translate-y-2 transition-transform duration-300">
                              Change image
                            </p>
                          </div>
                        </Label>
                      </div>

                      <FormDescription
                        className={cn("text-xs text-gray-600", {
                          "text-destructive": form.formState.errors.picture,
                        })}
                      >
                        Image must be less than 5MB. Use PNG, JPG, or BMP
                        format.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-gray-50/70 rounded-md flex items-center px-4 flex-col gap-y-5 py-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex items-center w-full space-y-0">
                    <FormLabel className="text-xs text-gray-600 basis-1/3">
                      Full name
                    </FormLabel>
                    <div className="basis-2/3">
                      <Input
                        {...field}
                        className="w-full"
                        onChange={field.onChange}
                        value={field.value || ""}
                      />
                      {form.formState.errors.name && (
                        <p className="text-destructive text-xs pt-2">
                          {form.formState.errors.name.message}
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
                      <Input
                        {...field}
                        className="w-full"
                        value={field.value || ""}
                      />
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
            <div className="absolute inset-x-0 bottom-0 bg-white flex justify-end py-6 border-t border-t-gray-300/80 px-4 z-[80] ">
              <Button
                type="submit"
                disabled={isPending || isUploading}
                className="w-full md:w-auto"
              >
                {isPending || isUploading ? "Loading..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </>
  );
};

export default Page;
