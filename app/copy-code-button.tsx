"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

type Props = {
  code: string;
};

const CopyCodeButton = ({ code }: Props) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Button
      disabled={copied}
      color="primary"
      size="icon"
      variant="outline"
      className="absolute right-2 top-4"
      onClick={onCopy}
    >
      {!copied ? (
        <Copy strokeWidth={2} size={15} />
      ) : (
        <Check strokeWidth={2} size={15} />
      )}
    </Button>
  );
};

export default CopyCodeButton;
