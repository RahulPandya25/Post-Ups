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
    //file: new FormControl(""),
    tag: new FormControl(""),
  });

  onSubmit(form: any) {
    let formData: FormData = new FormData();
    formData.append("title", form.value.title),
      formData.append("category", this.selectedCategory),
      formData.append("tag", form.value.tag);
    if (this.selectedCategory === this.catWithTextArea) {
      formData.append("textContent", form.value.textContent);
      console.log(form.value.textContent);
    }

    console.log(formData.get("category"));
    console.log(formData.get("title"));
    console.log(formData.get("textContent"));
    //console.log(formData.get("file"));
    console.log(formData.get("tag"));

    this.uploadPostService.submitPost(formData).subscribe((response) => {
      console.log(response);
      this.router.navigate(["/"]);
    });
  }

  ngOnInit(): void {
    this.setupCategoryList();
  }
}
