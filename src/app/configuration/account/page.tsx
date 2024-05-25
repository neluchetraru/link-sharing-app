"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

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
import { AccountFormValues } from "@/hooks/useAccountConfiguration";
import { cn } from "@/lib/utils";
import { useConfiguration } from "@/providers/Configuration";
import { Image } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import ConfigurationSkeleton from "@/components/ConfigurationSkeleton";

const Page = () => {
  const { form } = useConfiguration()?.accountConfiguration!;
  const onSubmit = (data: AccountFormValues) => {
    console.log(data);
  };

  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const router = useRouter();

  if (isLoading) return <ConfigurationSkeleton />;

  if (!isAuthenticated) {
    localStorage.setItem("redirect", "/configuration/links");
    router.push("/api/auth/login");
  }
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
                        name={field.name}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        value={undefined}
                        title=""
                      />
                      <Label
                        htmlFor="avatar"
                        className="w-full h-full cursor-pointer relative group"
                      >
                        {form.getValues("avatar") ? (
                          <img
                            className="w-full h-full rounded-lg aspect-square object-scale-down"
                            src={URL.createObjectURL(
                              form.getValues("avatar")[0]
                            )}
                            alt="account avatar"
                          />
                        ) : (
                          <img
                            className="w-full h-full rounded-lg"
                            src="/account-placeholder.jpg"
                            alt="account placeholder avatar"
                          />
                        )}

                        <div className="rounded-lg font-light text-white gap-y-2 absolute inset-0 z-50 group-hover:flex flex-col items-center justify-center hidden transition-all backdrop-brightness-50">
                          <Image size={32} />
                          <p className="text-sm">Change image</p>
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
                    <Input
                      {...field}
                      className="w-full"
                      value={field.value || ""}
                    />
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
                    <Input
                      {...field}
                      className="w-full"
                      onChange={field.onChange}
                      value={field.value || ""}
                    />
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
          <div className="absolute inset-x-0 bottom-0 bg-white flex justify-end py-6 border-t border-t-gray-300/80 pr-4 z-[999]">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Page;
