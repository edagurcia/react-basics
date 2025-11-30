import { usePatientStore } from "../store/patient-store";
import { PatientDetails } from "./PatientDetails";

export const PatientsList = () => {
  const patients = usePatientStore((state) => state.patients);

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      {patients.length ? (
        <>
          <h2 className="font-black text-2xl text-center">
            Listado de pacientes
          </h2>
          <p className="text-lg mt-5 mb-10 text-center">
            Administra tus{" "}
            <span className="text-indigo-600 font-bold">pacientes y citas</span>
          </p>

          {patients.map((patient) => (
            <PatientDetails key={patient.id} patient={patient} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-semibold text-2xl text-center">
            No hay pacientes registrados
          </h2>
          <p className="text-lg mt-5 mb-10 text-center">
            Comienza agregando pacientes{" "}
            <span className="text-indigo-600 font-bold">en tu veterinaria</span>
          </p>
        </>
      )}
    </div>
  );
};
