import { RequestInfo } from "rwsdk/worker";

export function Home({ ctx }: RequestInfo) {
  return (
    <div className="p-6">
      <div className="rounded-lg p-6 bg-pink-600 text-white shadow-lg">
        If this box is pink with white text, Tailwind is working 🎉
      </div>
    </div>
  );
}
