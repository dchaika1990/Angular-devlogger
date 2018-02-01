import { Injectable } from '@angular/core';

// Models
import { Log } from "../modules/Log";
import { Project } from "../modules/project";

@Injectable()
export class ProjectsService {

  projects: Project[];
  selectedProject: Project;

  constructor() {

    this.projects = [
      {
        projectId: '1',
        name: 'Easycode',
        logs: [
          {
            id: '1',
            text: 'Added components',
            date: '20.01.2018 15:21:12'
          },
          {
            id: '2',
            text: 'Added services',
            date: '20.01.2018 15:32:12'
          },
          {
            id: '3',
            text: 'Added module',
            date: '20.01.2018 15:42:12'
          }
        ]
      },
      {
        projectId: '200',
        name: 'Amazon',
        logs: [
          {
            id: '1',
            text: 'Added http',
            date: '20.01.2018 15:21:12'
          }
        ]
      }
    ]
  }

  getAllProject(){
    return this.projects;
  }

  getProject(id){

    this.projects.forEach( (current, i) =>{
      if( current.projectId === id ){
        this.selectedProject = current;
      }
    } );

    return this.selectedProject;

  }

  addProject( project ){
    this.projects.unshift(project)
  }

}
