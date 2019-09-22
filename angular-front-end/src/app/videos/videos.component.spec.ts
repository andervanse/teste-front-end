import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { VideosComponent } from './videos.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VideosService } from './videos.service';
import { Pesquisa } from './videos.model';
import { environment } from 'src/environments/environment.prod';

describe('VideosComponent', () => {
  let component: VideosComponent;
  let fixture: ComponentFixture<VideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [VideosService],
      imports: [MatCardModule, InfiniteScrollModule, HttpClientTestingModule],
      declarations: [VideosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      httpMock.verify();
    }));

  it('expects service to fetch data',
    inject([HttpTestingController, VideosService],
      (httpMock: HttpTestingController, service: VideosService) => {

        let pesquisa = new Pesquisa();
        pesquisa.texto = 'Teste';
        pesquisa.proximaPagina = 'ABCD54321';

        // We call the service
        service.obterVideos(pesquisa).subscribe(data => {
          expect(data.items.length).toBe(2);
          expect(data.pesquisa.texto).toBe(pesquisa.texto);
          expect(data.pesquisa.proximaPagina).toBe(pesquisa.proximaPagina);
          expect(data.items[0].id).toBe('1111');
          expect(data.items[0].canal).toBe('abc1234');
          expect(data.items[0].titulo).toBe('titulo 1');
          expect(data.items[0].dataPublicacao).toBe(new Date('2019-01-01T23:00:42.000Z'));
          expect(data.items[0].imagens.length).toBe(3);
        });

        // We set the expectations for the HttpClient mock
        let pagina = `&pageToken=${pesquisa.proximaPagina}`;
        const QUERY_PARAMS = `part=id,snippet&key=${environment.apiKey}&type=video&q=${pesquisa.texto}${pagina}`;
        const req = httpMock.expectOne(`${environment.apiBaseUrl}/search?${QUERY_PARAMS}`);
        expect(req.request.method).toEqual('GET');

        // Then we set the fake data to be returned by the mock
        req.flush({
          data: {
            prevPageToken: 'AAA',
            nextPageToken: 'BBB',
            items: [{
              id: {
                videoId: 1111
              },
              snippet: {
                channelId: "abc1234",
                publishedAt: "2019-01-01T23:00:42.000Z",
                description: "description 1",
                title: "titulo 1",
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
            },
            {
              id: {
                videoId: 2222
              },
              snippet: {
                channelId: "abc2222",
                publishedAt: "2019-02-01T23:00:42.000Z",
                description: "description 2",
                title: "titulo 2",
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
          }
        });
      })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a list', () => {
    fixture = TestBed.createComponent(VideosComponent);
    fixture.detectChanges();
    expect(component.videos).not.toBeNull();
  });
});
