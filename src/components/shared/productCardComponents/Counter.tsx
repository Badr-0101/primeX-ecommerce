
interface CounterProps {
  value: number;
  onChange: (n: number) => void;
  min?: number;
}

const Counter = ({ value, onChange, min = 1 }: CounterProps) => {
    return (
  <div className='flex items-center gap-0.5 rounded-xl bg-primary-dark border border-primary-dark p-1  backdrop-blur-sm '>
    <button
      onClick={() => onChange(Math.max(min, value - 1))}
      disabled={value <= min}
                className={`text-white font-bold p-2 cursor-pointer `}
                style={{opacity: value <= min ? 0.5 : 1, cursor: value <= min ? "not-allowed" : "pointer"} }
    >−</button>
 
    <span className='text-white font-bold w-[36px] text-center text-[15px] font-variant-numeric:tabular-nums letter-spacing:-0.5px' >
      {value}
    </span>
 
    <button
      onClick={() => onChange(value + 1)}
      className='text-white font-bold p-2 cursor-pointer'
    >+</button>
  </div > 
    )};
export default Counter