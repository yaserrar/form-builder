import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Github } from "lucide-react";

const Header = async () => {
  return (
    <section className="w-full border-b">
      <nav className="flex justify-between p-2 container mx-auto max-w-7xl text-sm items-center opacity-100">
        <Link href="/" className="font-extrabold text-xl text-primary p-2">
          Form Builder
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/yaserrar/form-builder"
            className={cn(buttonVariants({ variant: "outline" }), "flex gap-2")}
          >
            <Github size={18} />
            Repo
          </Link>
        </div>
      </nav>
    </section>
  );
};

export default Header;
