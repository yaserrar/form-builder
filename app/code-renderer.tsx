import { compileTypescript } from "@/lib/compiler";
import { useEffect, useRef, useState } from "react";

const CodeRenderer = ({ code }: { code: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [dom, setDom] = useState<string | undefined>(undefined);

  useEffect(() => {
    const compileCode = async () => {
      const compiledCode = await compileTypescript(code);
      setDom(compiledCode);
    };

    compileCode();
  }, [code]);

  return (
    <div className="min-h-[1000px]">
      <iframe
        width="100%"
        height="1000px"
        tabIndex={1000}
        title="The editor's rendered HTML document"
        srcDoc={dom}
        ref={iframeRef}
        className="mx-auto my-0 block w-full min-w-[769] overflow-hidden border-0 rounded-lg"
      />
    </div>
  );
};

export default CodeRenderer;
