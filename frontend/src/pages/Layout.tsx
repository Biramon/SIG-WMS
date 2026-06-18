import { NavLink, Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 select-none">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <Link
          className="p-6 text-2xl font-bold border-b border-slate-800 tracking-wider cursor-pointer select-none"
          to="/"
        >
          📦 SIG-WMS
        </Link>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/estoque"
            className={({ isActive }) =>
              `block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            Gerenciar Estoque
          </NavLink>
          <NavLink
            to="/product-types"
            className={({ isActive }) =>
              `block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            Tipos de Produto
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {/* É aqui que as páginas do router vão aparecer */}
        <Outlet />
      </main>
    </div>
  );
}
