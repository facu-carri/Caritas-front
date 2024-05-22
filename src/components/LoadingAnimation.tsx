export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="text-white text-4xl font-bold">
        {['C', 'a', 'r', 'i', 't', 'a', 's', ' ', 'I', 'n', 't', 'e', 'r', 'n', 'a', 't', 'i', 'o', 'n', 'a', 'l', 'i', 's', 't'].map((char, index) => (
          <span
            key={index}
            className="inline-block bounce-animation"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="mt-8 spin-animation">
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path d="M12 6V12L16 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-25%);
          }
        }
        
        .bounce-animation {
          animation: bounce 1s infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .spin-animation {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
