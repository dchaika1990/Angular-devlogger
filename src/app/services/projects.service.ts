import { Injectable } from '@angular/core';
import { of } from "rxjs/observable/of";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

// Models
import { Log } from "../modules/Log";
import { Project } from "../modules/project";
import {Observable} from "rxjs/Observable";

//Services
import { AlertService } from "./alert.service";

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

  private projectSource = new BehaviorSubject<Project>({
    projectId: null,
    name: null,
    logs: null
  });
  selectedListProject = this.projectSource.asObservable();

  private stateSource = new BehaviorSubject<Boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor(
    private alertService: AlertService
  ) {
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

  addProject( project: Project ) {
    this.projects.unshift(project);
    localStorage.setItem('projects', JSON.stringify(this.projects));

    //Alert
    this.alertService.setAlertText('Added project success');
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

    //Alert
    this.alertService.setAlertText('Added log success');

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

    //Alert
    this.alertService.setAlertText('Updated log success');

  }

  updateProject(project: Project) {

    this.projects.forEach( (projectSelect, i) => {
      // search project by projectId
      if ( project.projectId === projectSelect.projectId ){
        // delete old project
        this.projects.splice(i, 1);
        // add update log
        this.projects.unshift(project)
      }

    });

    // Add to LS
    localStorage.setItem( 'projects', JSON.stringify(this.projects));

    //Alert
    this.alertService.setAlertText('Updated project success');

  }

  removeLog(i, projectId) {

    this.projects.forEach( project => {
      if ( project.projectId === projectId ) {
        project.logs.splice( i, 1 );
      }
    });

    // Add to LS
    localStorage.setItem( 'projects', JSON.stringify(this.projects));

    //Alert
    this.alertService.setAlertText('Deleted log success');

  }

  removeProject(projectId){

    this.projects.forEach( (projectSelect, i) => {
      if ( projectId === projectSelect.projectId ){
        this.projects.splice( i, 1);
      }

    } );

    // Add to LS
    localStorage.setItem( 'projects', JSON.stringify(this.projects));

    //Alert
    this.alertService.setAlertText('Deleted project success');

  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  setFormProject(project: Project) {
    this.projectSource.next(project);
  }

  clearStateLog() {
    this.logSource.next({
      id: null,
      text: null,
      date: null
    });
  }

  clearStateProject() {

    this.stateSource.next(true);

    this.projectSource.next({
      projectId: null,
      name: null,
      logs: null
    });
  }



}
