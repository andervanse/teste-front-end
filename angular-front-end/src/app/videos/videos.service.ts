import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { ListaVideos, Video, Pesquisa, Estatisticas } from './videos.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
})
export class VideosService {

    videos: ListaVideos;
    pesquisaRealizada = new Subject<ListaVideos>();

    constructor(private http: HttpClient) { }

    obterVideos(pesquisa: Pesquisa): Observable<ListaVideos> {

        let pagina = '';

        if (!isNullOrUndefined(pesquisa.paginaAnterior))
            pagina = `&pageToken=${pesquisa.paginaAnterior}`;

        if (!isNullOrUndefined(pesquisa.proximaPagina))
            pagina = `&pageToken=${pesquisa.proximaPagina}`;

        const QUERY_PARAMS = `part=id,snippet&key=${environment.apiKey}&type=video&q=${pesquisa.texto}${pagina}`;

        // return this.http.get<ListaVideos>(`${environment.apiBaseUrl}/search?${QUERY_PARAMS}`)
        //     .pipe(
        //         map((response: any) => {
        //             this.videos                         = new ListaVideos();
        //             this.videos.pesquisa.texto          = pesquisa.texto;
        //             this.videos.pesquisa.paginaAnterior = response.prevPageToken;
        //             this.videos.pesquisa.proximaPagina  = response.nextPageToken;

        //             for (let i = 0; i < response.items.length; i++) {
        //                 let video = this.converterParaModelo(response.items[i]);                        
        //                 this.videos.items.push(video);
        //             }

        //             this.pesquisaRealizada.next(this.videos);
        //             return this.videos;
        //         })
        //     );

        return this.fakeVideoData();
    }

    obterEstatisticasVideo(videoId: string): Observable<Estatisticas> {

        const QUERY_PARAMS = `id=${videoId}&part=statistics&key=${environment.apiKey}`;

        // return this.http.get<Estatisticas>(`${environment.apiBaseUrl}/videos?${QUERY_PARAMS}`)
        //     .pipe(
        //         map((response: any) => {
        //             let estatisticas = null;

        //             for (let i = 0; i < response.items.length; i++) {
        //                 if (response.items[i].statistics) {
        //                     estatisticas                       = new Estatisticas();
        //                     estatisticas.quantidadeViews       = response.items[i].statistics.viewCount;
        //                     estatisticas.quantidadeLikes       = response.items[i].statistics.likeCount;
        //                     estatisticas.quantidadeDeslikes    = response.items[i].statistics.dislikeCount;
        //                     estatisticas.quantidadeFavoritos   = response.items[i].statistics.favoriteCount;
        //                     estatisticas.quantidadeComentarios = response.items[i].statistics.commentCount;
        //                 }                       
        //             }

        //             return estatisticas;
        //         })
        //     );
        return this.fakeStatisticsData();
    }


    // Converte o objeto da resposta para o modelo 'Video'
    private converterParaModelo(response: any): Video {

        let video = new Video();
        video.id = response.id.videoId || response.id;
        video.canal = response.snippet.channelId;
        video.dataPublicacao = response.snippet.publishedAt;
        video.descricao = response.snippet.description;
        video.titulo = response.snippet.title;

        for (var property in response.snippet.thumbnails) {

            if (!video.imagens)
                video.imagens = [];

            video.imagens.push({
                tipo: response.snippet.thumbnails[property],
                urlImagem: response.snippet.thumbnails[property].url,
                altura: response.snippet.thumbnails[property].height,
                largura: response.snippet.thumbnails[property].width
            });
        }

        return video;
    }


    fakeVideoData() {
        let response = {
            prevPageToken: 'AAA',
            nextPageToken: 'BBB',
            items: [{
                id: {
                    videoId: "phrvis8K4Zw"
                },
                snippet: {
                    channelId: "UCSivRyE2mqXK8XkkAM6Ep0g",
                    publishedAt: "2019-01-01T23:00:42.000Z",
                    description: "( Recomendo Assistir ) \n\n✓ Primeiramente Se Gostou Do Video Deixa Um LIKE !! \n\n✓ Segundamente INSCREVA-SE No Canal Para Não Perder Mais Videos Como Este, e ativa o \"🔔\" sininho.",
                    title: "Teste de fidelidade: ( ͡° ͜ʖ ͡°) Mulher trai o namorado será? Convidado muito \"louco\". (parte:4-4).",
                    thumbnails: {
                        default: {
                            url: "https://i.ytimg.com/vi/phrvis8K4Zw/default.jpg",
                            width: 120,
                            height: 90
                        },
                        medium: {
                            url: "https://i.ytimg.com/vi/phrvis8K4Zw/mqdefault.jpg",
                            width: 320,
                            height: 180
                        },
                        high: {
                            url: "https://i.ytimg.com/vi/phrvis8K4Zw/hqdefault.jpg",
                            width: 480,
                            height: 360
                        }
                    }
                }
            }]
        };
        this.videos = new ListaVideos();
        this.videos.pesquisa.texto = "Teste";
        this.videos.pesquisa.paginaAnterior = response.prevPageToken;
        this.videos.pesquisa.proximaPagina = response.nextPageToken;
        let video = this.converterParaModelo(response.items[0]);
        this.videos.items.push(video);

        this.pesquisaRealizada.next(this.videos);
        return of(this.videos);
    }

    fakeStatisticsData() {
        let response = {
            items: [
                {
                    kind: "youtube#video",
                    etag: "\"p4VTdlkQv3HQeTEaXgvLePAydmU/eYXMmPsSvMkbEG9a-rwTZCJ_zVw\"",
                    id: "phrvis8K4Zw",
                    statistics: {
                        viewCount: "60661",
                        likeCount: "575",
                        dislikeCount: "109",
                        favoriteCount: "0",
                        commentCount: "30"
                    }
                }
            ]
        }

        let estatisticas = null;

        for (let i = 0; i < response.items.length; i++) {
            if (response.items[i].statistics) {
                estatisticas = new Estatisticas();
                estatisticas.quantidadeViews = response.items[0].statistics.viewCount;
                estatisticas.quantidadeLikes = response.items[0].statistics.likeCount;
                estatisticas.quantidadeDeslikes = response.items[0].statistics.dislikeCount;
                estatisticas.quantidadeFavoritos = response.items[0].statistics.favoriteCount;
                estatisticas.quantidadeComentarios = response.items[0].statistics.commentCount;
            }
        }

        return of(estatisticas);
    }
}