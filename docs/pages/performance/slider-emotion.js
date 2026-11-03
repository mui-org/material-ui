import NoSsr from '@mui/material/NoSsr';
import Slider from '@mui/material/Slider';

const data = {
  name: 'Frozen yoghurt',
  calories: 159,
  fat: 6.0,
  carbs: 24,
  protein: 4.0,
};

const rows = Array.from(new Array(500)).map(() => data);

export default function SliderEmotion() {
  return (
    <NoSsr defer>
      <div style={{ width: 300 }}>
        {rows.map((row, index) => (
          <Slider value={20} key={index} />
        ))}
      </div>
    </NoSsr>
  );
}
