import { Injectable } from '@angular/core';
import { of } from "rxjs/observable/of";

// Models
import { Log } from "../modules/Log";
import { Project } from "../modules/project";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProjectsService {

  projects: Project[];
  selectedProject: Project;

  constructor() {

    this.projects = JSON.parse(localStorage.getItem('projects')) || [];
  }

  getAllProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProject(id): Observable<Project> {

    this.projects.forEach( (current, i) =>{
      if( current.projectId === id ){
        this.selectedProject = current;
      }
    } );

    return of(this.selectedProject);

  }

  addProject( project ) {
    this.projects.unshift(project);
    localStorage.setItem('projects', JSON.stringify(this.projects))
  }

  addLog(log: Log, projectId) {

    this.projects.forEach( project => {
      if ( project.projectId === projectId ) {
        console.log(project);
        project.logs.unshift(log)
      }
    } );

    // Add to LS
    localStorage.setItem( 'projects', JSON.stringify(this.projects));

  }

}
