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
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

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
import {
  LinksFormValues,
  useLinksConfiguration,
} from "@/hooks/useLinksConfiguration";
import {
  ConfigurationContext,
  useConfiguration,
} from "@/providers/Configuration";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import ConfigurationSkeleton from "@/components/ConfigurationSkeleton";
import { useMutation } from "@tanstack/react-query";
import { saveLinks } from "@/app/configuration/links/actions";
import { toast } from "@/components/ui/use-toast";

interface PageProps {
  className?: string;
}

const Page = ({ className }: PageProps) => {
  const { fieldArray, form, PLATFORMS } =
    useContext(ConfigurationContext)?.linksConfiguration!;

  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();
  const router = useRouter();

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

  if (isLoading) return <ConfigurationSkeleton />;

  if (!isAuthenticated) {
    localStorage.setItem("redirect", "/configuration/links");
    return router.push("/api/auth/login");
  }

  const onSubmit = (data: LinksFormValues) => {
    saveConfig({ userId: user!.id, data });
  };
  return (
    <>
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
              <div className="bg-gray-100 px-3 py-4 rounded-md" key={field.id}>
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
                        onValueChange={(value) =>
                          // form.setValue(`links.${index}.platform`, value)
                          field.onChange(value)
                        }
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
                      <div className="relative w-full flex items-center text-gray-600 border-gray-300 bg-white rounded-md">
                        <LinkIcon className="mx-4 shrink-0" size={14} />
                        <Label className="text-sm">
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
          <div className="absolute inset-x-0 bottom-0 bg-white flex justify-end py-6 border-t border-t-gray-300/80 pr-4 z-[80]">
            <Button
              type="submit"
              disabled={isPending}
              onClick={() => {
                console.log(form.formState.errors);
              }}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Page;
