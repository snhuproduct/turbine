import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ModalButtonConfig,
  ModalComponent as TobogganModalComponent,
} from '@snhuproduct/toboggan-ui-components-library';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'toboggan-ws-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnChanges {
  constructor(public service: BsModalService) {}

  public modal?: BsModalRef;
  state = false;
  @Input() id!: string;
  @Input() title!: string;
  @Input() acceptButton = 'Submit';
  @Input() cancelButton = 'Cancel';
  @Output() accept = new EventEmitter();
  @Output() hidden = new EventEmitter();
  @Output() hide = new EventEmitter();
  @Input() isCloseActionHandled = false;
  @Output() closeAction = new EventEmitter();

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
      class: 'gp-modal',
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
    if (this.closeAction && this.isCloseActionHandled) {
      this.closeAction.emit();
      return false;
    } else {
      this.modal?.hide();
      return true;
    }
  };

  ngOnChanges({ title, acceptButton, cancelButton }: SimpleChanges): void {
    if (!title?.firstChange && this.modal) {
      this.modal.content.title = title.currentValue;
    }
    if (!acceptButton?.firstChange && this.modal) {
      this.modal.content.modalButtons.find(
        (button: ModalButtonConfig) =>
          button.title == acceptButton.previousValue
      ).title = acceptButton.currentValue;
    }
    if (!cancelButton?.firstChange && this.modal) {
      this.modal.content.modalButtons.find(
        (button: ModalButtonConfig) =>
          button.title == cancelButton.previousValue
      ).title = cancelButton.currentValue;
    }
  }

  //add banners in modal
  showBannerAlert(type: string, heading: string, message: string) {
    this.modal?.content?.alertBanners.push({
      type,
      heading,
      message,
    });
  }
}
