import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConstantsService } from "./constants.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PostService {
  getFeed(feed, page) {
    return this.http.post(ConstantsService.BASE_URL + "/getFeed", {
      feed: feed,
      page: page,
    });
  }
  getPostById(postId, updateViewCount) {
    return this.http.get(
      ConstantsService.BASE_URL + "/getPost/" + postId + "/" + updateViewCount
    );
  }
  postComment(postId, comment) {
    return this.http.post(ConstantsService.BASE_URL + "/submitComment", {
      postId: postId,
      comment: comment,
    });
  }

  likeThisPost(postId) {
    return this.http.post(
      ConstantsService.BASE_URL + "/updateLikes/" + postId,
      {}
    );
  }

  filterThroughPosts(tag) {
    return this.http.post(ConstantsService.BASE_URL + "/filter", {
      tag: tag,
    });
  }

  submitPost(formData: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
      }),
    };
    return this.http.post(ConstantsService.BASE_URL + "/submitPost", formData, {
      observe: "response",
    });
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

  // arrayBufferToBase64(buffer) {
  //   var binary = "";
  //   var bytes = [].slice.call(new Uint8Array(buffer));
  //   bytes.forEach((b) => (binary += String.fromCharCode(b)));
  //   return window.btoa(binary);
  // }

  arrayBufferToBase64(buffer) {
    var binary = "";
    buffer.forEach((element) => {
      binary += "" + element.data;
    });
    return binary;
  }

  getFilesrc(post) {
    var base64Flag = `data:${post.file.contentType};base64,`;
    var imageStr = this.arrayBufferToBase64(post.data);
    return "" + base64Flag + imageStr;
  }

  constructor(private http: HttpClient) {}
}
