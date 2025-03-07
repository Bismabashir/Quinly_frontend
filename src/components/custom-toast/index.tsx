import { toast } from "sonner";

export const customSuccessToast = (description: string) => {
  toast("Success!", {
    description: description,
    style: {
      backgroundColor: "#22c55e",
      color: "#ffffff",
    },
  });
};

export const customErrorToast = (description: string) => {
  toast("Error!", {
    description: description,
    style: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
    },
  });
};
