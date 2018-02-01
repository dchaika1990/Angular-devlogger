import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

//Servive
import { ProjectsService } from "../../services/projects.service";

//Models
import {Project} from "../../modules/project";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  currentRouteId: string;
  currentProject: Project;

  constructor(
    public projectsService: ProjectsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentRouteId = this.route.snapshot.params.id;

    this.currentProject = this.projectsService.getProject(this.currentRouteId);
    console.log(this.currentProject)
  }

}
