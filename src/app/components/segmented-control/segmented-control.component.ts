import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabType } from '../../interfaces/ui-configs/segemented-control-config.interface';

@Component({
  selector: 'app-segmented-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segmented-control.component.html',
  styleUrl: './segmented-control.component.scss',
})
export class SegmentedControlComponent {
  @Output() activeSegmentChange = new EventEmitter<TabType>();
  tabs: TabType[] = ['All', 'Movies', 'TV Shows'];
  activeSegment: TabType = this.tabs[0];

  selectItem(segment: TabType) {
    if (segment != this.activeSegment) {
      this.activeSegment = segment;
      this.activeSegmentChange.emit(segment);
    }
  }
}
