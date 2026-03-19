"use client";

export default function GenericPlaceholder({ title, description }: { title?: string, description?: string }) {
  // Temporary component just to fulfill routing obligations before building them out fully
  return (
    <div className="flex items-center justify-center p-20 border border-dashed border-zinc-800 rounded-2xl h-96">
      <div className="text-center">
        <h1 className="text-2xl font-bold font-mono uppercase text-zinc-300 mb-2">{title || 'Coming Soon'}</h1>
        <p className="text-zinc-500 font-mono text-sm max-w-sm">{description || 'This section is currently being constructed.'}</p>
      </div>
    </div>
  );
}
