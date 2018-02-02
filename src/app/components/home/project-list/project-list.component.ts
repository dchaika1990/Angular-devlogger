import {Component, Input, OnInit} from '@angular/core';

//Services
import { ProjectsService } from "../../../services/projects.service";

//Models
import { Log } from "../../../modules/Log";
import { Project } from "../../../modules/project";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Input('projects') projects: Project[];

  constructor(
    public projectsServices: ProjectsService
  ) { }

  ngOnInit() {

  }

  removeProject(i){
    this.projectsServices.removeProject(i);
  }

}
