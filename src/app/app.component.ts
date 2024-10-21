import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { of } from 'rxjs';
import { ModalService } from './services/modal.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(protected modalService: ModalService) {}

  show() {
    this.modalService.show()
  }

  onConfirm(buttonValue: any) {

    let obs1$ = of(() => {
      if (buttonValue === true) {
        console.log('Confirmado!');
      } else {
        console.log('Cancelado!');
      }
    })

    let obs2$ = this.modalService.showModalUntilConfirm(obs1$)

    obs2$.subscribe((result) => result())
  }
}
