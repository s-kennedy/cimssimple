import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table'
import Grid from 'material-ui/Grid'
import Input from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import TextField from "material-ui/TextField";

import { withStyles } from "material-ui/styles";

const styles = {
  container: {
    overflowX: 'auto',
    paddingBottom: '1rem',
  },
  table: {
    marginBottom: '1rem',
  },
  cell: {
    whiteSpace: "normal",
    wordWrap: "break-word",
    verticalAlign: "bottom"
  },
  formControl: {
    width: "100%"
  },
  input: {
    fontSize: "0.8rem"
  },
  button: {
    marginLeft: '1rem',
  },
  disabled: {
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
}

class EditableTable extends React.Component {
  handleChange = (fieldName, rowIndex) => input => {
    const inputValue = input.target ? input.target.value : input
    let newData = [...this.props.tableData]
    const row = newData[rowIndex]
    const newRow = { ...row, [fieldName]: inputValue }
    newData.splice(rowIndex, 1, newRow)

    this.props.handleChange(newData)
  }

  handleDeleteRow = rowIndex => () => {
    let newData = [...this.props.tableData]
    newData.splice(rowIndex, 1)

    this.props.handleChange(newData)
  }

  defaultRowData = (row = {}) => {
    this.props.tableStructure.map(column => {
      row[column.fieldName] = ''
    })
    return row
  }

  createNewRow = () => {
    const emptyRowData = this.defaultRowData({ allowDelete: true })
    let newTableData = this.props.tableData ? [...this.props.tableData] : []
    newTableData.push(emptyRowData)

    this.props.handleChange(newTableData)
  }

  render() {
    const tableData = this.props.tableData ? this.props.tableData : []

    return (
      <Paper style={styles.container}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              {this.props.tableStructure.map(column => (
                <TableCell key={column.fieldName} padding="dense">
                  {column.header}
                </TableCell>
              ))}
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={`${this.props.id}-row-${index}`}>
                {this.props.tableStructure.map(column => {
                  if (column.type === 'custom') {
                    const InputComponent = this.props.customInputs[
                      column.fieldName
                    ]
                    return (
                      <TableCell
                        key={`${column.fieldName}-${index}`}
                        padding="dense"
                        className={this.props.classes.cell}
                      >
                        <InputComponent
                          value={row[column.fieldName]}
                          handleChange={this.handleChange(
                            column.fieldName,
                            index
                          )}
                          style={styles.input}
                        />
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell
                      key={`${column.fieldName}-${index}`}
                      padding="dense"
                      className={this.props.classes.cell}
                    >
                      <TextField
                        type={column.type}
                        defaultValue={row[column.fieldName]}
                        onBlur={this.handleChange(column.fieldName, index)}
                        InputProps={{ className: this.props.classes.input }}
                        className={this.props.classes.formControl}
                        multiline={column.type === 'text'}
                      />
                    </TableCell>
                  )
                })}
                <TableCell padding="checkbox">
                  {!!row.allowDelete ? (
                    <IconButton
                      aria-label="Delete"
                      onClick={this.handleDeleteRow(index)}
                    >
                      &times;
                    </IconButton>
                  ) : (
                    <small style={styles.disabled}>Imported</small>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button style={styles.button} onClick={this.createNewRow}>
          Add new row
        </Button>
      </Paper>
    )
  }
}

export default withStyles(styles)(EditableTable);
