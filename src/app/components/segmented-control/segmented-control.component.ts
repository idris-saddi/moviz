import { Component, Input } from '@angular/core';
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
  @Input() config: SegmentedControlConfig[] = [];

  selectItem(segment: SegmentedControlConfig) {
    if (segment.onClick) {
      segment.onClick();
    }

    this.config.map((item: SegmentedControlConfig) => {
      item.active = segment.name === item.name;
    });
  }
}
