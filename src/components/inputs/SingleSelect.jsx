import React from 'react'
import ReactSelect from 'react-select'

import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';

const styles = {
  width: '100%',
  menu: {
    whiteSpace: 'pre-wrap'
  }
}

const SingleSelect = props => {
  const handleChange = event => {
    props.handleChange(event.target.value)
  }

  return (
    <Select
      multiple={props.multiple}
      value={props.value || ''}
      onChange={handleChange}
      input={<Input />}
      style={styles}
      SelectDisplayProps={{ style: styles.menu }}
    >
      {props.options.map(option => {
        return (
          <MenuItem key={option} value={option}>
            <ListItemText primary={option} />
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default SingleSelect;
