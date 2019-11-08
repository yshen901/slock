import { combineReducers } from 'redux';
import UserReducer from './user_reducer';
import WorkspaceReducer from './workspace_reducer';
import ChannelReducer from './channel_reducer'

const EntitiesReducer = combineReducers({
  users: UserReducer,
  workspaces: WorkspaceReducer,
  channels: ChannelReducer
})

export default EntitiesReducer;