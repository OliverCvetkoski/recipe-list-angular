import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('navToggle') navToggle: ElementRef;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  closeDropdown() {
    this.renderer.removeClass(this.navToggle.nativeElement, 'show');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
    this.closeDropdown();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
    this.closeDropdown();
  }

  onLogout() {
    this.authService.logout();
    this.closeDropdown();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
