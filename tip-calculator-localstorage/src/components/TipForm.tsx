import type { Dispatch, SetStateAction } from "react";
import { tipOptions } from "../data/db";

interface TipFormProps {
  tip: number;
  setTip: Dispatch<SetStateAction<number>>;
}

export const TipForm = ({ tip, setTip }: TipFormProps) => {
  // el signo mas (+) lo convierte el valor a número

  return (
    <div>
      <h3 className="text-lg font-black">Propina</h3>

      <form>
        {tipOptions.map((tipOption) => (
          <div key={tipOption.id} className="flex gap-2">
            <label htmlFor={tipOption.id}>{tipOption.label}</label>
            <input
              type="radio"
              name="tip"
              id={tipOption.id}
              value={tipOption.value}
              onChange={(e) => setTip(+e.target.value)}
              checked={tipOption.value === tip}
            />
          </div>
        ))}
      </form>
    </div>
  );
};
