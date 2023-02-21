import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ConverterService } from 'src/app/converter/converter.service';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  detectedAsBinary?: boolean;
  output?: string;
  showOutputContent = false;
  private timeoutId?: number;

  @ViewChild('textarea') textarea!: ElementRef;
  @ViewChild('outputElement') outputElement!: ElementRef;
  @ViewChild('copyButton') copyButton!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeTextarea(event);
  }

  constructor(
    private converter: ConverterService
  ) {
  }

  resizeTextarea(event: any) {
    event.target.style.height = 'auto';
    event.target.style.height = (event.target.scrollHeight + 2) + 'px';
  }

  convert(event: any) {
    const text = event.target.value;
    const converted = this.converter.textToBinary(text);
    console.log(converted);
    this.output = converted;
  }

  onTextareaInput(event: any): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => {
      const isBinary = this.isBinary(event.target.value);

      if (this.detectedAsBinary !== isBinary) {
        this.detectedAsBinary = isBinary;
        this.hideOutput(true);
      } else {
        this.showOutput();
      }

      if (this.detectedAsBinary) {
        this.output = this.converter.binaryToText(event.target.value);
      } else {
        this.output = this.converter.textToBinary(event.target.value);
      }

    }, 1000);
  }

  isBinary(input: string): boolean {
    const regex = /^[01]+$/;
    input = input.replace(/\s/g, '');
    return regex.test(input);
  }

  showOutput() {
    this.showOutputContent = true;
    anime({
      targets: '.output',
      translateY: 110
    });
  }

  hideOutput(shouldShowAgain = false) {
    this.showOutputContent = false;
    anime({
      targets: '.output',
      translateY: 0,
      complete: () => {
        if (shouldShowAgain) {
          setTimeout(() => {
            this.showOutput();
          }, 200);
        }
      }
    });
  }

  copyOutput(outputText: string | undefined) {
    if(!outputText) {
      return;
    }

    navigator.clipboard.write(
      [new ClipboardItem({ 'text/plain': new Blob([outputText], { type: 'text/plain' }) })]
    ).then(() => {
      this.copyButton.nativeElement.classList.add('btn-success');
      setTimeout(() => {
        this.copyButton.nativeElement.classList.remove('btn-success');
      }, 2000)
    });
  }
}
