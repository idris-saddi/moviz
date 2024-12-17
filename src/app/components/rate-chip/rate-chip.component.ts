import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-chip',
  imports: [],
  templateUrl: './rate-chip.component.html',
  styleUrl: './rate-chip.component.css'
})
export class RateChipComponent implements OnInit {
  @Input() rate: number = 0;
  @Input() placeDecimals: number = 0 ;
  actualNumber: string = '';

  ngOnInit(): void {
    this.actualNumber= this.rate.toFixed(this.placeDecimals);
  }
}
