type CalorieItemProps = {
  value: number;
  text: string;
};

export const CalorieItem = ({ value, text }: CalorieItemProps) => {
  return (
    <p className="text-white/60 text-sm uppercase font-semibold rounded-full grid grid-cols-1 gap-1 text-center">
      <span className="text-orange-300 font-black text-3xl">{value}</span>
      {text}
    </p>
  );
};
