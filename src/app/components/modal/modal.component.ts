import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


export type Button = {
  label: string,
  value: any
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgFor],
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input()
  isVisible: boolean = false;

  @Input()
  buttons: Array<Button> = [];

  open() {
    this.isVisible = true
  }

  close() {
    this.isVisible = false
  }

  @Output()
  confirm = new EventEmitter<any>();

  onButtonClick(button: Button) {
    this.confirm.emit(button.value);
    this.close()
  }
}