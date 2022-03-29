import { createReducer, on } from '@ngrx/store';
import * as actions from './filtro.actions';
import { filtrosValidos } from './filtro.actions';

//export const initialState: filtrosValidos = "todos";
export const initialState: string = "todos";

export const filtroReducer = createReducer(
  initialState,
  //'todos',
  on( actions.cambioFiltro, (state, { filtro } ) => filtro  )
);