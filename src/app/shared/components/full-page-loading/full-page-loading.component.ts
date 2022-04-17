import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/core/services/dom.service';

@Component({
  selector: 'app-full-page-loading',
  templateUrl: './full-page-loading.component.html',
  styleUrls: ['./full-page-loading.component.scss']
})
export class FullPageLoadingComponent implements OnInit {
  static detachView = () => {};

  constructor() { }

  static show(domService: DomService) {
    FullPageLoadingComponent.detachView = domService.appendComponentToBody(FullPageLoadingComponent, {});
  }

  static hide() {
    FullPageLoadingComponent.detachView();
  }

  ngOnInit(): void {
  }

}
