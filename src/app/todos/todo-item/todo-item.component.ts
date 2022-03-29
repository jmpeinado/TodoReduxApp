import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() tarea!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;
  chkCompletado!: FormControl;
  txtInput!: FormControl;
  editando: boolean = false;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    
    this.chkCompletado = new FormControl( this.tarea.completado );
    this.txtInput = new FormControl( this.tarea.texto, Validators.required );

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch( actions.toggle({ id: this.tarea.id }) );
    });
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue( this.tarea.texto );
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
    
    if( this.txtInput.invalid ) { return; }
    if( this.txtInput.value === this.tarea.texto ) { return; }

    this.store.dispatch( actions.editar({
      id: this.tarea.id,
      texto: this.txtInput.value
    }));
  }

  borrar() {
    this.store.dispatch( actions.borrar({ id: this.tarea.id }) );
  }

}
