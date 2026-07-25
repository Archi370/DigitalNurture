import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight: string = 'rgba(79, 70, 229, 0.08)';
  @Input() defaultColor: string = 'transparent';

  private el = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.appHighlight || 'rgba(79, 70, 229, 0.08)');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight(this.defaultColor);
  }

  private highlight(color: string): void {
    if (this.el && this.el.nativeElement) {
      this.el.nativeElement.style.backgroundColor = color;
      this.el.nativeElement.style.transition = 'background-color 0.3s ease';
    }
  }
}
