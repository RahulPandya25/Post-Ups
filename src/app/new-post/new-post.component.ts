import { Component, OnInit } from "@angular/core";
import defaults from "../../assets/defaults.json";
import * as _ from "lodash";
@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"],
})
export class NewPostComponent implements OnInit {
  catWithTextArea;
  selectedCategory;
  categories;
  file = false;
  private fileList;

  constructor() {}
  selectFile(event) {
    this.fileList = event.target.files;
    console.log("File Uploaded");
  }
  changeCategory(e) {
    this.selectedCategory = e.target.value;
  }

  setupCategoryList() {
    this.categories = defaults.categories;

    this.categories.forEach((element) => {
      if (element.defaultForNewPost) {
        this.selectedCategory = element.value;
        this.catWithTextArea = element.value;
      }
    });

    // filtering default list for NewPost and removing "All" category
    this.categories = _.filter(this.categories, (element) => {
      return !element.defaultForNav;
    });
  }

  ngOnInit(): void {
    this.setupCategoryList();
  }
}
