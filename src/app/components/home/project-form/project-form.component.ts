import { Component, OnInit } from '@angular/core';

//Services
import { ProjectsService } from "../../../services/projects.service";
import {UuidService} from "../../../services/uuid.service";

//Models
import { Log } from "../../../modules/Log";
import { Project } from "../../../modules/project";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  isNew: boolean = true;

  projectId: string;
  name: string;
  logs: Log[];

  constructor(
    public projectsService: ProjectsService,
    public uuid: UuidService
  ) { }

  ngOnInit() {

    // подписываемся на выбор проекта
    this.projectsService.selectedListProject.subscribe( project => {
      if ( project.projectId !== null ){
        this.isNew = false;
        this.projectId = project.projectId;
        this.name = project.name;
        this.logs = project.logs;
        console.log(project.projectId);
      }
    } )

  }

  onSubmit(form){

    if ( this.isNew ){

      const newProject = {
        projectId: this.uuid.generate(),
        name: this.name,
        logs: []
      };
      this.projectsService.addProject(newProject);
      form.resetForm();


    } else {

      const updProject = {
        projectId: this.projectId,
        name: this.name,
        logs: this.logs
      };
      this.projectsService.updateProject(updProject)

    }

    this.clearState();

  }

  clearState(){
    this.isNew = true;
    this.projectId = '';
    this.name = '';
    this.logs = [];

    this.projectsService.clearStateProject()
  }

}
