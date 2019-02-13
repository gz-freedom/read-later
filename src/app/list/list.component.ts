import { Component, OnInit } from '@angular/core';
import { ReadService } from "../read.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  articles: any;
  constructor(private rs: ReadService) { }

  ngOnInit() {
    this.rs.getArticles().subscribe(res => {
      console.log(res);
      this.articles = res;
    })
  }

}
