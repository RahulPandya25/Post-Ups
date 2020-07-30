import { HttpClient } from "@angular/common/http";
import { ConstantsService } from "./constants.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PostService {
  getFeed(feed) {
    return this.http.post(ConstantsService.BASE_URL + "/getFeed", feed);
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

  getFile(postId) {
    return this.http.get(
      "http://localhost:4300/file/getFileByPostId/" + postId
    );
  }

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  getFilesrc(post) {
    var base64Flag = `data:${post.file.files_id.contentType};base64,`;
    var imageStr = this.arrayBufferToBase64(post.file.data.data);
    return "" + base64Flag + imageStr;
  }

  constructor(private http: HttpClient) {}
}
