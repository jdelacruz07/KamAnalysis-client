import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subject } from 'rxjs';
import { StrategyService } from '../strategy.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css'],
})
export class StrategyComponent implements OnInit {
  inputChange$ = new Subject;
  newIdea: any;
  ideaForUpdate: any;
  ideas: strategy[] = [];
  strategies: strategy[] = [];
  conclusion: strategy[] = [];
  ideaEdit: boolean = true;
  idEdit: number;

  constructor(private strategyService: StrategyService) { }

  ngOnInit(): void {
    this.inputChange$.pipe(debounceTime(2000)).subscribe(x => {
      let idea: strategy = { id: undefined, idea: undefined, type: undefined };
      let newIdea: any = x;
      idea.idea = newIdea;
      this.addIdea(idea), () => console.log("Error "), () => console.log("Terminado")
    });
    this.getIdeas();
  }

  inputUpdate(id, idea) {
    let newIdea: strategy = { id: undefined, idea: undefined, type: undefined };
    newIdea.id = id;
    newIdea.idea = idea;
    this.strategyService.updateidea(newIdea).subscribe((ideaUpdate) => {
      this.ideaEdit = false;
      this.ideas.forEach((x: strategy) => {
        if (x.id == ideaUpdate.id) {
          x.idea = ideaUpdate.idea
        }
      })
    })
  }

  onDeleteIdea(idea: strategy, i: number) {
    let index = i;
    this.strategyService.deleteIdea(idea.id).subscribe(() => {
      this.ideas.splice(index, 1);
    });
  }

  inputChange($event) {
    this.inputChange$.next($event);
  }

  addIdea(idea) {
    this.strategyService.addStrategy(idea).subscribe((x: strategy) => {
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



export interface strategy {
  id: string;
  idea: string;
  type: string;
}