import {Component, Input, OnInit} from '@angular/core';

//Services
import { ProjectsService } from "../../../services/projects.service";
import { UuidService } from "../../../services/uuid.service";

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id: string;
  text: string;
  date: string;

  @Input() currentRouteId: string;

  constructor(
    public projectsService: ProjectsService,
    public uuid: UuidService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const newLog = {
      id: this.uuid.generate(),
      text: this.text,
      date: (new Date()).toLocaleString()
    };

    this.projectsService.addLog(newLog, this.currentRouteId)

  }

}
