import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import defaults from "../../assets/defaults.json";
import * as _ from "lodash";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NotificationService } from "../services/notification.service";
import { PostService } from "../services/post.service";
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
  post;

  constructor(
    private postService: PostService,
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
      form.value.category = this.selectedCategory;
      form.value.tags = form.value.tag.split(",");
      if (form.value.isCommentEnabled === "") {
        form.value.isCommentEnabled = false;
      }
      if (this.selectedCategory === this.catWithTextArea) {
        console.log(this.isSubmitted);
        this.postService.submitPost(form.value).subscribe((response) => {
          this.post = response;
          console.log(response);
          console.log(response.hasOwnProperty("id"));
          this.router.navigate(["/"]);
        });
      }
      if (this.selectedCategory !== this.catWithTextArea) {
        let file: File = this.fileList[0];
        let formData: FormData = new FormData();
        formData.append("file", file, file.name);
        this.postService.submitPost(form.value).subscribe((response) => {
          if (response !== null) {
            this.post = response;
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

  ngOnInit(): void {
    this.notifService.updateNavComponents(this.requiredNavComponents);

    this.setupCategoryList();
  }
}
