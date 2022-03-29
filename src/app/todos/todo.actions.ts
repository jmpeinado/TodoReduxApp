import { createAction, props } from '@ngrx/store';

export const completar = createAction('[Todo] Completar');
export const crear = createAction(
    '[Todo] Crear tarea',
    props<{ texto: string }>() 
);
export const toggle = createAction(
    '[Todo] Toggle tarea',
    props<{ id: number }>() 
);
export const editar = createAction(
    '[Todo] Editar tarea',
    props<{ id: number, texto: string }>() 
);
export const borrar = createAction(
    '[Todo] Borrar tarea',
    props<{ id: number }>() 
);
export const toggleAll = createAction(
    '[Todo] Toggle todas las tareas',
    props<{ completados: boolean }>() 
);
export const limpiarCompletados = createAction('[Todo] Limpiar completados');