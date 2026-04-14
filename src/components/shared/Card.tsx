
const Card = ({title, value}: {title: string, value: string}) => {
 return (
    <div className="bg-zinc-900 p-4 rounded-xl">
      <p className="text-zinc-400 text-xs mb-2">{title}</p>
      <h4 className="text-xl font-bold">{value}</h4>
    </div>
  );
}

export default Card