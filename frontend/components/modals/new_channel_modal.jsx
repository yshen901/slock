import React from 'react';
import { withRouter } from 'react-router-dom';
import { hideElements } from '../../util/modal_api_util';

class NewChannelModal extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      disabled: true,
      error: "none"
    }

    this.modalForm = this.modalForm.bind(this);
    this.updateField = this.updateField.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.button = this.button.bind(this);
    this.warning = this.warning.bind(this);
  }

  button() {
    if (this.state.disabled)
      return (<button disabled>Create</button>)
    else
      return (<button onClick={this.submitForm}>Create</button>)
  }

  warning() {
    let text;
    let {error} = this.state;

    if (error === "none") text = ""
    if (error === "empty") text = "Don't forget to name your channel."
    if (error === "taken") text = "That name is already taken"
    if (error === "long") text = "Channel name can't be longer than 80 characters."
    
    return (<h2 className="orange">{text}</h2>)
  }

  // updates a field, and either enables or disables the button
  updateField(type) {
    return (e) => {
      let currentVal = e.currentTarget.value.split('');
      let lastVal = currentVal.pop();
      lastVal === ' ' ? currentVal.push('-') : currentVal.push(lastVal.toLowerCase()); 

      if (currentVal.join('').length > 80)
        this.setState({ [type]: currentVal.join(''), disabled: true, error: "long" })
      else if (currentVal.join('') === "")
        this.setState({ [type]: currentVal.join(''), disabled: true, error: "empty" })
      else if (this.props.channels.includes(currentVal.join('').toLowerCase()))
        this.setState({ [type]: currentVal.join(''), disabled: true, error: "taken" })
      else
        this.setState({ [type]: currentVal.join(''), disabled: false, error: "none" })
    }
  }

  // submits the information, and creates something
  submitForm(e) {
    e.preventDefault();

    let channel = {name: this.state.name, workspace_id: this.props.workspace_id};
    this.props.postChannel(channel)
      .then(
        ({channel}) => {
          hideElements("new-channel-modal");
          this.setState({name: "", description: "", disabled: true, error: "none"});
          this.props.history.push(`/workspace/${this.props.workspace_address}/${channel.id}`);
        }
      )
  }

  // form this modal will output
  modalForm() {
    return (
      <div id="new-channel-form" onClick={e => e.stopPropagation()}>
        <h1>Create a channel</h1>
        <h6>
          Channels are where your members communicate. They’re best when 
          organized around a topic - #proj-budget, for example.
        </h6>
        <div className="new-channel-form-header">
          <h2>Name</h2>
          {this.warning()}
        </div>
        <input 
          type="text" id="new-channel-input"
          onChange={this.updateField('name')}
          placeholder="e.g. plan budget"
          value={this.state.name}></input>

        {this.button()}
      </div>
    )
  }

  render() {
    return (
      <div className="new-channel-modal hidden">
        <div className="part-modal-background" onClick={ () => { hideElements("new-channel-modal"); this.setState({ name: "" }) } }></div>
        {this.modalForm()}
      </div>
    )
  }
}

export default NewChannelModal;