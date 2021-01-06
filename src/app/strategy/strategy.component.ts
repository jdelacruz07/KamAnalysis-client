import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subject } from 'rxjs';
import { StrategyService } from '../strategy.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
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
      let idea: strategy = { id: undefined, idea: undefined };
      let newIdea: any = x;
      idea.idea = newIdea;
      this.addIdea(idea), () => console.log("Error "), () => console.log("Terminado")
    });
    this.getIdeas();
  }

  inputUpdate(id, idea) {
    let newIdea: strategy = { id: undefined, idea: undefined };
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

  onDeleteIdea(idea: strategy) {
    this.strategyService.deleteIdea(idea.id).subscribe(() => {
      this.getIdeas();
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
    let response;
    this.strategyService.getIdeas().subscribe(resp => {
      response = resp.body
      this.ideas = response.content;
      let numberOfIdeas = response.totalElements;
      console.log("Numero de ideas ", numberOfIdeas);
    });

  }

  drop(event: CdkDragDrop<string[]>) {
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
}