export default function Options({ total, onUpdate }) {
  return (
    <>
      <button onClick={() => onUpdate("good")}>Good</button>
      <button onClick={() => onUpdate("neutral")}>Neutral</button>
      <button onClick={() => onUpdate("bad")}>Bad</button>
      {total !== 0 && <button onClick={() => onUpdate("reset")}>Reset</button>}
    </>
  );
}
