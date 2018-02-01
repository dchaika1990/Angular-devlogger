import { Component, OnInit } from '@angular/core';

//Services
import { ProjectsService } from "../../services/projects.service";

//Modules
import {Project} from "../../modules/project";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Project[];

  constructor(
    public projectsServices: ProjectsService
  ) { }

  ngOnInit() {
    this.projectsServices.getAllProjects().subscribe( projects =>{
      this.projects = projects;
    }, error =>{
      console.log(error)
    } );
    console.log(this.projects)
  }

}
