import { Component, Input } from '@angular/core';
import { SegmentedControlConfig } from '../../interfaces/ui-configs/segemented-control-config.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-segemented-control',
  imports: [CommonModule],
  templateUrl: './segmented-control.component.html',
  styleUrl: './segmented-control.component.css'
})
export class SegementedControlComponent {
  @Input() config: SegmentedControlConfig[]=[];

  selectItem(segment:SegmentedControlConfig){
    this.config.map((item: SegmentedControlConfig) => {
          item.active= item.name===segment.name
    })
  }
}
