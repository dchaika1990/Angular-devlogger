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

  projectName: string;

  constructor(
    public projectsService: ProjectsService,
    public uuid: UuidService
  ) { }

  ngOnInit() {
  }

  onSubmit(form){
    this.projectsService.addProject({
      projectId: this.uuid.generate(),
      name: this.projectName,
      logs: []
    });
    form.resetForm();
  }

}
