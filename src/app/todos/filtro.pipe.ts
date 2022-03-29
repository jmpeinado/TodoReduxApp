import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { filtrosValidos } from '../filtro/filtro.actions';

@Pipe({
  name: 'filtroTodos'
})
export class FiltroPipe implements PipeTransform {

  transform(todos: Todo[], filtro: string): Todo[] {

    switch( filtro ) {
      case 'pendientes':
        return todos.filter( tarea => !tarea.completado );
      case 'completados':
        return todos.filter( tarea => tarea.completado );
      default:
        return todos;
    }
  }

}
