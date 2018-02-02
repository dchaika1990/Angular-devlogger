import { Injectable } from '@angular/core';
import { of } from "rxjs/observable/of";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

// Models
import { Log } from "../modules/Log";
import { Project } from "../modules/project";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProjectsService {

  projects: Project[];
  selectedProject: Project;

  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });
  selectedLog = this.logSource.asObservable();

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

  updateLog(log: Log, projectId) {

    this.projects.forEach( project => {
      // search project by projectId
      if ( project.projectId === projectId ) {
        // search log by log.id
        project.logs.forEach( (value, i) => {
          if ( value.id === log.id ) {
            // delete old log
            project.logs.splice( i, 1 )
          }
        } );
        // add update log
        project.logs.unshift(log)

      }
    } );

    // Add to LS
    localStorage.setItem( 'projects', JSON.stringify(this.projects));

  }

  removeLog(i, projectId) {

    this.projects.forEach( project => {
      if ( project.projectId === projectId ) {
        project.logs.splice( i, 1 );
      }
    });

    // Add to LS
    localStorage.setItem( 'projects', JSON.stringify(this.projects));

  }

  removeProject(i) {

    this.projects.splice( i, 1);

    // Add to LS
    localStorage.setItem( 'projects', JSON.stringify(this.projects));

  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  clearState() {
    this.logSource.next({
      id: null,
      text: null,
      date: null
    })
  }

}
