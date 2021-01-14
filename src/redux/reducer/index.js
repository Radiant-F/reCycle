function reducer(state = {token: ''}, action) {
  switch (action.type) {
    case 'CHANGE USER':
      return {...state, ...action.payload};
  }
  return state;
}

export default reducer;
