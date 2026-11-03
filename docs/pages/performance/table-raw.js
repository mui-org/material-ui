import NoSsr from '@mui/material/NoSsr';

const data = { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 };
const rows = Array.from(new Array(100)).map(() => data);

export default function TableRaw() {
  return (
    <NoSsr defer>
      <table>
        <thead>
          <tr>
            <th>Dessert (100g serving)</th>
            <th>Calories</th>
            <th>Fat&nbsp;(g)</th>
            <th>Carbs&nbsp;(g)</th>
            <th>Protein&nbsp;(g)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row.name}</th>
              <td>{row.calories}</td>
              <td>{row.fat}</td>
              <td>{row.carbs}</td>
              <td>{row.protein}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </NoSsr>
  );
}
