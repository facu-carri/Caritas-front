import { Icons } from "src/Icons";

export default function LoadingAnimation() {
  
  const title = 'Caritas Internacionalist'

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="text-white text-4xl font-bold">
        {title.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block animate-bounce"
            style={{ animationDelay: `${index * 50}ms`, animationDuration: '1s' }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="mt-8 animate-spin">
        {Icons.loading}
      </div>
    </div>
  );
}
