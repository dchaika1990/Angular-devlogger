import { Component, OnInit, Input } from '@angular/core';

//Services
import { ProjectsService } from "../../../services/projects.service";

//Models
import { Log } from "../../../modules/Log";

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit {

  @Input() logs: Log[];
  @Input() currentRouteId: string;

  constructor(
    public ProjectsService: ProjectsService
  ) { }

  ngOnInit() {



  }

}
