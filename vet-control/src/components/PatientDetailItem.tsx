type PatientDetailItemProps = {
  label: string;
  value: string;
};

export const PatientDetailItem = ({ label, value }: PatientDetailItemProps) => {
  return (
    <p className="font-bold mb-3 text-gray-700 uppercase">
      {label}: <span className="font-normal normal-case">{value}</span>
    </p>
  );
};
