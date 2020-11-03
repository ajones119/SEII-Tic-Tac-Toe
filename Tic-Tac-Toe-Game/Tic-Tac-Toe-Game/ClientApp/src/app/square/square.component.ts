import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent  {

  @Input() value: 'X' | 'O';


  dummy() {
    console.log("dummy function");
  }

  dummy2() {
    console.log("dummy2");
  }
}
