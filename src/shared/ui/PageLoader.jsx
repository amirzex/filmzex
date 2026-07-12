import { RingLoader } from "react-spinners";

export default function PageLoader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <RingLoader color="red" aria-label="loading" />
      <p className="text-gray-400 text-sm animate-pulse">{message}</p>
    </div>
  );
}
