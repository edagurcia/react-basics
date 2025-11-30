import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldError } from "./FieldError";
import { usePatientStore } from "../store/patient-store";
import type { DraftPatient } from "../types";

export const PatientForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<DraftPatient>();

  const patients = usePatientStore((state) => state.patients);
  const activeId = usePatientStore((state) => state.activeId);
  const addPatient = usePatientStore((state) => state.addPatient);
  const updatePatient = usePatientStore((state) => state.updatePatient);

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(
        (patient) => patient.id === activeId
      )[0];

      setValue("name", activePatient.name);
      setValue("caretaker", activePatient.caretaker);
      setValue("email", activePatient.email);
      setValue("date", activePatient.date);
      setValue("symptoms", activePatient.symptoms);
    }
  }, [activeId]);

  const registerPatient = (data: DraftPatient) => {
    if (activeId) {
      updatePatient(data);
    } else {
      addPatient(data);
    }

    toast.success("Paciente guardado con éxito");
    reset();
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administra</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre de la mascota es obligatorio.",
              minLength: { value: 2, message: "Mínimo 2 caracteres." },
            })}
          />

          {errors?.name && <FieldError>{errors.name?.message}</FieldError>}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El propietario de la mascota es obligatorio.",
            })}
          />

          {errors?.caretaker && (
            <FieldError>{errors.caretaker?.message}</FieldError>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email No Válido",
              },
            })}
          />

          {errors?.email && <FieldError>{errors.email?.message}</FieldError>}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("date", {
              required: "Fecha de alta es obligatorio.",
            })}
          />

          {errors?.date && <FieldError>{errors.date?.message}</FieldError>}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register("symptoms", {
              required: "Síntomas es obligatorio.",
            })}
          ></textarea>

          {errors?.symptoms && (
            <FieldError>{errors.symptoms?.message}</FieldError>
          )}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors disabled:opacity-30"
          value="Guardar Paciente"
          disabled={!isValid}
        />
      </form>
    </div>
  );
};
