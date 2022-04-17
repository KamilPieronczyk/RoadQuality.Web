import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  appendComponentToBody(component: Type<any>, props: any): () => void {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    componentRef.instance.props = props;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
    
    const detachView = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }

    return detachView;
  }
}
