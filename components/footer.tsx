import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Footer = () => {
  return (
    <section className="container max-w-7xl mx-auto py-6 mt-10">
      <div className="flex justify-center items-center text-primary">
        Designed and Developed by{" "}
        <Link
          href="https://aserrar.dev"
          className={cn(
            buttonVariants({ variant: "link", size: "default" }),
            "hover:no-underline p-0 pl-2 font-semibold text-base"
          )}
        >
          Youssef Aserrar
        </Link>
      </div>
    </section>
  );
};

export default Footer;
