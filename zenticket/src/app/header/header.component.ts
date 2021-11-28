import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Render header based on user input.
  @Input() content;
  constructor() { }

  ngOnInit(): void {
  }

}
