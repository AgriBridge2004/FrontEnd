export function AuthDecorativeDots() {
  return (
    <div aria-hidden="true" className="mt-5 grid w-16 grid-cols-3 gap-2.5 opacity-45">
      {Array.from({ length: 12 }).map((_, index) => (
        <span className="size-1.5 rounded-full bg-white" key={index} />
      ))}
    </div>
  );
}
