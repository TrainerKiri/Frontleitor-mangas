import { useParams } from "react-router-dom";

function Leitor() {
  const { id } = useParams();

  return (
    <div>
      <h1>Leitor de Mangás</h1>
      <p>Exibindo mangá ID: {id}</p>
    </div>
  );
}

export default Leitor;
