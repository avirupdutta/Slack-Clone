import React from "react";
import { connect } from "react-redux";
import { Form, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./index.scss";
import { InlineHint, InlineError } from "@/components/common";
import { validateForm } from "@/utils";
import { globalStateAction, channelAction } from "@/actions";
import {
  globalStateSelector,
  channelSelector,
  teamSelector
} from "@/reducers/selectors";

class TopicModal extends React.PureComponent {
  state = {
    clientError: {},
    text: ""
  };

  componentWillUnmount() {
    this.setState({
      clientError: {},
      text: ""
    });
  }

  toggleEditModal = () => {
    const { toggleEditModal } = this.props;
    toggleEditModal();
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({
      text: ""
    });
    this.toggleEditModal();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSave = () => {
    const { text } = this.state;
    const { fetchEditChannel, currentChannel, currentTeam } = this.props;
    const clientError = validateForm.editTopic(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      fetchEditChannel({
        brief_description: text,
        teamId: currentTeam.id,
        channelId: currentChannel.id
      });
      this.setState({
        text: ""
      });
      this.toggleEditModal();
    }
  };

  render() {
    const { text, clientError } = this.state;
    const { topic, isEditModalOpen } = this.props;
    return (
      <React.Fragment>
        {isEditModalOpen && (
          <Modal
            size="small"
            open={isEditModalOpen}
            onClose={this.toggleEditModal}
          >
            <Modal.Content>
              <Form>
                <Form.Field>
                  {topic ? (
                    <Form.TextArea
                      value={text}
                      onChange={this.handleChange}
                      name="text"
                      placeholder={`${topic}`}
                    />
                  ) : (
                    <Form.TextArea
                      value={text}
                      onChange={this.handleChange}
                      name="text"
                      placeholder="Add a topic"
                    />
                  )}
                  {clientError.text ? (
                    <InlineError text={clientError.text} />
                  ) : (
                    <InlineHint text={"max characters: 128"} />
                  )}
                </Form.Field>

                <Form.Group widths="equal">
                  <Button type="button" primary onClick={this.handleSave} fluid>
                    Set Topic
                  </Button>
                  <Button type="button" fluid onClick={this.handleClose}>
                    Cancel
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Content>
          </Modal>
        )}
        {!isEditModalOpen &&
          topic && (
            <React.Fragment>
              <span className="">
                {topic}{" "}
                <span
                  onClick={this.toggleEditModal}
                  className="topic-edit-button"
                >
                  <i className="fas fa-pencil-alt" />
                  edit
                </span>
              </span>
            </React.Fragment>
          )}
        {!isEditModalOpen &&
          !topic && (
            <span className="topic-edit-button" onClick={this.toggleEditModal}>
              <i className="fas fa-pencil-alt" />
              add a topic
            </span>
          )}
      </React.Fragment>
    );
  }
}

TopicModal.propTypes = {
  topic: PropTypes.string,

  isEditModalOpen: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  fetchEditChannel: PropTypes.func.isRequired,
  toggleEditModal: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isEditModalOpen: globalStateSelector.getIsEditModalOpen(state),
  currentTeam: teamSelector.getCurrentTeam(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});

const dispatchToProps = dispatch => ({
  toggleEditModal: () => {
    dispatch(globalStateAction.toggleEditModal());
  },
  fetchEditChannel: editChannelData => {
    dispatch(channelAction.fetchEditChannel(editChannelData));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(TopicModal);