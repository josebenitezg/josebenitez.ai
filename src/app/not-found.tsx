export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold mb-2">Página no encontrada</h1>
      <p className="text-neutral-400">La página que buscas no existe.</p>
      <a href="/" className="mt-6 px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 text-white">Volver al inicio</a>
    </div>
  );
}


