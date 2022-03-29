import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../../filtro/filtro.actions';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual!: string;
  filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pendientes: number = 0;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtro')
    //   .subscribe( filtro => this.filtroActual = filtro );
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( tarea => !tarea.completado ).length;
    });
  }

  cambiarFiltro( filtro: actions.filtrosValidos ) {
    this.store.dispatch( actions.cambioFiltro({ filtro: filtro }) )
  }

  limpiarCompletados() {
    this.store.dispatch( limpiarCompletados() );
  }

}
