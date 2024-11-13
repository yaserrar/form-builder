import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ErrorMessage = ({ children, className }: Props) => {
  return (
    <p className={cn("mt-1 text-xs font-normal text-red-400", className)}>
      {children}
    </p>
  );
};

export default ErrorMessage;
