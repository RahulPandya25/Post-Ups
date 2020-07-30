import { Router } from "@angular/router";
import { UploadPostService } from "./../services/upload-post.service";
import { Component, OnInit } from "@angular/core";
import defaults from "../../assets/defaults.json";
import * as _ from "lodash";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NotificationService } from "../services/notification.service";
@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"],
})
export class NewPostComponent implements OnInit {
  requiredNavComponents = {
    showSecondaryNavBar: false,
    showBackBtn: true,
    showSearchBtn: false,
  };
  catWithTextArea;
  selectedCategory;
  categories;
  file = false;
  private fileList;
  isSubmitted = false;

  constructor(
    private uploadPostService: UploadPostService,
    private router: Router,
    private notifService: NotificationService
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
    title: new FormControl("", Validators.required),
    textContent: new FormControl("", Validators.required),
    category: new FormControl(""),
    file: new FormControl(""),
    caption: new FormControl(""),
    tag: new FormControl("", Validators.required),
    tags: new FormControl(""),
    isCommentEnabled: new FormControl(""),
  });

  onSubmit(form: any) {
    this.isSubmitted = true;
    if (this.myFormGroup.invalid) {
      return;
    } else {
      if (this.selectedCategory === this.catWithTextArea) {
        form.value.category = this.selectedCategory;
        form.value.tags = form.value.tag.split(",");
        if (form.value.isCommentEnabled === "") {
          form.value.isCommentEnabled = false;
        }
        console.log(this.isSubmitted);
        this.uploadPostService.submitPost(form.value).subscribe((response) => {
          console.log(response);
          this.router.navigate(["/"]);
        });
      }
    }
  }

  ngOnInit(): void {
    this.notifService.updateNavComponents(this.requiredNavComponents);

    this.setupCategoryList();
  }
}
