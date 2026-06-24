import React from "react";

interface FormWrapperProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isEditing?: boolean;
  children: React.ReactNode;
}

export function FormWrapper({
  title,
  onSubmit,
  onCancel,
  isEditing = false,
  children,
}: FormWrapperProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">{title}</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-4">{children}</div>

        <div className="flex gap-4 mt-2">
          <button
            type="submit"
            className={`px-6 py-2 text-white font-medium rounded-lg transition-colors ${
              isEditing
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Atualizar" : "Adicionar"}
          </button>

          {onCancel && isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
