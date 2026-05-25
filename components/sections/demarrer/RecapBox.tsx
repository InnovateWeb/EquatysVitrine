interface RecapBoxProps {
  choice: string;
  department: string;
}

export function RecapBox({ choice, department }: RecapBoxProps) {
  return (
    <div className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="text-ink text-[0.9rem] font-medium">{choice}</span>
      <span className="text-muted text-[0.65rem]">/</span>
      <span className="text-muted text-[0.85rem]">Département {department}</span>
    </div>
  );
}
