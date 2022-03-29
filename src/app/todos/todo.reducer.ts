import { createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
    new Todo('Mi primera tarea...'),
    new Todo('Comer...'),
    new Todo('Ir aal hospital...')
];

export const todoReducer = createReducer(
  initialState,
  on(actions.crear, (state: Todo[], { texto }) => [
    ...state,
    new Todo( texto )
  ]),
  on(actions.borrar, (state: Todo[], { id }) => 
    state.filter( tarea => tarea.id !== id )
  ),
  on(actions.toggle, (state: Todo[], { id }) => {
    return state.map( tarea => {
      if( tarea.id === id ) {
        // ESTO NO PUEDE HACERSE PORQUE SE CAMBIA EL ESTADO ACTUAL, NO SE ENVIA UNO NUEVO
        // tarea.completado = !tarea.completado;
        // return tarea;
        return {
          ...tarea,
          completado: !tarea.completado
        }
      } else {
        return tarea;
      }
    });
  }),
  on(actions.editar, (state: Todo[], { id, texto }) => {
    return state.map( tarea => {
      if( tarea.id === id ) {
        return {
          ...tarea,
          texto: texto
        }
      } else {
        return tarea;
      }
    });
  }),
  on(actions.toggleAll, (state: Todo[], { completados }) => 
    state.map( tarea => {
      return {
        ...tarea,
        completado: completados
      }
    })
  ),
  on(actions.limpiarCompletados, (state: Todo[]) => 
    state.filter( tarea => !tarea.completado )
  )
);