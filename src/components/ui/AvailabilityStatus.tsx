
interface AvailabilityStatusProps {
  status: string;
  className?: string;
}

export function AvailabilityStatus({ status, className = '' }: AvailabilityStatusProps): JSX.Element {
  return (
    <div className={`inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full font-semibold text-lg ${className}`}>
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      {status}
    </div>
  );
}