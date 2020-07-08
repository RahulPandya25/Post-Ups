import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  post = {
    tags: [
      "canada",
      "windsor",
      "windsor",
      "windsor",
      "windsor",
      "windsor",
      "windsor",
      "windsor",
      "windsor",
    ],
    comments: ["Amazing", "Woahh"],
    _id: "5f022c871c426d40488b7697",
    title: "Test 1",
    category: "Image",
    likes: 59,
    views: 100,
    dislikes: 5,
    isCommentEnabled: true,
    datePosted: "2020-07-05T19:39:51.189Z",
    __v: 0,
  };
  comment = "";
  sendComment(comment) {
    console.log(comment);
  }
  constructor() {}

  ngOnInit(): void {}
}
