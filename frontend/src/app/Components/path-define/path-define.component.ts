import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-path-define',
  standalone: false,

  templateUrl: './path-define.component.html',
  styleUrl: './path-define.component.css',
})
export class PathDefineComponent {
  @Input() title: string = '';
}
