/*import { Component,TemplateRef, ViewContainerRef,Input, OnInit, ViewChild, Inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-overlay-popup',
  templateUrl: './overlay-popup.component.html',
  styleUrls: ['./overlay-popup.component.scss']
})
export class OverlayPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { appointment: any }) { }

}*/
 /* @Component({
    selector: 'your-dialog',
    template: '{{ data.appointment }}',
  })
  export class YourDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { appointment: any }) { }
  }*/
  
  /*@Input() appointment: any;
  private overlayRef: OverlayRef | null = null;
  public popupTemplate!: TemplateRef<any>;

  @ViewChild('popupContent', { read: TemplateRef }) popupContentTemplate!: TemplateRef<any>;


  constructor(public dialog: MatDialog,private overlay: Overlay, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.popupTemplate = this.popupContentTemplate;
  }


  openPopup() {
    // Erstelle ein Overlay
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
    });

    // Verwende eine Vorlage für das Popup
    const templatePortal = new TemplatePortal(this.popupTemplate, this.viewContainerRef);

    // Hänge die Vorlage an das Overlay an
    this.overlayRef.attach(templatePortal);

    // Schließe das Popup bei Klick auf den Hintergrund
    this.overlayRef.backdropClick().subscribe(() => this.closePopup());
  }

  closePopup() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  openDialog() {
    // Öffne das Popup-Fenster mit MatDialog
    this.dialog.open(OverlayPopupComponent, {
      data: { appointment: this.appointment },
    });
  }
}*/
