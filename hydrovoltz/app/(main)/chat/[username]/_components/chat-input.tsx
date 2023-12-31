"use client";

import { User } from "@prisma/client";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { createDirectMessage } from "@/actions/create-direct-message";
import { FormInput } from "@/components/form/form-input";

interface ChatInputProps {
  user: User;
  conversationId: string;
}

export const ChatInput = ({ user, conversationId }: ChatInputProps) => {
  const { execute } = useAction(createDirectMessage, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const content = formData.get("content") as string;

    execute({ content, conversationId });
  };

  return (
    <div className="mt-auto p-4 mb-2">
      <form action={onSubmit}>
        <FormInput id="content" placeholder={`Message ${user?.username}...`} />
      </form>
    </div>
  );
};
