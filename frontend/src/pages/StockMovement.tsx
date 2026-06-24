import { useNavigate } from "react-router-dom";
import { useMovimentacoes } from "../context/MovementContext";
import { PageHeader } from "../components/PageHeader";
import { Table, Column } from "../components/Table";
import type { StockMovement } from "../types/StockMovement";

export default function StockMovement() {
  const { movimentacoes, loading, error } = useMovimentacoes();
  const navigate = useNavigate();

  if (loading) return <p className="p-4 text-gray-600">Carregando...</p>;
  if (error) return <p className="p-4 text-red-500">Erro: {error}</p>;

  const movimentacoesOrdenadas = [...movimentacoes].sort(
    (a, b) =>
      new Date(b.dataMovimentacao).getTime() -
      new Date(a.dataMovimentacao).getTime(),
  );

  const columns: Column<StockMovement>[] = [
    {
      header: "Data",
      accessor: (mov) => new Date(mov.dataMovimentacao).toLocaleString("pt-BR"),
    },
    {
      header: "Tipo",
      accessor: (mov) => (
        <span
          className={`px-2 py-1 rounded text-xs font-bold text-white uppercase ${
            mov.tipo === "entrada" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {mov.tipo}
        </span>
      ),
    },
    {
      header: "Produto",
      accessor: (mov) => mov.produto?.nome,
    },
    {
      header: "Qtd",
      accessor: "quantidade",
      className: "text-right font-semibold",
    },
    { header: "Motivo", accessor: (mov) => mov.motivo || "Não informado" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="Histórico de Movimentações"
        actions={
          <>
            <button
              onClick={() => navigate("/movements/in")}
              className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-700"
            >
              + ENTRADA
            </button>
            <button
              onClick={() => navigate("/movements/out")}
              className="bg-red-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-700"
            >
              - SAÍDA
            </button>
          </>
        }
      />

      <Table<StockMovement>
        columns={columns}
        data={movimentacoesOrdenadas}
        keyExtractor={(mov) => mov.id}
        emptyMessage="Nenhuma movimentação registrada até o momento."
      />
    </div>
  );
}
