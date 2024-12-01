"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodePanel = ({ code }: { code: string }) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={vscDarkPlus}
      className="rounded-lg"
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodePanel;
