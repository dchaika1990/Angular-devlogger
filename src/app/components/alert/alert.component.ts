import { Component, OnInit } from '@angular/core';
import {ProjectsService} from "../../services/projects.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  text: String = '';

  constructor(
    public projectsService: ProjectsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.alertText.subscribe( text => {
      this.text = text;

      setTimeout(()=>{
        this.clearState();
      }, 4000)
    } );

  }

  clearState(){
    this.text = '';

    this.alertService.clearStateAlert();
  }

}
