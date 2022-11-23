import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalComponent as TobogganModalComponent } from '@snhuproduct/toboggan-ui-components-library';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'toboggan-ws-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(public service: BsModalService) {}
  public modal?: BsModalRef;
  state = false;
  @Input() id!: string;
  @Input() title!: string;
  @Input() acceptButton = 'Submit';
  @Input() cancelButton = 'Cancel';
  @Input() class = '';
  @Output() accept = new EventEmitter();
  @Output() hidden = new EventEmitter();
  @Output() hide = new EventEmitter();

  @ViewChild('content') ref!: TemplateRef<HTMLElement>;

  open = async () => {
    this.modal = this.service.show(TobogganModalComponent, {
      id: this.id,
      initialState: {
        title: this.title,
        templateRef: this.ref,
        modalButtons: [
          {
            title: this.cancelButton,
            onClick: this.close,
            style: 'secondary',
          },
          {
            title: this.acceptButton,
            onClick: async () => {
              this.accept.emit();
              return false;
            },
            style: 'primary',
          },
        ],
      },
      class: `gp-modal ${this.class}`,
    });
    const hideSubscr = this.modal?.onHide?.subscribe(() => {
      this.hide.emit();
      hideSubscr?.unsubscribe();
    });
    const hiddenSubscr = this.modal?.onHidden?.subscribe(() => {
      this.hidden.emit();
      hiddenSubscr?.unsubscribe();
    });
    return true;
  };
  close = async () => {
    this.modal?.hide();
    return true;
  };
}
