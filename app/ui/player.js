export default function Player({ username, code, team, tags, message }) {
  return (
    <div className="w-96 border p-4">
      <h2>
        {username} - {team}
      </h2>
      <h4>{code}</h4>
      <div className="flex gap-4">
        {tags?.map((tag) => (
          <div key={tag}>{tag}</div>
        ))}
      </div>
      <p>{message}</p>
    </div>
  );
}
