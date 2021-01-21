function reducer(state = {token: '', nomer: '', alamat: ''}, action) {
  switch (action.type) {
    case 'CHANGE USER':
      return {...state, ...action.payload};
  }
  return state;
}

export default reducer;
