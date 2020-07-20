import { Router } from "@angular/router";
import { UploadPostService } from "./../services/upload-post.service";
import { Component, OnInit } from "@angular/core";
import defaults from "../../assets/defaults.json";
import * as _ from "lodash";
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"],
})
export class NewPostComponent implements OnInit {
  showSecondaryNavBar = false;
  showBackBtn = true;
  showSearchBtn = false;

  catWithTextArea;
  selectedCategory;
  categories;
  file = false;
  private fileList;

  constructor(
    private uploadPostService: UploadPostService,
    private router: Router
  ) {}
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

  myFormGroup = new FormGroup({
    title: new FormControl(""),
    textContent: new FormControl(""),
    category: new FormControl(""),
    //file: new FormControl(""),
    tag: new FormControl(""),
  });

  onSubmit(form: any) {
    if (this.selectedCategory === this.catWithTextArea) {
      form.value.category = this.selectedCategory;

      console.log("Category:" + form.value.category);
      console.log("Tags:" + form.value.tag.split(","));

      this.uploadPostService.submitPost(form.value).subscribe((response) => {
        console.log(response);
        this.router.navigate(["/"]);
      });
    }
  }

  ngOnInit(): void {
    this.setupCategoryList();
  }
}
