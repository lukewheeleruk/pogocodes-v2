export default function Player({ username, code }) {
  return (
    <div className="w-96 border p-4">
      <h2>{username}</h2>
      <h4>{code}</h4>
    </div>
  );
}
