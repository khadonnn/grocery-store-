import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-96 flex items-center justify-center h-full w-full">
      <Loader2Icon className="animate-spin size-8 text-app-green mx-auto my-16" />
    </div>
  );
};
export default Loading;
