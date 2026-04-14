interface StrengthMeterProps {
  score: number;
  label: string;
  color: string;
}

const StrengthMeter = ({ score, label, color }: StrengthMeterProps) => {
  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="flex gap-1.5 flex-1">
        {[1, 2, 3, 4].map((segment) => (
          <div
            key={segment}
            className="h-1 flex-1 rounded-none transition-colors duration-300"
            style={{
              backgroundColor: segment <= score ? color : '#1a221a',
            }}
          />
        ))}
      </div>
      {label && (
        <span
          className="font-mono uppercase tracking-widest text-[10px] shrink-0"
          style={{ color }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default StrengthMeter;
