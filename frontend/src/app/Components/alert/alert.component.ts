import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-alert',
    standalone: false,
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
    animations: [
        trigger('dropAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(-100%)', opacity: 0 }),
                animate(
                    '500ms ease-out',
                    style({ transform: 'translateY(0)', opacity: 1 })
                ),
            ]),
            transition(':leave', [
                animate(
                    '300ms ease-in',
                    style({ transform: 'translateY(-100%)', opacity: 0 })
                ),
            ]),
        ]),
    ],
})
export class AlertComponent implements OnInit {
    ngOnInit(): void {
        this.handleAlert(this.kind);
    }
    @Input() kind: string = '';
    @Input() name: string = '';
    @Input() content: string = '';
    color: string = '';

    handleAlert(kind: string) {
        switch (kind) {
            case 'danger':
                this.color = 'red';
                break;
            case 'success':
                this.color = 'green';
                break;
            case 'warning':
                this.color = 'yellow';
                break;
            case 'info':
                this.color = 'blue';
                break;
            default:
                this.color = 'gray';
        }
    }
}
