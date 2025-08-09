import { useRodData } from '@/hooks/useRodData';

export function RodMemberPresentation() {
  const { rodData } = useRodData();

  if (!rodData) return null;

  return (
    <div>
      <p className="text-left mb-4">{rodData.memberPresentation.introduction}</p>
      
      <div className="text-center space-y-2 mb-6">
        {rodData.memberPresentation.prompts.map((prompt, index) => (
          <p key={index}>{prompt}</p>
        ))}
      </div>

      <p className="font-bold">{rodData.memberPresentation.contact}</p>
    </div>
  );
}