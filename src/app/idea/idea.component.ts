import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { IdeaService } from '../idea.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css'],
})
export class IdeaComponent implements OnInit {
  inputChange$ = new Subject();
  newIdea: any;
  ideaForUpdate: any;
  ideas: Idea[] = [];
  strategies: Idea[] = [];
  conclusion: Idea[] = [];
  ideaEdit: boolean = true;
  idEdit: number;

  constructor(
    private ideaService: IdeaService,
    @Inject(DOCUMENT) private document: any,
    private auth: AuthService
  ) {
    this.inputChange$.pipe(debounceTime(2000)).subscribe((x) => {
      let idea: Idea = { id: undefined, idea: undefined, type: undefined };
      let newIdea: any = x;
      idea.idea = newIdea;
      this.addIdea(idea),
        () => console.log('Error '),
        () => console.log('Terminado');
    });
  }

  ngOnInit(): void {
    // this.inputChange$.subscribe(x => {
    //   let idea: Idea = { id: undefined, idea: undefined, type: undefined };
    //   console.log("En onInit", x )
    //   let newIdea: any = x;
    //   idea.idea = newIdea;
    //   this.addIdea(idea), () => console.log("Error "), () => console.log("Terminado")
    // });
    this.getIdeas();
  }

  logout() {
    this.auth.logout();
  }

  inputChange($event) {
    this.inputChange$.next($event);
    console.log('Pasas muy rapido', $event);
  }

  addIdea(idea) {
    this.ideaService.addStrategy(idea).subscribe((x: Idea) => {
      this.newIdea = null;
      if (x != null) {
        this.ideas.push(x);
      }
    });
  }

  getIdeas() {
    this.ideaService.getIdeas().subscribe(
      (resp) => {
        let allIdeas;
        allIdeas = resp.body;
        let totalIdeas = allIdeas.content;

        totalIdeas.forEach((idea) => {
          if (idea.type == 'strategy') {
            this.strategies.push(idea);
          } else if (idea.type == 'conclusion') {
            this.conclusion.push(idea);
          } else {
            this.ideas.push(idea);
          }
        });
      },
      (error) => {
        console.log('Error en getIdeas', error.status);
        if (error.status == 200) {
          this.document.location.href = 'http://localhost:8080/login';
        }
      }
    );
  }

  updateIdea(id, idea) {
    let newIdea: Idea = { id: undefined, idea: undefined, type: undefined };
    newIdea.id = id;
    newIdea.idea = idea;
    this.ideaService.updateidea(newIdea).subscribe((ideaUpdate) => {
      this.ideaEdit = false;
      this.ideas.forEach((x: Idea) => {
        if (x.id == ideaUpdate.id) {
          x.idea = ideaUpdate.idea;
        }
      });
    });
  }

  onDeleteIdea(idea: Idea, i: number) {
    let index = i;
    this.ideaService.deleteIdea(idea.id).subscribe(() => {
      this.ideas.splice(index, 1);
    });
  }

  dropIdeas(event: CdkDragDrop<string[]>) {
    let ideasList = [];
    ideasList = event.container.data;
    ideasList.forEach((idea) => {
      if (idea.type != 'idea') {
        idea.type = 'idea';
        this.ideaService.updateidea(idea).subscribe();
      }
    });

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dropStrategies(event: CdkDragDrop<string[]>) {
    let strategyList: any;
    strategyList = event.container.data;
    strategyList.forEach((idea) => {
      if (idea.type != 'strategy') {
        idea.type = 'strategy';
        this.ideaService.updateidea(idea).subscribe();
      }
    });

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dropConclusion(event: CdkDragDrop<string[]>) {
    let conclusionList = [];
    conclusionList = event.container.data;
    conclusionList.forEach((idea) => {
      if (idea.type != 'conclusion') {
        idea.type = 'conclusion';
        this.ideaService.updateidea(idea).subscribe();
      }
    });

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

export interface Idea {
  id: string;
  idea: string;
  type: string;
}
