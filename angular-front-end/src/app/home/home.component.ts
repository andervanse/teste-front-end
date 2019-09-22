import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VideoPlayerComponent } from '../videos/video-player/video-player.component';
import { VideosService } from '../videos/videos.service';
import { Pesquisa, Video } from '../videos/videos.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        height: '30vh'
      })),
      state('final', style({
        height: '3vh'
      })),
      transition('initial=>final', animate('400ms')),
      transition('final=>initial', animate('400ms'))
    ]),
  ]
})
export class HomeComponent implements OnInit {

  currentState = 'initial';
  mensagemErro: string;
  pesquisaRealizada: boolean = false;
  dialogRef: MatDialogRef<VideoPlayerComponent>;

  constructor(
    private videosService: VideosService,
    private videoPlayer: MatDialog) { }

  ngOnInit() {
  }
  
  onPesquisarVideo(texto: string) {
    let pesquisa = new Pesquisa();
    pesquisa.texto = texto;
    this.buscarVideos(pesquisa);
  }

  onOpenVideoModal(video: Video) {

    this.videosService.obterEstatisticasVideo(video.id).subscribe((estatisticasResp) => {
      video.estatisticas = estatisticasResp;

      if (!this.dialogRef) {
        this.openDialog(video);
      } else {
        this.dialogRef.close();
        this.openDialog(video);
      }
    },
      (errorResp) => {
        console.error(errorResp);
      })
  }

  private openDialog(video: Video) {
    let config: MatDialogConfig<Video> = new MatDialogConfig();
    config.disableClose = true;
    config.hasBackdrop = false;
    config.width = '90vh';
    config.height = '85vh';
    config.maxHeight = '95vh';
    config.maxWidth = '95vh';
    config.data = video;

    this.dialogRef = this.videoPlayer.open(VideoPlayerComponent, config);
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
        this.changeState();
      }, (errorResp) => {
          this.mensagemErro = 'Oops, ocorreu um erro durante o carregamento';
          setInterval(() => {
            this.mensagemErro = '';
          }, 2000);
          this.pesquisaRealizada = false;
        });
  }

  private changeState() {
    this.currentState = 'final';
  }  

}
