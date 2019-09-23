import { Component, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ListaVideos, Pesquisa, Video } from './videos.model';
import { VideosService } from './videos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit, OnDestroy {

  videos: ListaVideos = new ListaVideos();
  mapVideosId: Map<string, string> = new Map();
  inicializado: boolean = false;

  @Output() scrollDown = new EventEmitter<Pesquisa>();
  @Output() videoSelecionado = new EventEmitter<Video>();

  subscription: Subscription;

  constructor(private videosService: VideosService) { }

  ngOnInit() {
    this.inicializado = true;

    this.subscription = this.videosService.pesquisaRealizada
      .subscribe((listaVideos: ListaVideos) => {
          this.inicializado  = false;
          let ultimaPesquisa = this.videos.pesquisa;
          let pesquisaAtual  = listaVideos.pesquisa;
                    
          if (this.pesquisaDiferente(ultimaPesquisa, pesquisaAtual)) {
            this.limparPesquisaAtual();
          }

          for (let i = 0; i < listaVideos.items.length; i++) {

            // Utilização de Map para evitar vídeos duplicados
            if (!this.mapVideosId.get(listaVideos.items[i].id)) {
              this.videos.items.push(listaVideos.items[i]);
              this.mapVideosId.set(listaVideos.items[i].id, listaVideos.items[i].id);
            }
          }

          this.videos.pesquisa = listaVideos.pesquisa;
      });
  }

  /*
    Evento scroll down emite a pesquisa com as propriedades
    paginaAnterior e proximaPagina atualizados.
  */
  onScroll() {
    this.scrollDown.emit(this.videos.pesquisa);
  }

  
  onScrollTop(evt) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  onAssistirVideoClick(video: Video) {
    this.videoSelecionado.emit(video);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private pesquisaDiferente(ultimaPesquisa: Pesquisa, pesquisaAtual: Pesquisa) {
    return ultimaPesquisa.texto !== pesquisaAtual.texto;
  }

  private limparPesquisaAtual() {
    this.mapVideosId.clear();
    this.videos = new ListaVideos();
  }    

}

