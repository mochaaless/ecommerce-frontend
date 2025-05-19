import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from '@mui/material/OutlinedInput';



export function DropDownSimple({ title, defaultValue, values, onChange }) {
  return (
    <FormControl size="small" style={{minWidth:"150px", maxWidth:"250px", paddingRight: "10px"}}>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={defaultValue}
        label={title}
        onChange={onChange}
      >
        <MenuItem value="None">None</MenuItem>
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function DropDownMultiSelect({ title, defaultValue, values, onChange }) {
  return (
    <FormControl size="small" style={{minWidth:"150px", maxWidth:"250px", paddingRight: "10px"}}>
      <Select
        multiple
        displayEmpty
        size="small"
        value={defaultValue}
        onChange={onChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em style={{ fontSize: '0.9rem' }}>{title}</em>;
          }
          return <span style={{ fontSize: '0.9rem' }}>{selected.join(', ')}</span>;
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        }}
      >
        <MenuItem disabled value="" style={{ fontSize: '0.8rem', padding: '4px 16px' }}>
          <em>{title}</em>
        </MenuItem>
        {values.map((value) => (
          <MenuItem
            key={value}
            value={value}
            style={{ fontSize: '0.6rem', padding: '4px 16px' }}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

