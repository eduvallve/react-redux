export const reduceReducers =
  (...reducers) =>
  (state, action) =>
    reducers.reduce((acc, el) => el(acc, action), state);

const initialFetching = { loading: "idle", error: null };

export const makeFetchingReducer =
  (actions) =>
  (state = initialFetching, action) => {
    switch (action.type) {
      case actions[0]: {
        return { ...state, loading: "pending" };
      }
      case actions[1]: {
        return { ...state, loading: "succeeded" };
      }
      case actions[2]: {
        return { error: action.error, loading: "rejected" };
      }
      default:
        return state;
    }
  };

export const makeSetReducer =
  (actions) =>
  (filter = "all", action) => {
    switch (action.type) {
      case actions[0]:
        return action.payload;
      default:
        return filter;
    }
  };

export const makeCrudeReducer =
  (actions) =>
  (entities = [], action) => {
    switch (action.type) {
      case actions[0]: {
        return entities.concat({ ...action.payload });
      }
      case actions[1]: {
        const newEntities = entities.map((entity) => {
          if (entity.id === action.payload.id) {
            return { ...entity, completed: !entity.completed };
          }
          return entity;
        });
        return newEntities;
      }
      default:
        return entities;
    }
  };

export const mat = (entity) => [
  `${entity}/pending`,
  `${entity}/fullfilled`,
  `${entity}/rejected`,
];

export const mac =
  (type, ...argNames) =>
  (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };

  export const asyncMac = asyncTypes => ([
    mac(asyncTypes[0]),
    mac(asyncTypes[1], 'payload'),
    mac(asyncTypes[2], 'error'),
]);