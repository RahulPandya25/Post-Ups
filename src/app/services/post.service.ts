import { HttpClient } from "@angular/common/http";
import { ConstantsService } from "./constants.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PostService {
  getFeed() {
    return this.http.get(ConstantsService.BASE_URL + "/getFeed");
  }
  getPostById(postId) {
    return this.http.get(ConstantsService.BASE_URL + "/getPost/" + postId);
  }
  postComment(postId, comment) {
    return this.http.post(ConstantsService.BASE_URL + "/submitComment", {
      postId: postId,
      comment: comment,
    });
  }

  constructor(private http: HttpClient) {}
}
