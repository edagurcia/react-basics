import { FaRegEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { PatientDetailItem } from "./PatientDetailItem";
import { usePatientStore } from "../store/patient-store";
import type { Patient } from "../types";

type PatientDetailsProps = {
  patient: Patient;
};

export const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const deletePatient = usePatientStore((state) => state.deletePatient);
  const getPatientById = usePatientStore((state) => state.getPatientById);

  const handleDelete = (id: string) => {
    deletePatient(id);
    toast.success("Paciente eliminado con éxito");
  };

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="ID" value={patient.id} />
      <PatientDetailItem label="Nombre" value={patient.name} />
      <PatientDetailItem label="Propietario" value={patient.caretaker} />
      <PatientDetailItem label="Email" value={patient.email} />
      <PatientDetailItem label="Fecha alta" value={patient.date.toString()} />
      <PatientDetailItem label="Síntomas" value={patient.symptoms} />

      <div className="flex justify-center gap-5 mt-10">
        <button
          type="button"
          title="Editar"
          onClick={() => getPatientById(patient.id)}
          className="py-2 px-10 bg-indigo-500 text-white font-bold uppercase rounded-lg hover:bg-indigo-700"
        >
          <FaRegEdit />
        </button>

        <button
          type="button"
          title="Borrar"
          onClick={() => handleDelete(patient.id)}
          className="py-2 px-10 bg-red-500 text-white font-bold uppercase rounded-lg hover:bg-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
