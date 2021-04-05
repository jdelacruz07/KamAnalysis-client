import { Component, Inject, OnInit, ɵɵgetInheritedFactory } from '@angular/core';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subject } from 'rxjs';
import { StrategyService } from '../strategy.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css'],
})
export class StrategyComponent implements OnInit {
  inputChange$ = new Subject;
  newIdea: any;
  ideaForUpdate: any;
  ideas: Strategy[] = [];
  strategies: Strategy[] = [];
  conclusion: Strategy[] = [];
  ideaEdit: boolean = true;
  idEdit: number;

  constructor(private strategyService: StrategyService, @Inject(DOCUMENT) private document: any, private auth: AuthService) { }

  ngOnInit(): void {
    this.inputChange$.pipe(debounceTime(2000)).subscribe(x => {
      let idea: Strategy = { id: undefined, idea: undefined, type: undefined };
      let newIdea: any = x;
      idea.idea = newIdea;
      this.addIdea(idea), () => console.log("Error "), () => console.log("Terminado")
    });
    this.getIdeas();
  }

  logout() {
    this.auth.logout().subscribe();
  }



  inputChange($event) {
    this.inputChange$.next($event);
  }

  addIdea(idea) {
    this.strategyService.addStrategy(idea).subscribe((x: Strategy) => {
      this.newIdea = null;
      if (x != null) {
        this.ideas.push(x);
      }
    });
  }

  getIdeas() {
    this.strategyService.getIdeas().subscribe(resp => {
      let allIdeas;
      allIdeas = resp.body;
      let totalIdeas = allIdeas.content;

      totalIdeas.forEach(idea => {
        if (idea.type == "strategy") {
          this.strategies.push(idea)
        } else if (idea.type == "conclusion") {
          this.conclusion.push(idea)
        } else {
          this.ideas.push(idea);
        }
      });
    }, error => {
      console.log("Error en getIdeas", error.status)
      if (error.status == 200) {
        this.document.location.href = "http://localhost:8080/login"
      }
    })
  }

  updateIdea(id, idea) {
    let newIdea: Strategy = { id: undefined, idea: undefined, type: undefined };
    newIdea.id = id;
    newIdea.idea = idea;
    this.strategyService.updateidea(newIdea).subscribe((ideaUpdate) => {
      this.ideaEdit = false;
      this.ideas.forEach((x: Strategy) => {
        if (x.id == ideaUpdate.id) {
          x.idea = ideaUpdate.idea
        }
      })
    })
  }

  onDeleteIdea(idea: Strategy, i: number) {
    let index = i;
    this.strategyService.deleteIdea(idea.id).subscribe(() => {
      this.ideas.splice(index, 1);
    });
  }

  dropIdeas(event: CdkDragDrop<string[]>) {
    let ideasList = [];
    ideasList = event.container.data;
    ideasList.forEach(idea => {
      if (idea.type != "idea") {
        idea.type = "idea";
        console.log("La idea para actualizar", idea)
        this.strategyService.updateidea(idea).subscribe();
      }
    });

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropStrategies(event: CdkDragDrop<string[]>) {
    let strategyList: any;
    strategyList = event.container.data;
    strategyList.forEach(idea => {
      if (idea.type != "strategy") {
        idea.type = "strategy";
        console.log("La estrategia para actualizar", idea)
        this.strategyService.updateidea(idea).subscribe();
      }
    });

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropConclusion(event: CdkDragDrop<string[]>) {
    let conclusionList = [];
    conclusionList = event.container.data;
    conclusionList.forEach(idea => {
      if (idea.type != "conclusion") {
        idea.type = "conclusion";
        console.log("La conclusion para actualizar", idea)
        this.strategyService.updateidea(idea).subscribe();
      }
    });

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}



export interface Strategy {
  id: string;
  idea: string;
  type: string;
}