import { useBowData } from '@/hooks/useBowData';

export function BowRangeInfo() {
  const { bowData } = useBowData();

  if (!bowData) return null;

  return (
    <div className="mb-12">
      <p className="mb-6">{bowData.rangeInfo.announcement}</p>
      
      {bowData.rangeInfo.image && (
        <div className="mb-6">
          <img 
            src={bowData.rangeInfo.image.src}
            alt={bowData.rangeInfo.image.alt}
            className="max-w-full h-auto"
          />
        </div>
      )}

      <div className="space-y-6">
        {bowData.rangeInfo.sections.map((section, index) => (
          <div key={index}>
            <h3 className="font-bold mb-2">{section.title}</h3>
            <div className="space-y-2">
              {section.content.map((item, itemIndex) => (
                <p key={itemIndex} className="ml-0">
                  {item.includes('Crossbows are allowed') ? (
                    <>
                      Crossbows are allowed, <em><strong>but it is up to the shooter to bring and use a suitable target.</strong></em>
                    </>
                  ) : item.includes('No broad heads') ? (
                    <strong>{item}</strong>
                  ) : (
                    item
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}