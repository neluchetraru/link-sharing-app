"use client";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  List,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LinksConfigurationProps {
  className?: string;
}

const formSchema = z.object({
  links: z.array(
    z.object({
      platform: z.string().min(2, {
        message: "Please select a valid platform.",
      }),
      url: z.string().url({
        message: "Please enter a valid URL.",
      }),
    })
  ),
});

export const PLATFORMS = [
  {
    label: "Instagram",
    value: "instagram",
    icon: <Instagram className="w-4 h-4 text-gray-500" />,
  },
  {
    label: "Facebook",
    value: "facebook",
    icon: <Facebook className="w-4 h-4 text-gray-500" />,
  },
  {
    label: "TikTok",
    value: "tiktok",
    icon: <Facebook className="w-4 h-4 text-gray-500" />,
  },
  {
    label: "GitHub",
    value: "github",
    icon: <Github className="w-4 h-4 text-gray-500" />,
  },
  {
    label: "LinkedIn",
    value: "linkedin",
    icon: <Linkedin className="w-4 h-4 text-gray-500" />,
  },
] as const;

export type FormValues = z.infer<typeof formSchema>;

const LinksConfiguration = ({ className }: LinksConfigurationProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: [
        {
          platform: "",
          url: "",
        },
      ],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "links",
    control: form.control,
  });
  const onSubmit = (data: FormValues) => {
    console.log(form.getValues());
    console.log(form.formState.errors.links);
  };

  return (
    <ScrollArea
      className={cn(
        "w-full flex flex-col gap-y-2 px-4 py-6 rounded-md h-full md:h-[calc(100vh-8rem)]",
        className
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
            append({
              platform: "",
              url: "",
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
          {fields.map((field, index) => {
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
                      remove(index);
                    }}
                  >
                    Remove
                  </a>
                </div>
                <div className="flex flex-col items-start gap-y-2 pt-4">
                  <Select
                    onValueChange={(value) =>
                      form.setValue(`links.${index}.platform`, value)
                    }
                  >
                    <Label className="text-xs text-gray-600">Platform</Label>
                    <SelectTrigger
                      className={cn(
                        "w-full relative focus-visible:ring-offset-0 focus-visible:ring-0 border-gray-300 flex items-center text-gray-600",
                        {
                          "border-destructive":
                            form.formState.errors.links?.[index]?.platform,
                        }
                      )}
                    >
                      <SelectValue
                        placeholder="Select platform"
                        {...form.register(`links.${index}.platform`)}
                      />
                    </SelectTrigger>
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
                  <div className="w-full">
                    <Label className="text-xs text-gray-600">Link</Label>
                    <div className="relative w-full flex items-center text-gray-600">
                      <LinkIcon className="absolute mx-4" size={14} />
                      <Input
                        className={cn(
                          "focus-visible:ring-offset-0 focus-visible:ring-0 border-gray-300 pl-10",
                          {
                            "border-destructive":
                              form.formState.errors.links?.[index]?.url,
                          }
                        )}
                        placeholder="https://facebook.com/your-profile"
                        {...form.register(`links.${index}.url` as const)}
                      />
                    </div>
                    {form.formState.errors.links?.[index]?.url && (
                      <p className="text-destructive text-xs pt-2">
                        {form.formState?.errors?.links?.[index]?.url?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="absolute inset-x-0 h-[40px] bottom-20 bg-gradient-to-t from-white to-transparent from-50%" />
          <div className="absolute inset-x-0 bottom-0 bg-white flex justify-end py-6 border-t border-t-gray-300/80 pr-4 z-[999]">
            <Button
              type="submit"
              onClick={() => {
                console.log(form.formState.errors);
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default LinksConfiguration;
