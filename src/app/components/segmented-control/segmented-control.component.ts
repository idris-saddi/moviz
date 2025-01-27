import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentedControlConfig } from '../../interfaces/ui-configs/segemented-control-config.interface';

@Component({
  selector: 'app-segmented-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segmented-control.component.html',
  styleUrl: './segmented-control.component.scss',
})
export class SegmentedControlComponent {
  // @Input() config: SegmentedControlConfig[] = [];
  tabs = ['All', 'Movies', 'TV Shows'];
  activeSegment: string = this.tabs[0];
  @Output() activeSegmentChange = new EventEmitter<string>();

  selectItem(segment: string) {
    // if (segment.onClick) {
    //   segment.onClick();
    // }
    // this.config.map((item: SegmentedControlConfig) => {
    //   item.active = segment.name === item.name;
    // });
    if (segment != this.activeSegment) {
      this.activeSegment = segment;
      this.activeSegmentChange.emit(segment);
    }
  }
}
