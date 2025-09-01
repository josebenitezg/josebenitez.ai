"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold mb-2">Algo salió mal</h1>
      <p className="text-neutral-400 max-w-md">{error.message || 'Ha ocurrido un error inesperado.'}</p>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 text-white"
      >
        Reintentar
      </button>
    </div>
  );
}


