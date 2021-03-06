import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Channel from './channel';

const mapStateToProps = (state, ownProps) => ({
  workspace_address: ownProps.match.params.workspace_address,
  channel_id: parseInt(ownProps.match.params.channel_id),
  channel: state.entities.channels[ownProps.match.params.channel_id],
})

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Channel))