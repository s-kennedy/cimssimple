import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { saveLocalFormData, getLocalFormData } from '../redux/modules/form'
import { editProject } from '../redux/modules/user'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

import Step1 from '../containers/step-1'
import Step2 from '../containers/step-2'
import Step3 from '../containers/step-3'
import Step4 from '../containers/step-4'
import SaveStatus from '../components/SaveStatus'

const styles = {
  flex: {
    flex: 1,
  },
}

class LongForm extends React.Component {
  componentDidMount() {
    const queryString = this.props.location.search
    const params = new URLSearchParams(queryString)
    const projectId = params.get('id')
    this.props.editProject(projectId)
    this.props.getLocalFormData(projectId)
  }

  convertPageToPDF = () => {
    const element = document.getElementById('pdf-form');
    html2pdf(element);
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <span style={styles.flex}>
              {`${this.props.formData['initiativeName']}`}
            </span>
            <Button
              variant="raised"
              color="secondary"
              onClick={() => window.print()}
            >
              Print
            </Button>
            <Button component={Link} to={'/'}>
              Exit form
            </Button>
          </Toolbar>
        </AppBar>
        <div id="pdf-form">
          <Step1
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            projectId={this.props.projectId}
          />

          <Step2
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            projectId={this.props.projectId}
          />

          <Step3
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            projectId={this.props.projectId}
          />

          <Step4
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            projectId={this.props.projectId}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formData: state.form,
    projectId: state.user.editing,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveLocalFormData: (fieldId, value, projectId) => {
      dispatch(saveLocalFormData(fieldId, value, projectId))
    },
    getLocalFormData: id => {
      dispatch(getLocalFormData(id))
    },
    editProject: id => {
      dispatch(editProject(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LongForm)