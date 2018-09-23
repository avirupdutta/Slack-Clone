import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./index.scss";
import { channelSelector } from "@/reducers/selectors";

class MainHeader extends React.Component {
  componentDidMount() {}

  render() {
    const {
      currentChannelMembers,
      currentChannel,
      messageGroupName
    } = this.props;
    return (
      <div className="main-header">
        <h1 className="main-header__title">
          {currentChannel.message_group && <span>{messageGroupName}</span>}
          <span>
            {!currentChannel.message_group && (
              <span># {currentChannel.name}</span>
            )}

            {currentChannel.public &&
              !currentChannel.message_group && <span> (public) </span>}
            {!currentChannel.public &&
              !currentChannel.message_group && <span> (private)</span>}
          </span>
          <span className="main-header__title__span">
            <i className="users icon main-header__title__span__icon" />{" "}
            <span className="main-header__title__span__number">
              {currentChannelMembers.length}
            </span>
          </span>
        </h1>
      </div>
    );
  }
}

MainHeader.propTypes = {};

const stateToProps = state => ({
  currentChannelMembers: channelSelector.getCurrentChannelMembers(state),
  currentChannel: channelSelector.getCurrentChannel(state),
  messageGroupName: channelSelector.getMessageGroupName(state)
});

const dispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(MainHeader)
);
