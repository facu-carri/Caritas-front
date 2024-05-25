import { Icons } from "src/utils/Icons";

export default function LoadingAnimation() {
  
  const title = 'Caritas Internacionalist'

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="text-white text-4xl font-bold">
        <span className="inline-block">
          {title}
        </span>
      </div>
      <div className="mt-8 animate-spin">
        {Icons.loading}
      </div>
    </div>
  );
}