import { Component } from '@angular/core';
import {FileUploadModule} from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import {HttpEvent} from "@angular/common/http";
import {CommonModule} from "@angular/common";

interface FileUploadEvent {
  originalEvent: HttpEvent<any>;
  files: File[];
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    FileUploadModule,
    CommonModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  providers: [MessageService]
})
export class FileUploadComponent {

  uploadedFiles: any[] = [];


  constructor(private messageService: MessageService) {}

  onUpload(event:FileUploadEvent) {
    for(let file of event.files) {
      console.log("file");
      this.uploadedFiles.push(file);
    }



    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

}
