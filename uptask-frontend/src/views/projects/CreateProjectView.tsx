import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createProject } from "@/api/ProjectAPI";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types";

export const CreateProjectView = () => {
  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (res) => {
      toast.success(res);
      navigate("/");
    },
  });

  const handleFormSubmit = (formData: ProjectFormData) => {
    mutate(formData);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black">Crear Proyecto</h1>

        <p className="text-xl font-light text-gray-500">
          Llena el siguiente formulario para crear el proyecto
        </p>

        <nav className="my-5">
          <Link
            to="/"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-lg font-bold cursor-pointer transition-colors"
          >
            Volver proyectos
          </Link>
        </nav>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Crear proyecto"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};
