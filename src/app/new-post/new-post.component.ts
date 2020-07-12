import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"],
})
export class NewPostComponent implements OnInit {
  flag;
  text = false;
  video = false;
  image = false;
  private fileList;

  selectFile(event) {
    this.fileList = event.target.files;
    console.log("File Uploaded");
  }
  categories = [
    {
      id: 1,
      name: "Text",
    },
    {
      id: 2,
      name: "Image",
    },
    {
      id: 3,
      name: "Video",
    },
  ];
  constructor() {}

  changeCategory(e) {
    this.flag = e.target.value;
  }

  ngOnInit(): void {}
}
