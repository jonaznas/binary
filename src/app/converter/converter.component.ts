import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeTextarea(event);
  }

  resizeTextarea(event: any) {
    event.target.style.height = "auto";
    event.target.style.height = (event.target.scrollHeight + 2) + "px";
  }
}
