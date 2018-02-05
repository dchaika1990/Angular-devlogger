import {Component, OnInit, Input} from '@angular/core';

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
  selectedLog: Log;

  constructor(
    public projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.projectsService.selectedLog.subscribe( log => {
      console.log(log);
      if ( log.id === null ){
        this.selectedLog = {
          id: '',
          text: '',
          date: ''
        }
      }
    } )
  }

  removeLog(log: Log, i) {
    this.projectsService.removeLog(i, this.currentRouteId)
  }

  onSelect(log: Log) {
    this.projectsService.setFormLog(log);
    this.selectedLog = log;
  }

}
