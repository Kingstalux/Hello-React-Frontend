const FETCH_GREETINGS_BEGIN = 'hello-react-frontend/greetings/FETCH_GREETINGS_BEGIN';
const FETCH_GREETINGS_SUCCESS = 'hello-react-frontend/greetings/FETCH_GREETINGS_SUCCESS';
const FETCH_GREETINGS_FAILURE = 'hello-react-frontend/greetings/FETCH_GREETINGS_FAILURE';

const initialState = {
  greetings: {
    name: 'HELLO WELT',
    id: 0,
  },
  loading: false,
  error: null,
};

const fetchGreetingsBegin = () => ({
  type: FETCH_GREETINGS_BEGIN,
});

const fetchGreetingsSuccess = (payload) => ({
  type: FETCH_GREETINGS_SUCCESS,
  payload,
});

const fetchGreetingsFailure = (error) => ({
  type: FETCH_GREETINGS_FAILURE,
  payload: { error },
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(alert('Congrats you broke the app'));
  }
  return response;
}

const url = 'http://127.0.0.1:3000/v1/greetings';

export function fetchGreetings() {
  return (dispatch) => {
    dispatch(fetchGreetingsBegin());
    return fetch(url)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchGreetingsSuccess(json));
      })
      .catch((error) => dispatch(fetchGreetingsFailure(error)));
  };
}

const greetingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GREETINGS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_GREETINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        greetings: action.payload,
      };

    case FETCH_GREETINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        greetings: [],
      };

    default:
      return state;
  }
};

export default greetingsReducer;
