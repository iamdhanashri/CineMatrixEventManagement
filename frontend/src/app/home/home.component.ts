import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Subscribe to the NavigationEnd event
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Call the refreshPage() function whenever NavigationEnd event occurs
      this.refreshPage();
    });
  }

  refreshPage() {
    location.reload();
  }

  imgData = [
    "https://www.rhema.cc/wp-content/sabai/File/files/l_a7300baa6a2f167db0ac362e24714210.jpg"
  ]

  activity = [
    {img : "https://images.thedirect.com/media/article_full/marvel-posters-ranked.jpg",name : "Choose your Movie"},
   
  ]

  selectedImage: string | null = null;

  onSelectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

}
