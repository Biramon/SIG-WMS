import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovimentacoes } from "../context/MovementContext";
import { useProdutos } from "../context/ProductContext";
import { Item } from "@/types/Item";

export default function MovementIn() {
  const navigate = useNavigate();
  const { addMovimentacao } = useMovimentacoes();
  const { produtos, loading: loadingProdutos } = useProdutos();

  const [produto, setProduto] = useState<Item>();
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [motivo, setMotivo] = useState("");
  const [observacao, setObservacao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const produtoSelecionado = produtos.find((p) => p.id === produto?.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produto || !quantidade || quantidade <= 0) {
      alert("Preencha o produto e uma quantidade válida.");
      return;
    }

    if (!produtoSelecionado) {
      alert("Produto selecionado inválido ou não encontrado.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addMovimentacao({
        produto,
        quantidade: Number(quantidade),
        tipo: "entrada",
        motivo: motivo || "Entrada manual",
        dataMovimentacao: new Date().toISOString(),
        observacao,
      });
      navigate("/movements");
    } catch (error) {
      alert("Erro ao registrar entrada.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-green-700">
          Registrar Entrada de Estoque
        </h1>
        <p className="text-gray-600">Adicione novos itens ao inventário.</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Produto *</label>
          <select
            value={produto?.id ?? ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              const found = produtos.find((p) => String(p.id) === selectedId);
              setProduto(found);
            }}
            className="border p-2 rounded-md bg-white"
            required
            disabled={loadingProdutos}
          >
            <option value="" disabled>
              {loadingProdutos ? "Carregando..." : "Selecione um produto"}
            </option>
            {produtos.map((p) => (
              <option key={p.id} value={String(p.id)}>
                {p.name}
              </option>
            ))}
          </select>
          {produtoSelecionado && (
            <span className="text-sm text-gray-500 mt-1">
              Estoque atual: <strong>{produtoSelecionado.quantity}</strong>
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Quantidade *</label>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) =>
              setQuantidade(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border p-2 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
            placeholder="Ex: 50"
            required
            disabled={!produto}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Motivo</label>
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            className="border p-2 rounded-md"
            placeholder="Ex: Compra de fornecedor, Devolução..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">
            Observações (Opcional)
          </label>
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            className="border p-2 rounded-md min-h-[100px]"
            placeholder="Detalhes adicionais..."
          />
        </div>

        <div className="mt-4 flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !produto}
            className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Salvando..." : "Confirmar Entrada"}
          </button>
        </div>
      </form>
    </div>
  );
}
