import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import type { DraftPatient, Patient } from "../types";

type PatientState = {
  patients: Patient[];
  activeId: Patient["id"];
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: string) => void;
  getPatientById: (id: string) => void;
  updatePatient: (data: DraftPatient) => void;
};

// Genera un nuevo paciente y agrega un ID para almacenar en el arreglo de pacientes
const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: uuid() };
};

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      patients: [],
      activeId: "",
      addPatient: (data) => {
        const newPatient = createPatient(data);

        set((state) => ({
          patients: [...state.patients, newPatient],
        }));
      },
      deletePatient: (id) => {
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id),
        }));
      },
      getPatientById: (id) => {
        set({ activeId: id });
      },
      updatePatient: (data) => {
        set((state) => ({
          patients: state.patients.map((statePatient) =>
            statePatient.id === state.activeId
              ? {
                  id: state.activeId,
                  ...data,
                }
              : statePatient
          ),
          activeId: "",
        }));
      },
    }),
    {
      name: "patients-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
