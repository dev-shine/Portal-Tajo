import { fromJS, List } from 'immutable';
import { reportVehiclesActions } from '../actions';

const initialState = fromJS({
  selectedVehicles: new List(),
  isFiltering: false,
});

function selectedVehiclesReducer(state = initialState, action) {
  switch (action.type) {
    case reportVehiclesActions.REPORT_VEHICLES_ADD: {
      const sv = state.get('selectedVehicles');
      const nextSv = sv.push(action.id);

      return state.set('selectedVehicles', nextSv);
    }
    case reportVehiclesActions.REPORT_VEHICLES_REMOVE: {
      const index = findIndexById(state, action.id);

      if (index !== -1) {
        const sv = state.get('selectedVehicles');
        const nextSv = sv.splice(index, 1);

        return state.set('selectedVehicles', nextSv);
      }

      return state;
    }
    case reportVehiclesActions.REPORT_VEHICLES_FILTERING:
      return state.set('isFiltering', action.isFiltering);

    default:
      return state;
  }
}

export default selectedVehiclesReducer;

export const findIndexById = (state, id) =>
  state.get('selectedVehicles').findIndex(item => item === id);
// export const getFilteredVehicles = (state) =>
//   state.get('filteredVehicles');
export const getSelectedVehicles = (state) =>
  state.get('selectedVehicles');
export const isFiltering = (state) =>
  state.get('isFiltering');

// export const getVehiclesForReport = (state) => {
//   let result;

//   // if no filtering than just return
//   // all selected vehicles
//   if (!state.get('isFiltering')) {
//     return state.get('selectedVehicles');
//   }

//   // find selected vehicles
//   // among filtered
//   const selected = state.get('selectedVehicles').filter(sv => {
//     const k = state.get('filteredVehicles').findKey(fv =>
//       sv === fv.id
//     );

//     return k !== undefined;
//   });

//   if (selected.size === 0) {
//     // if nothing selected in filtered list,
//     // than generate report for all filtered
//     result = state.get('filteredVehicles').map(v => v.id);
//   } else {
//     result = selected;
//   }

//   return result;
// };
