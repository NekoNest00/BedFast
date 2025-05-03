
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPasswordForm = ({ onBack }: { onBack: () => void }) => {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // This would connect to actual password reset functionality
    console.log("Password reset requested for:", data.email);
    toast({
      title: "Password reset link sent",
      description: "Please check your email to reset your password",
    });
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to login
      </button>
      
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Forgot your password?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your email and we'll send you a link to reset it.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="mail@example.com"
                      {...field}
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red/90">
            Send Reset Link
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
