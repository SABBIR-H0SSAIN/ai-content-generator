"use client";
import copy from "copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function CopyButton({
  content = "",
  disabled,
}: {
  content: string;
  disabled?: boolean;
}) {
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    if (isCopied) {
      if (typeof window !== undefined) {
        copy(content);
      }
      setTimeout(() => {
        setIsCopied(false);
      }, 800);
    }
  }, [isCopied, content]);

  return (
    <Button
      disabled={disabled}
      onClick={() => setIsCopied(true)}
      className="text-white text-md "
    >
      {isCopied ? <Check /> : <Copy />}
      {isCopied ? "Copied" : "Copy"}
    </Button>
  );
}

export const CopyButtonIcon = ({
  content = "",
  disabled,
}: {
  content: string;
  disabled?: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    if (isCopied) {
      if (typeof window !== undefined) {
        copy(content);
      }
      setTimeout(() => {
        setIsCopied(false);
      }, 800);
    }
  }, [isCopied, content]);

  return (
    <Button
      disabled={disabled}
      onClick={() => setIsCopied(true)}
      variant="ghost"
      size="icon"
      className=" text-md "
    >
      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </Button>
  );
};
