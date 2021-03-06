import React from 'react'
import { connect } from 'react-redux'
import { updateForm, getLocalFormData } from '../redux/modules/form'
import Link from 'gatsby-link'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'

import TextInput from '../components/inputs/TextInput'
import SingleSelect from '../components/inputs/SingleSelect'
import RadioButtons from '../components/inputs/RadioButtons'
import EditableTable from '../components/inputs/EditableTable'

import PageTitle from '../components/PageTitle'
import Question from '../components/Question'
import Label from '../components/Label'
import HelpText from '../components/HelpText'
import InputSection from '../components/InputSection'
import CimsInstructions from '../components/CimsInstructions'

import {
  initiativeTypes,
  initiativeSubTypes,
  peopleResourcesTableStructure,
} from '../config/constants'

class Step1 extends React.Component {
  generateChangeHandler = fieldId => {
    return value => {
      this.props.startEditing()
      this.props.updateForm(fieldId, value, this.props.projectId)
    }
  }

  render() {
    return (
      <div style={{ padding: '1rem' }}>
        <PageTitle>Step 1 out of 4: Starting a new project</PageTitle>

        <Question>
          <InputSection>
            <Label htmlFor="initiativeName">1. Initiative Name</Label>
            <TextInput
              id="initiativeName"
              handleChange={this.generateChangeHandler('initiativeName')}
              value={this.props.formData['initiativeName']}
            />
            <HelpText>
              <p>
                Initiative names should be specific and descriptive, so that
                they provide a clear idea of your project’s focus and
                activities, such as “Community Assemblies on Income Security
                Reform.”{' '}
              </p>
              <p>
                <strong>Naming convention</strong>
              </p>
              <p>
                You may want to adopt a consistent system, called a naming
                convention, to name all your projects in CIMS. This will allow
                you to search them more easily. Having a naming convention will
                increase consistency and clarity, especially when multiple staff
                work on the same project. A clinic could establish naming
                conventions that all staff use, to make it even easier to search
                and group projects in CIMS. For example, you may want to decide
                whether or not to use abbreviations (such as PLE), and / or a
                consistent order for names (such as clinic name – type of
                activity – community and / or topic).
              </p>
            </HelpText>
          </InputSection>
          <CimsInstructions>
            <p>To start and name a new initiative in CIMS:</p>
            <ol>
              <li>Go to your Dashboard</li>
              <li>
                Under “Initiatives” click the + sign to add a new Initiative
              </li>
              <li>From the top menu, choose Initiative Information</li>
              <li>Enter the name in Initiative Name</li>
              <li>
                Note that mandatory fields in CIMS Initiatives are marked with a
                red asterisk
              </li>
            </ol>
          </CimsInstructions>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor="initiativeType">2a. Initiative Type</Label>
            <SingleSelect
              id="initiativeType"
              handleChange={this.generateChangeHandler('initiativeType')}
              value={this.props.formData['initiativeType']}
              options={initiativeTypes}
            />
            <HelpText>
              <p>
                Initiative type is a mandatory field in CIMS, but the checklist
                of types is very long. If you are not sure which category best
                suits your project, or if it falls into many categories, we
                recommend selecting Community Development.
              </p>
            </HelpText>
          </InputSection>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor="initiativeSubType">
              2b. Initiative Sub-type (optional)
            </Label>
            <SingleSelect
              id="initiativeSubType"
              handleChange={this.generateChangeHandler('initiativeSubType')}
              value={this.props.formData['initiativeSubType']}
              options={initiativeSubTypes}
            />
            <HelpText>
              <p>
                Each initiative type has a list of possible sub-types. These are
                not mandatory – you can choose whether you want to categorize
                your project in this way. By selecting types and sub-types in
                CIMS, you make it possible to search CIMS for initiatives of the
                same type.
              </p>
            </HelpText>
          </InputSection>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor="parentOrChild">
              3. Parent / child initiatives (Optional)
            </Label>
            <HelpText>
              <p>
                In CIMS, a “parent” initiative is a long-term project or
                campaign with an overarching goal, while a “child” initiative is
                a specific action, event, or activity that contributes to the
                campaign.
              </p>
              <p>
                CD-CO campaigns are often long-term campaigns aiming to create
                specific social or political change, made up of a series of
                actions or events. CIMS lets you link specific activities to the
                ongoing campaigns they are part of – so that you can show all
                the work that goes into a larger campaign, and the results of
                that work, even when the campaign is ongoing.
              </p>
              <p>
                For example, the parent initiative (overall goal/campaign) may
                be to form a community-wide tenants’ association, and the child
                initiatives (actions aiming to achieve that goal) might include
                conducting outreach to tenants in specific buildings, hosting a
                community-wide summit, meeting with engaged tenants to create
                terms of reference and an action plan, and supporting the
                ongoing work of the association. Each of these activities could
                be considered its own initiative with its own activities,
                timelines, objectives, and outcomes.
              </p>
            </HelpText>
            <Label htmlFor="parentOrChild" small>
              Is this initiative a parent or a child?
            </Label>
            <RadioButtons
              id="parentOrChild"
              label="Parent or Child"
              handleChange={this.generateChangeHandler('parentOrChild')}
              value={this.props.formData['parentOrChild']}
              options={['Parent', 'Child']}
            />
          </InputSection>
          <CimsInstructions>
            <p>
              <strong>Opening "Child" initiatives</strong>
            </p>
            <p>
              To set up a new activity within a campaign (or “child” initiative)
              in CIMS:
            </p>
            <ol>
              <li>
                Open a "parent" initiative you have already created, or create a
                new one (see above)
              </li>
              <li>
                Within that Initiative, under 'Linked Initiatives', create an
                initiative under 'initiative relationships'. This will be your
                child initiative. You can create as many child initiatives as
                you want under one parent initiative.
              </li>
              <li>
                As each "child" initiative is completed, complete the Reflection
                steps below, and close it in CIMS – keeping the Parent
                initiative open.
              </li>
            </ol>
          </CimsInstructions>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor="peopleResources">
              4. People and Resources (Optional)
            </Label>
            <HelpText>
              <p>
                CIMS provides two fields for identifying the people involved in
                a project: “Assigned to” will automatically show the name of the
                worker who created the file, and “Initiative Resources” is a
                quick and simple way of showing who is involved internally and
                externally in your Initiative, and can serve as a contact list
                of all your partners for this project.
              </p>
              <p>
                Your fellow clinic staff are added as 'resources', and all other
                contacts are added as 'partners'.
              </p>
            </HelpText>
            <EditableTable
              id="peopleResources"
              handleChange={this.generateChangeHandler('peopleResources')}
              tableStructure={peopleResourcesTableStructure}
              tableData={this.props.formData['peopleResources']}
            />
          </InputSection>
          <CimsInstructions>
            <p>Assigned to</p>
            <ul>
              <li>
                This field will self-populate based on whose CIMS profile the
                initiative is created in. If someone else (such as an
                administrative staff person) is entering this project into CIMS,
                it should be done within the CIMS profile of the project's lead.{' '}
              </li>
            </ul>
            <p>Initiative Resources</p>
            <ol>
              <li>
                From the menu across the top of the Initiative screen, choose
                Initiative Resources.
              </li>
              <li>
                You can add any kind of contact (organization, client, staff
                member). Your fellow clinic staff are added as 'resources', and
                all other contacts are added as 'partners'.
              </li>
            </ol>
          </CimsInstructions>
        </Question>
      </div>
    )
  }
}

export default Step1
