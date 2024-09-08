"use server";

import { EmailTemplate } from "@/components/ui/email-template";
import { Resend } from "resend";
import { z } from "zod";
import { formSchema } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  try {
    // TODO: Add this emailFormData to some database

    const { error } = await resend.emails.send({
      from: `Acme <${process.env.RESEND_FROM_EMAIL}>`,
      to: [emailFormData.email],
      subject: "Welcome",
      react: EmailTemplate({ firstName: emailFormData.firstName }),
    });

    if (error) {
      throw error;
    }
  } catch (e) {
    throw e;
  }
};
