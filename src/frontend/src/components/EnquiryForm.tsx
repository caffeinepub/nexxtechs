import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAllCourses, useSubmitEnquiry } from "../hooks/useQueries";

interface FormData {
  name: string;
  email: string;
  phone: string;
  courseInterested: string;
  message: string;
}

const emptyForm: FormData = {
  name: "",
  email: "",
  phone: "",
  courseInterested: "",
  message: "",
};

interface EnquiryFormProps {
  /** Optional compact variant for inline/home-page usage */
  compact?: boolean;
}

export function EnquiryForm({ compact = false }: EnquiryFormProps) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const { data: courses } = useAllCourses();
  const submitEnquiry = useSubmitEnquiry();

  const courseOptions = [...(courses ?? []).map((c) => c.title), "Other"];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.courseInterested
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    submitEnquiry.mutate(form, {
      onSuccess: () => {
        toast.success("Enquiry submitted! We'll contact you shortly.");
        setForm(emptyForm);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      },
      onError: () => {
        toast.error("Failed to submit enquiry. Please try again.");
      },
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground mb-1">
            Thank you!
          </h3>
          <p className="text-muted-foreground text-sm">
            Your enquiry has been submitted. We'll get back to you soon.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary"
          onClick={() => setSubmitted(false)}
        >
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div
        className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}
      >
        {/* Name */}
        <div>
          <Label
            htmlFor="enq-name"
            className="text-foreground mb-1.5 block text-sm font-medium"
          >
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="enq-name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
            className="bg-muted/40 border-border focus:border-primary"
          />
        </div>

        {/* Email */}
        <div>
          <Label
            htmlFor="enq-email"
            className="text-foreground mb-1.5 block text-sm font-medium"
          >
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="enq-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
            className="bg-muted/40 border-border focus:border-primary"
          />
        </div>

        {/* Phone */}
        <div>
          <Label
            htmlFor="enq-phone"
            className="text-foreground mb-1.5 block text-sm font-medium"
          >
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="enq-phone"
            type="tel"
            placeholder="+91 98765 43210"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            required
            className="bg-muted/40 border-border focus:border-primary"
          />
        </div>

        {/* Course Interested In */}
        <div>
          <Label
            htmlFor="enq-course"
            className="text-foreground mb-1.5 block text-sm font-medium"
          >
            Course Interested In <span className="text-destructive">*</span>
          </Label>
          <Select
            value={form.courseInterested}
            onValueChange={(v) =>
              setForm((p) => ({ ...p, courseInterested: v }))
            }
          >
            <SelectTrigger
              id="enq-course"
              className="bg-muted/40 border-border focus:border-primary"
            >
              <SelectValue placeholder="Select a course..." />
            </SelectTrigger>
            <SelectContent>
              {courseOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div>
        <Label
          htmlFor="enq-message"
          className="text-foreground mb-1.5 block text-sm font-medium"
        >
          Message
        </Label>
        <Textarea
          id="enq-message"
          placeholder="Tell us about your learning goals, experience level, or any questions..."
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="bg-muted/40 border-border focus:border-primary resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={submitEnquiry.isPending}
        className="gap-2 bg-primary text-primary-foreground hover:opacity-90 glow-cyan w-full sm:w-auto"
        size={compact ? "default" : "lg"}
      >
        {submitEnquiry.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {submitEnquiry.isPending ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  );
}
