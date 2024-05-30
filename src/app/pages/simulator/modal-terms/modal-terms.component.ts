import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-terms',
  templateUrl: './modal-terms.component.html',
  styleUrls: ['./modal-terms.component.css']
})
export class ModalTermsComponent {
  @Input() flag : boolean;
  @Input() flagModalChild : boolean;
  @Input() modalTerms : string;
  @Output() modal : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() modalBtn : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.flag = false;
    this.flagModalChild = true;
    this.modalTerms = '';
  }
}
