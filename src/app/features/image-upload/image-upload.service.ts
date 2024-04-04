import { Injectable } from '@angular/core';
import {forkJoin, map, mergeMap, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor() { }

  // saveFiles(files: File[]): Observable<{ filename: string; status: number }[][]> {
  //   const fileUploadBodies$: Observable<FileUploadBody>[] = _.map(
  //     files,
  //     (file: File) => this.getPostBodyForFileUpload(file)
  //   );
  //
  //   return forkJoin(fileUploadBodies$).pipe(
  //     mergeMap((fileUploadBodies: FileUploadBody[]) => this.uploadFiles(fileUploadBodies))
  //   );
  // }
  //
  // getPostBodyForFileUpload(file: File): Observable<FileUploadBody> {
  //   const encodeHash = false;
  //
  //   const filename = file.name;
  //   const data$ = this.utilsService.getBase64EncodedFileData(file);
  //   const md5$ = this.utilsService.getMd5HashForFile(file, encodeHash);
  //
  //   return forkJoin([data$, md5$]).pipe(
  //     map(([data, md5Hash]) => ({ filename, data, md5Hash }))
  //   );
  // }
  //
  // private uploadFiles(postBodies: FileUploadBody[]): Observable<any> {
  //   const uploadGroups: FileUploadBody[][] = this.getGroupedFileUploadBodies(postBodies);
  //
  //   const requests = _.map(
  //     uploadGroups,
  //     (uploadGroup: FileUploadBody[]) => this.httpService.post(ADD_FILES_URL, JSON.stringify(uploadGroup))
  //   );
  //
  //   return forkJoin(requests);
  // }

}
