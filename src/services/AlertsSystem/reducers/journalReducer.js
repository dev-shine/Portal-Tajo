import { fromJS } from 'immutable';
import { SESSION_CLEAN } from 'services/Session/actions';
import { journalActions } from '../actions';

const initialState = fromJS({
  entries: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case journalActions.JOURNAL_ENTRIES_ADD:
      return state.update('entries', list => list.concat(fromJS(action.entries)));

    case SESSION_CLEAN:
      return initialState;

    default:
      return state;
  }
}

export const getEntries = state =>
  state.get('entries');
