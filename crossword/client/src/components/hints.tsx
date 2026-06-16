type hintsProps = {
    hintList: string[]
}

function Hints(props: hintsProps)
{
    return (
    <ul>
      {props.hintList.map((hintItem, index) => (
        <li className="list" key={index}>{hintItem}</li>
      ))}
    </ul>
  );
}

export default Hints