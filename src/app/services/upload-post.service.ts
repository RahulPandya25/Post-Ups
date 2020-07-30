import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: "root",
})
export class UploadPostService {
  constructor(private http: HttpClient) {}

  submitPost(formData: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
      }),
    };
    return this.http.post(
      ConstantsService.BASE_URL + "/submitPost",
      formData,
      httpOptions
    );
  }

  uploadFile(formData: any, postId: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
      }),
    };
    return this.http.post(
      ConstantsService.FILE_URL + "/uploadFile/" + postId,
      formData,
      httpOptions
    );
  }
}
