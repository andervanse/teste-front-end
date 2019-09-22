import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoComponent } from './navegacao/navegacao.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { VideosComponent } from './videos/videos.component';
import { VideosService } from './videos/videos.service';
import { VideoPlayerComponent } from './videos/video-player/video-player.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    NavegacaoComponent,
    PesquisaComponent,
    VideosComponent,
    VideoPlayerComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatDialogModule
  ],
  entryComponents: [VideoPlayerComponent],
  providers: [VideosService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: [] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
