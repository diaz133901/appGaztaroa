import * as ActionTypes from "./ActionTypes";

export const comentarios = (
  state = { errMess: null, comentarios: {} },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      const nuevoComentario = action.payload;
      const newComentarios = {
        ...state.comentarios,
        [nuevoComentario.id]: {
          ...nuevoComentario,
        },
      };
      return { ...state, comentarios: newComentarios };
    default:
      return state;
  }
};
