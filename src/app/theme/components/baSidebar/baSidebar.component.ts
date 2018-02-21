import { Component, ElementRef, HostListener, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GlobalState } from '../../../global.state';
import { layoutSizes } from '../../../theme';

@Component({
  selector: 'ba-sidebar',
  templateUrl: './baSidebar.html',
  styleUrls: ['./baSidebar.scss']
})
export class BaSidebar implements OnInit, AfterViewInit, OnDestroy {
  public menuHeight: number;
  public isMenuCollapsed = false;
  public isMenuShouldCollapsed = false;
  protected _onRouteChange: Subscription;

  constructor(
    private _elementRef: ElementRef,
    private _state: GlobalState,
    private _router: Router
  ) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngOnInit(): void {
    // Manage the state of the menu
    if (window.localStorage.getItem('isMenuCollapsed')) {
      const currentMenuState = JSON.parse(window.localStorage.getItem('isMenuCollapsed')) as boolean;
      this.menuCollapseStateChange(currentMenuState);
    }

    if (this._shouldMenuCollapse()) {
      this.menuCollapse();
    }

    // Bind the collapse on ActivatedRoute
    // this._onRouteChange = this._router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     if (this._router.url.includes('tables')) {
    //       this.menuExpand();
    //     } else if (!this.isMenuCollapsed) {
    //       this.menuCollapse();
    //     }
    //   }
    // });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.updateSidebarHeight());
  }

  public ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    const isMenuShouldCollapsed = this._shouldMenuCollapse();

    if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
      this.menuCollapseStateChange(isMenuShouldCollapsed);
    }
    this.isMenuShouldCollapsed = isMenuShouldCollapsed;
    this.updateSidebarHeight();
  }

  public menuExpand(): void {
    this.menuCollapseStateChange(false);
  }

  public menuCollapse(): void {
    this.menuCollapseStateChange(true);
  }

  public menuCollapseStateChange(isCollapsed: boolean): void {
    this.isMenuCollapsed = isCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public updateSidebarHeight(): void {
    // TODO: get rid of magic 84 constant
    this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 84;
  }

  private _shouldMenuCollapse(): boolean {
    return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
  }
}
