import { Component, OnInit } from '@angular/core';
import { ReadService } from "../read.service";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  allArticles: any;
  articles: any;
  filterType: string = "all";

  searchGroup = new FormGroup({
    searchStr: new FormControl()
  });

  constructor(private rs: ReadService) { }

  ngOnInit() {
    this.rs.getArticles().subscribe(res => {
      this.articles = this.allArticles = res;
    });
  }

  filterArticles(type) {
    this.filterType = type;
    if(type === "unread") {
      this.articles = this.allArticles.filter((data) => {
        return !data.read;
      });
    } else if(type === "all") {
      this.articles = this.allArticles;
    } else if(type === "search") {
      let keyword = this.searchGroup.get("searchStr").value.toLowerCase();
      this.articles = this.allArticles.filter((data) => {
        return data.title.toLowerCase().indexOf(keyword) !== -1 || data.tags.indexOf(keyword) !== -1;
      });
    }
  }

  markAsRead(id) {
    this.rs.updateArticle({ id: id, read: true}).subscribe(res => {
      this.articles.forEach(data => {
        if(data._id === id) {
          data.read = true;
        }
      });
    });
  }

  deleteArticle(id) {
    this.rs.deleteArticle(id).subscribe(res => {
      this.articles = this.articles.filter(data => {
        return data._id !== id;
      });
    });
  }
}
