import { Component, OnInit } from "@angular/core";
import { ConstantsService } from "../services/constants.service";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"],
})
export class NewPostComponent implements OnInit {
  flag = -1;
  file = false;
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
    {
      id: 4,
      name: "Audio",
    },
    {
      id: 5,
      name: "Document",
    },
  ];
  constructor() {}

  changeCategory(e) {
    this.flag = e.target.value;
  }

  ngOnInit(): void {}
}
