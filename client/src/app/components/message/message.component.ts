import { Component, OnInit } from '@angular/core';
import {DataService} from "../../shared/data.service";


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
  }

}
