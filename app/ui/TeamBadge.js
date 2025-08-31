export default function TeamBadge({ team, level }) {
  let bgClass = "rounded-full px-2 flex items-center ";
  let textClass = "text-sm uppercase font-medium ";
  switch (team) {
    case "mystic":
      textClass += "text-blue-500";
      bgClass += "bg-blue-100";
      break;
    case "valor":
      textClass += "text-red-500";
      bgClass += "bg-red-100";
      break;
    case "instinct":
      textClass += "text-yellow-600";
      bgClass += "bg-yellow-100";
      break;
    default:
      textClass += "text-gray-500";
      bgClass += "bg-gray-100";
      break;
  }
  return (
    <div className="flex items-center gap-2">
      <div className={bgClass}>
        <span className={textClass}>{level}</span>
      </div>
    </div>
  );
}
