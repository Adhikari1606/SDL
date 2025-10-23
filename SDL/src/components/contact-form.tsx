"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  interest: z.string().min(1, "Please select an interest"),
  location: z.string().min(1, "Please select a location"),
  message: z.string(),
  communications: z.boolean().default(false),
  privacy: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
      interest: "",
      location: "",
      message: "",
      communications: false,
      privacy: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Form Submitted!",
      description: "We've received your message and will be in touch shortly.",
    });
    form.reset();
  }

  return (
    <div className="p-6 border-2 border-brand-yellow rounded-2xl relative bg-background shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-3">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone number*</FormLabel>
                    <FormControl>
                    <Input {...field} />
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
                    <FormLabel>Business email*</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Company*</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>

            <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Your interest*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                          <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="supply-chain">Supply Chain</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Location*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                          <SelectValue placeholder="Select your location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="north-america">North America</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="south-america">South America</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Enter your message here</FormLabel>
                <FormControl>
                    <Textarea
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <div className="space-y-3 pt-2">
              <FormField
              control={form.control}
              name="communications"
              render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                      <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal text-sm">
                      I would like to receive all TVS SCS communications
                      </FormLabel>
                  </div>
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                      <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal text-sm">
                          I have read and understood the <Link href="#" className="underline text-primary hover:text-primary/80">privacy notice</Link>
                      </FormLabel>
                      <FormMessage />
                  </div>
                  </FormItem>
              )}
              />
            </div>
            <div className="pt-2">
                <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-full">
                    Submit
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </form>
        </Form>
    </div>
  );
}
