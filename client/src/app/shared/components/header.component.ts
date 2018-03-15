import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public searchTerm = '';
  public isCollapsed = true;

  public collapse() {
    this.isCollapsed = true;
  }

  public closeDropdown(dropdown) {
    dropdown.close();
  }

  public search() {

  }

}
