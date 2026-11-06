import { AlertCircle } from "lucide-react";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded border border-red-200 bg-red-50 p-8 text-center">
      <AlertCircle className="size-6 text-red-600" />
      <p className="text-sm text-red-700">{message}</p>
      <button onClick={onRetry} className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
        Coba lagi
      </button>
    </div>
  );
}
