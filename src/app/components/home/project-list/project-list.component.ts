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
  selectedProject: Project;

  constructor(
    public projectsServices: ProjectsService
  ) { }

  ngOnInit() {
    this.projectsServices.stateClear.subscribe( clearState => {
      if ( clearState ){
        this.selectedProject = {
          projectId: '',
          name: '',
          logs: []
        }
      }
    } )
  }

  removeProject(projectId){
    this.projectsServices.removeProject(projectId)
  }

  onSelect( project: Project ){
    this.projectsServices.setFormProject(project);
    this.selectedProject = project;
  }

}
