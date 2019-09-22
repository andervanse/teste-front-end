import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, DialogPosition, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { Video } from '../videos.model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  safeSrc: SafeResourceUrl;
  originalWidth: string;
  originalHeight: string;
  hideMinimizeBtn: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<VideoPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Video,
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS) public config: MatDialogConfig<Video>) {

      const URL = `https://www.youtube.com/embed/${data.id}`;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL);  

      this.dialogRef.afterOpen().subscribe(() => {
        this.hideMinimizeBtn = false;
      })
    }


  ngOnInit() {
    this.originalHeight = this.config.height;
    this.originalWidth = this.config.width;
  }
  
  onMinimize(): void {
    let minimizedPosition: DialogPosition = {
      right: '10px',
      bottom: '10px'      
    }

    this.hideMinimizeBtn = true;
    this.dialogRef.updatePosition(minimizedPosition);
    this.dialogRef.updateSize('50vh', '45vh');
  }

  onMaximize() {
    this.hideMinimizeBtn = false;
    let maximazedPosition: DialogPosition = {
      bottom: '5%'
    }

    this.dialogRef.updatePosition(maximazedPosition);
    this.dialogRef.updateSize('90vh', '85vh');    
  }

}
