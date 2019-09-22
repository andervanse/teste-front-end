import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ListaVideos, Video, Pesquisa } from './videos.model';
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

        return this.http.get<ListaVideos>(`${environment.apiBaseUrl}/search?${QUERY_PARAMS}`)
            .pipe(
                map((response: any) => {
                    this.videos                         = new ListaVideos();
                    this.videos.pesquisa.texto          = pesquisa.texto;
                    this.videos.pesquisa.paginaAnterior = response.prevPageToken;
                    this.videos.pesquisa.proximaPagina  = response.nextPageToken;

                    for (let i = 0; i < response.items.length; i++) {
                        let video = this.converterParaModelo(response.items[i]);                        
                        this.videos.items.push(video);
                    }

                    this.pesquisaRealizada.next(this.videos);
                    return this.videos;
                })
            );
    }


    // Converte o objeto da resposta para o modelo 'Video'
    private converterParaModelo (response:any): Video {

        let video            = new Video();
        video.id             = response.id.videoId;
        video.canal          = response.snippet.channelId;
        video.dataPublicacao = response.snippet.publishedAt;
        video.descricao      = response.snippet.description;
        video.titulo         = response.snippet.title;

        for (var property in response.snippet.thumbnails) {

            if (!video.imagens)
                video.imagens = [];

            video.imagens.push({
                tipo:      response.snippet.thumbnails[property],
                urlImagem: response.snippet.thumbnails[property].url,
                altura:    response.snippet.thumbnails[property].height,
                largura:   response.snippet.thumbnails[property].width
            });
        }
        return video;
    }
}