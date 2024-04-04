import {Component, EventEmitter, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import {HttpEvent} from "@angular/common/http";
import {FileUploadModule} from "primeng/fileupload";
import {CommonModule} from "@angular/common";
import {Observable, Subscription} from 'rxjs';
import {encode} from 'base64-arraybuffer';

interface FileUploadEvent {
  originalEvent: HttpEvent<any>;
  files: File[];
}


@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    FileUploadModule,
    CommonModule
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
  providers: [MessageService]
})
export class ImageUploadComponent {
  uploadedFiles: any[] = [];

  @Output() imageChanged: EventEmitter<string> = new EventEmitter<string>();
  myresult: string = ''



  constructor(private messageService: MessageService) {
  }

  onUpload(event: FileUploadEvent) {

    for (let file of event.files) {
      this.getBase64EncodedFileData(file).subscribe(data => {
        console.log(data);
        this.myresult = data
      });
      // this.uploadedFiles.push(file);
      if (this.myresult !== '') {
        this.imageChanged.emit(this.myresult);
      }
    }

  }

  // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});

  myUploader(event: { files: any; }) {
    // console.log("onUpload() START");
    for(let file of event.files) {
      this.getBase64EncodedFileData(file).subscribe(data => {
        // console.log(data);
        this.myresult = data
        if (this.myresult !== '') {
          this.imageChanged.emit(this.myresult);
        }
      });
      // this.uploadedFiles.push(file);

    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }



  onImageChange() {


    if (this.myresult !== '') {
      this.imageChanged.emit(this.myresult);
    }
  }

  getBase64EncodedFileData(file: File): Observable<string> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onload = () => {
        const {result} = reader;
        const data = result as ArrayBuffer; // <--- FileReader gives us the ArrayBuffer
        const base64Encoded = encode(data); // <--- convert ArrayBuffer to base64 string

        observer.next(base64Encoded);
        observer.complete();
      };

      reader.onerror = () => {
        observer.error(reader.error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

}
