interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  isPro?: boolean;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonLink,
  isPro = false,
}: PricingCardProps) {
  return (
    <div className="bg-[rgb(var(--color-surface))] rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-colors">
      <h3 className="text-2xl font-bold mb-2">
        {title} <span className="text-gray-400">{price}</span>
      </h3>
      <p className="text-gray-400 mb-6">{description}</p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-300">
            <svg
              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
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
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={buttonLink}
        className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
          isPro
            ? 'bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500/10'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {buttonText}
      </a>
    </div>
  );
}
