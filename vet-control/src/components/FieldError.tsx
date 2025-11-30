import type { ReactNode } from "react";

export const FieldError = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-center my-4 bg-red-100 text-red-700 p-2 rounded-lg">
      {children}
    </p>
  );
};
