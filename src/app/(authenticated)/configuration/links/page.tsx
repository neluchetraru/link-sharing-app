"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { List, Plus } from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { saveLinks } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Icons } from "@/components/Icons";
import { PreviewType, usePreview } from "@/hooks/usePreview";
import { Account, PLATFORMS } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import PhonePreview from "@/app/(authenticated)/configuration/PhonePreview";
import { getUserData } from "@/app/auth-callback/actions";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const linksFormSchema = z.object({
  links: z.array(
    z.object({
      platform: z.string().min(2, {
        message: "Please select a valid platform.",
      }),
      profile: z.string().min(3, {
        message: "Pease enter a valid profile.",
      }),
    })
  ),
});

export type LinksFormValues = z.infer<typeof linksFormSchema>;

const Page = () => {
  const { setPreview } = usePreview();

  const { user, isLoading } = useKindeBrowserClient();

  const { data: preview, isError } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => await getUserData(user as KindeUser),
    retry: true,
    retryDelay: 500,
  });

  const form = useForm<LinksFormValues>({
    resolver: zodResolver(linksFormSchema),
    defaultValues: undefined,
    mode: "onBlur",
  });

  const fieldArray = useFieldArray({
    name: "links",
    control: form.control,
  });

  form.watch(() => {
    setPreview({
      account: preview?.account || ({} as Account),
      links: form.getValues("links"),
    });
  });

  useEffect(() => {
    form.reset({ links: preview?.links });
  }, [preview, form]);

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["update-links"],
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: LinksFormValues;
    }) => saveLinks(userId, data.links),
    onSuccess: () => {
      toast({
        title: "Links updated",
        description: "Your links have been updated successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update links",
        description:
          "An error occurred while updating your links. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LinksFormValues) => {
    saveConfig({ userId: preview?.account?.id!, data });
  };
  return (
    <>
      <PhonePreview className="hidden md:flex lg:col-span-5 p-4 shadow-elevated rounded-md col-span-full" />
      <ScrollArea
        className={cn(
          "lg:col-span-7 p-4 shadow-elevated col-span-full w-full flex flex-col gap-y-2 px-4 py-6 rounded-md h-full md:h-[calc(100vh-8rem)]"
        )}
      >
        <div className="flex flex-col gap-y-2">
          <div className="space-y-2 pb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Customize your links
            </h1>
            <p className="text-gray-600 text-sm">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>{" "}
          <Button
            variant="outline"
            className="gap-x-1"
            onClick={() =>
              fieldArray.append({
                platform: "",
                profile: "",
              })
            }
          >
            {" "}
            <Plus size={15} /> Add new link{" "}
          </Button>
        </div>

        {/* LinkCards go here */}
        <Form {...form}>
          <form
            className="py-3 gap-y-4 flex flex-col pb-32"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {fieldArray.fields.map((field, index) => {
              return (
                <div
                  className="bg-gray-100 px-3 py-4 rounded-md"
                  key={field.id}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm flex items-center gap-x-2 font-bold">
                      <List size={13} /> Link #{index + 1}
                    </h3>
                    <a
                      href="#"
                      className={
                        "text-gray-500 text-sm hover:text-destructive transition-all"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        fieldArray.remove(index);
                      }}
                    >
                      Remove
                    </a>
                  </div>

                  <FormField
                    control={form.control}
                    name={`links.${index}.platform`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start gap-y-2 pt-4">
                        <FormLabel className="text-xs text-gray-600">
                          Platform
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            form.setValue(`links.${index}.platform`, value);
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                "w-full relative focus-visible:ring-offset-0 focus-visible:ring-0 border-gray-300 flex items-center text-gray-600",
                                {
                                  "border-destructive":
                                    form.formState?.errors?.links?.[index]
                                      ?.platform,
                                }
                              )}
                            >
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="w-full z-[999]">
                            <SelectGroup>
                              {PLATFORMS.map((platform) => (
                                <SelectItem
                                  value={platform.value}
                                  key={platform.value}
                                >
                                  {platform.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                          {form.formState.errors.links?.[index]?.platform && (
                            <p className="text-destructive text-xs pt-2">
                              {
                                form.formState?.errors?.links?.[index]?.platform
                                  ?.message
                              }
                            </p>
                          )}
                        </Select>{" "}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`links.${index}.profile`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs text-gray-600">
                          Link
                        </FormLabel>
                        <div className="relative w-full flex flex-nowrap items-center text-gray-600 border-gray-300 bg-white rounded-md">
                          <LinkIcon className="mx-4 shrink-0" size={14} />
                          <Label className="text-sm w-full flex-1 whitespace-nowrap">
                            {
                              PLATFORMS.filter(
                                (platform) =>
                                  platform.value ===
                                  form.getValues("links")[index].platform
                              )[0]?.start
                            }
                          </Label>
                          <Input
                            className={cn(
                              "focus-visible:ring-offset-0 text-sm focus-visible:ring-0 border-0 px-0",
                              {
                                "border-destructive":
                                  form.formState.errors.links?.[index]?.profile,
                              }
                            )}
                            placeholder="your-profile"
                            {...field}
                          />
                        </div>
                        {form.formState.errors.links?.[index]?.profile && (
                          <p className="text-destructive text-xs pt-2">
                            {
                              form.formState?.errors?.links?.[index]?.profile
                                ?.message
                            }
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              );
            })}
            <div className="absolute inset-x-0 h-[40px] bottom-20 bg-gradient-to-t from-white to-transparent from-50%" />
            <div className="absolute inset-x-0 bottom-0 bg-white flex justify-end py-6 border-t border-t-gray-300/80 px-4 z-[80]">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto"
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </>
  );
};

export default Page;
