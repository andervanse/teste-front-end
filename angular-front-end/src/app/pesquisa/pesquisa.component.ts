import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  @Output() pesquisarClick = new EventEmitter<String>();

  textoPesquisa = new FormControl('', [Validators.required, Validators.maxLength(60), Validators.minLength(3)]);

  constructor() { }

  ngOnInit() {
  }

  onPesquisar(textoPesquisa: FormControl) {

    if (textoPesquisa.valid)
       this.pesquisarClick.emit(textoPesquisa.value);
  }

  obterMensagensErro() {
    return this.textoPesquisa.hasError('maxlength') ? 'Limite máximo de caracteres atingido' :
           this.textoPesquisa.hasError('minlength') ? 'Digite ao menos 3 caracteres' :
            '';
  }

}
