type MissionCardProps = {
  number: number;
  title: string;
  description: string;
  status: "complete" | "active" | "locked";
};

export default function MissionCard({
  number,
  title,
  description,
  status,
}: MissionCardProps) {
  const styles = {
    complete: "border-green-400/70 bg-green-400/10 text-white",
    active: "border-white bg-white/15 text-white",
    locked: "border-white/10 bg-white/5 text-gray-500",
  };

  return (
    <div className={`rounded-2xl border p-4 ${styles[status]}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
          Mission {number}
        </p>

        <p className="text-xs font-black uppercase">
          {status === "complete"
            ? "Complete"
            : status === "active"
            ? "Active"
            : "Locked"}
        </p>
      </div>

      <h3 className="mt-3 text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-400">
        {description}
      </p>
    </div>
  );
}