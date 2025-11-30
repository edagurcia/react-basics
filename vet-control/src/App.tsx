import { Toaster } from "sonner";
import { PatientForm } from "./components/PatientForm";
import { PatientsList } from "./components/PatientsList";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <div className="container mx-auto mt-20">
        <h1 className="font-black text-3xl text-center md:w-2/3 md:mx-auto">
          Seguimiento de pacientes{" "}
          <span className="text-indigo-700">Veterinaria</span>
        </h1>
      </div>

      <div className="mt-12 md:flex">
        <PatientForm />
        <PatientsList />
      </div>
    </>
  );
}

export default App;
