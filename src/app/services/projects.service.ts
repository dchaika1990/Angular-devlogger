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
  text: string;

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

  private alertSource = new BehaviorSubject<String>(null);
  alertText = this.alertSource.asObservable();

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

  addProject( project: Project ) {
    this.projects.unshift(project);
    localStorage.setItem('projects', JSON.stringify(this.projects));

    //Alert
    this.text = 'Added project success';
    this.setAlertText(this.text);
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
    this.text = 'Added log success';
    this.setAlertText(this.text);

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
    this.text = 'Updated log success';
    this.setAlertText(this.text);

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
    this.text = 'Updated project success';
    this.setAlertText(this.text);

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
    this.text = 'Deleted log success';
    this.setAlertText(this.text);

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
    this.text = 'Deleted project success';
    this.setAlertText(this.text);

  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  setFormProject(project: Project) {
    this.projectSource.next(project);
  }

  setAlertText(text: string){
    this.alertSource.next(text);
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

  clearStateAlert() {
    this.alertSource.next(null);

  }

}
