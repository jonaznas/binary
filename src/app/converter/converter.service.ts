import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  constructor() {
  }

  textToBinary(text: string): string {
    let binary = '';
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      let charBinary = charCode.toString(2);
      let padding = '0'.repeat(8 - charBinary.length);
      binary += padding + charBinary + ' ';
    }
    return binary.trim();
  }

  binaryToText(binary: string): string {
    binary = binary.replace(/\s/g, '');
    const binaryData = new Uint8Array(binary.length / 8);
    for (let i = 0; i < binaryData.length; i++) {
      binaryData[i] = parseInt(binary.slice(i * 8, (i + 1) * 8), 2);
    }
    const textDecoder = new TextDecoder();
    return textDecoder.decode(binaryData);
  }
}
