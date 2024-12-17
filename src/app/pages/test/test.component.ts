import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SegementedControlComponent } from "../../components/segmented-control/segmented-control.component";
import { SegmentedControlConfig } from '../../interfaces/ui-configs/segemented-control-config.interface';
import { InputComponent } from "../../components/input/input.component";
import { RateChipComponent } from "../../components/rate-chip/rate-chip.component";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MovieCardConfig } from '../../interfaces/movie-card-config.interface';

@Component({
  selector: 'app-test',
  imports: [NavbarComponent, SegementedControlComponent, InputComponent, RateChipComponent, MovieCardComponent],
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
  movieCards: MovieCardConfig[]=[{
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH51IyN_CqG6vSVYfYs-CuDlpV9OlGb04d8KbpSIk_cIeQsqveq8YisaTrrH2L18ezEBt7bA',
    rate:7.89,
    movieName:'Divergent'
  },
  {
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH51IyN_CqG6vSVYfYs-CuDlpV9OlGb04d8KbpSIk_cIeQsqveq8YisaTrrH2L18ezEBt7bA',
    rate:5.828,
    movieName:'Divergent2'
  }
]
}
