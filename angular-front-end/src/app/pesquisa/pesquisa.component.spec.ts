import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaComponent } from './pesquisa.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('PesquisaComponent', () => {
  let component: PesquisaComponent;
  let fixture: ComponentFixture<PesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatInputModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
      declarations: [ PesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search text', () => {
    const SEARCH_TEXT = 'ABCD';
    spyOn(component.pesquisarClick, 'emit');
    component.textoPesquisa.setValue(SEARCH_TEXT);
    component.onPesquisar(component.textoPesquisa);
    fixture.detectChanges();
    expect(component.pesquisarClick.emit).toHaveBeenCalledWith(SEARCH_TEXT);
  });  

  it('should get minlength error', () => {
    const SEARCH_TEXT = 'AB';
    component.textoPesquisa.setValue(SEARCH_TEXT);
    component.onPesquisar(component.textoPesquisa);
    fixture.detectChanges();
    expect(component.textoPesquisa.errors['minlength']).not.toBeNull();
  }); 

  it('should get maxlength error', () => {
    let searchText = 'ABCDE';

    for (let i = 0; i < 20; i++) {
      searchText += searchText;
    }

    component.textoPesquisa.setValue(searchText);
    component.onPesquisar(component.textoPesquisa);
    fixture.detectChanges();
    expect(component.textoPesquisa.errors['maxlength']).not.toBeNull();
  });  

});
