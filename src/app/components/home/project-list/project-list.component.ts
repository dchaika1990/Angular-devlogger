import { Component, OnInit } from '@angular/core';

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

  projects: Project[];

  constructor(
    public ProjectsServices: ProjectsService
  ) { }

  ngOnInit() {
    this.projects = this.ProjectsServices.getAllProject();
    console.log(this.projects)
  }

}
