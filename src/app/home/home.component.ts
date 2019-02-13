import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ReadService } from "../read.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  angForm: FormGroup;

  constructor(private fb: FormBuilder, private rs: ReadService) { 
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      title: "",
      url: "",
      tags: []
    });
  }

  ngOnInit() {
  }

  saveArticle(title, url, tags) {
    let tagsArray = tags.split(",");
    this.rs.addArticle(title, url, tagsArray).subscribe(res => {
      this.createForm();
    });
  }

}
