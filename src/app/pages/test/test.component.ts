import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SegementedControlComponent } from "../../components/segmented-control/segmented-control.component";
import { SegmentedControlConfig } from '../../interfaces/ui-configs/segemented-control-config.interface';
import { InputComponent } from "../../components/input/input.component";
import { RateChipComponent } from "../../components/rate-chip/rate-chip.component";

@Component({
  selector: 'app-test',
  imports: [NavbarComponent, SegementedControlComponent, InputComponent, RateChipComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  segments: SegmentedControlConfig[]=[{
    name:'All',
    active:true
  },
  {
    name:'Movies',
    active:false
  },
  {
    name:'Series',
    active:false
  }
]
}
