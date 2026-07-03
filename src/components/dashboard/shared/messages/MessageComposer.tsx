"use client";

import { Paperclip, Send, Smile } from "lucide-react";
import type { FormEvent, KeyboardEvent } from "react";
import { useState } from "react";

import { cn } from "@/lib/cn";

type MessageComposerProps = {
  onSendMessage: (text: string) => void;
};

export function MessageComposer({ onSendMessage }: MessageComposerProps) {
  const [message, setMessage] = useState("");
  const [attachmentNote, setAttachmentNote] = useState("");
  const trimmedMessage = message.trim();

  function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!trimmedMessage) {
      return;
    }

    onSendMessage(trimmedMessage);
    setMessage("");
    setAttachmentNote("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3">
      {attachmentNote ? <p className="mb-2 text-xs font-semibold text-emerald-700">{attachmentNote}</p> : null}
      <form className="flex items-end gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 shadow-sm" onSubmit={handleSubmit}>
        <button
          className="inline-flex h-8 shrink-0 items-center justify-center gap-2 rounded-full px-2 text-xs font-semibold text-slate-500 transition hover:text-emerald-700"
          onClick={() => setAttachmentNote("File upload is not connected yet.")}
          type="button"
        >
          <Paperclip className="size-4" />
          <span className="hidden sm:inline">Attach file</span>
        </button>
        <textarea
          className="max-h-24 min-h-8 flex-1 resize-none bg-transparent px-3 py-1.5 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          value={message}
        />
        <button className="grid size-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:text-emerald-700" type="button">
          <Smile className="size-4" />
        </button>
        <button
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full text-white transition",
            trimmedMessage ? "bg-emerald-700 hover:bg-emerald-800" : "cursor-not-allowed bg-slate-300",
          )}
          disabled={!trimmedMessage}
          type="submit"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}
