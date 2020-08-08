import { PostService } from "./../services/post.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import defaults from "../../assets/defaults.json";
import * as _ from "lodash";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NotificationService } from "../services/notification.service";
import { fileExtensionValidator } from "./file-extension-validator.directive";

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
  isLoading = false;
  loadingMessage = "Please wait while we upload your Post!";
  catWithTextArea;
  selectedCategory;
  fileSizeFlag;
  categories;
  file = false;
  private fileList;
  isSubmitted = false;
  post;
  currentTags = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private notifService: NotificationService
  ) {}
  selectFile(event) {
    this.fileList = event.target.files;
    let fileInput = this.fileList[0];
    if (fileInput.size <= 5000000) {
      this.fileSizeFlag = false;
    } else {
      this.fileSizeFlag = true;
    }
  }
  changeCategory(e) {
    this.selectedCategory = e.target.value;
    if (this.selectedCategory !== this.catWithTextArea) {
      this.myFormGroup.addControl(
        "file",
        new FormControl("", [
          Validators.required,
          fileExtensionValidator(this.selectedCategory),
        ])
      );
    }
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
    tag: new FormControl("", Validators.required),
    tags: new FormControl(""),
    isCommentEnabled: new FormControl(""),
  });

  onSubmit(form: any) {
    this.isSubmitted = true;
    if (this.myFormGroup.invalid) {
      return;
    } else {
      this.isLoading = true;
      form.value.category = this.selectedCategory;
      form.value.tags = this.currentTags;
      if (form.value.isCommentEnabled === "") {
        form.value.isCommentEnabled = false;
      }
      if (this.selectedCategory === this.catWithTextArea) {
        console.log(this.isSubmitted);
        this.postService.submitPost(form.value).subscribe((response) => {
          console.log(response);
          this.router.navigate(["/"]);
        });
      }
      if (this.selectedCategory !== this.catWithTextArea) {
        let file: File = this.fileList[0];
        let formData: FormData = new FormData();
        formData.append("file", file, file.name);
        this.postService.submitPost(form.value).subscribe((response) => {
          if (response.status === 200) {
            this.post = response.body;
            this.postService
              .uploadFile(formData, this.post._id)
              .subscribe((data) => {
                console.log(data);
                this.router.navigate(["/"]);
              });
          }
        });
      }
    }
  }

  addTag(e) {
    if (!_.includes(this.currentTags, e.target.value))
      this.currentTags.push(e.target.value);
    e.target.value = "";
  }
  removeTag(tag) {
    _.remove(this.currentTags, function (element) {
      return element === tag;
    });
  }

  ngOnInit(): void {
    this.notifService.updateNavComponents(this.requiredNavComponents);

    this.setupCategoryList();
  }
}
