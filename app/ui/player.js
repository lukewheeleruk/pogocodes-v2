export default function Player({ name, level, team, bio }) {
  return (
    <div className="w-96 border p-4">
      <h2>{name}</h2>
      <h4>{level}</h4>
      <h4>{team}</h4>
      <p>{bio}</p>
    </div>
  );
}
