import { Component } from '@angular/core';
import { VideosService } from './videos/videos.service';
import { Pesquisa } from './videos/videos.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-front-end';
  mensagemErro: string;
  pesquisaRealizada: boolean = false;

  constructor(private videosService: VideosService){ }

  onPesquisarVideo(texto: string) {    
    let pesquisa = new Pesquisa();
    pesquisa.texto = texto;    
    this.buscarVideos(pesquisa);
  }

  /*
    callback do evento scrollDown do componente app-videos
    que emite um objeto 'Pesquisa' com as páginas anterior 
    e próxima atualizadas.
  */
 onScrollDown(pesquisa: Pesquisa) {
   this.buscarVideos(pesquisa);
 }

  private buscarVideos(pesquisa: Pesquisa) {
    this.mensagemErro = '';

    this.videosService.obterVideos(pesquisa)
        .subscribe((resp) => {
          this.pesquisaRealizada = true;
        },
        (errorResp) => {
          this.mensagemErro = 'Oops, ocorreu um erro durante o carregamento';
          setInterval(() => {
            this.mensagemErro = '';
          }, 2000);
          this.pesquisaRealizada = false;
        });
  }
}
