import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
}
