interface HowItWorksStepProps {
  stepNumber: number;
  title: string;
  description: string;
}

export function HowItWorksStep({ stepNumber, title, description }: HowItWorksStepProps) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 border-2 border-primary rounded-full text-primary font-bold text-2xl">
        {stepNumber}
      </div>
      <h3 className="text-xl font-bold text-text-heading">{title}</h3>
      <p className="mt-2 text-text-body">{description}</p>
    </div>
  );
}