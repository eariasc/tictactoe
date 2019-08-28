import { Component, OnInit } from '@angular/core';
import { Question } from './models/question';
import { TictacToeService } from './services/tictac-toe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tictac-toe';
  questions: Array<Question>;
  questionToShow: Question = { sentence: '', options: null, correctAnswer: '' };
  winCombinations: Array<string> = ["123", "456", "789", "147", "369", "159", "357"];
  tictacBoard: Array<any> = [];
  answerSelected: string;
  chances: number = 3;
  currentSquare: any;
  displayAlert: boolean = false;
  winner: boolean = false;
  randomNumber: number = 0;

  constructor(private tictacService: TictacToeService) {
  }

  ngOnInit() {
    //Get all question from server
    this.getAllQuestions();
  }

  getAllQuestions() {
    //Initialize all question and tic tac toe board
    //this.questions = this.tictacService.getAllQuestions();
    this.tictacService.getAllQuestions().subscribe((data:any) => {
      this.questions = data;
    });
    
    this.tictacBoard = [
      { square: "1", icon: null },
      { square: "2", icon: null },
      { square: "3", icon: null },
      { square: "4", icon: null },
      { square: "5", icon: null },
      { square: "6", icon: null },
      { square: "7", icon: null },
      { square: "8", icon: null },
      { square: "9", icon: null }
    ]
  }

  clickCell(event) {
    //Initialize alert and chances each time you clicked on a cell of the tic tac board
    this.displayAlert = false;
    this.chances = 3;

    //Save the cell that you clicked
    this.currentSquare = this.tictacBoard.find((element) => {
      return element.square === event.target.id;
    })

    //If the cell didn't click yet, gets a Radom Question
    if (this.currentSquare.icon === null) {
      this.getRandomQuestion();
      this.openModal('questionModal');
    }
  }

  getRandomQuestion() {
    //Get the length of the question got from the server
    let maxLength = this.questions.length - 1;

    //Generate a random number between 1 and the length of the questions array
    this.randomNumber = Math.floor((Math.random() * maxLength) + 1);

    //Check if the question exists
    if (this.questions[this.randomNumber] === undefined) {
      this.randomNumber -= 1;
    }

    //Select the question to show by the index based on the random number
    this.questionToShow = this.questions[this.randomNumber];
  }

  openModal(idModal: string) {
    document.getElementById('blockPage').style.display = 'block';
    document.getElementById(idModal).style.display = 'block';
  }

  closeModal(idModal: string) {
    document.getElementById('blockPage').style.display = 'none';
    document.getElementById(idModal).style.display = 'none';
  }

  selectAnswer(event) {
    //Delete css class "selected-answer" from the options
    for (let i = 0; i < document.getElementsByClassName('option-select').length; i++) {
      document.getElementsByClassName('option-select')[i].classList.remove("selected-answer");
    }
    //Add the css class "selected-answer" to the element that you are selecting as the answer
    event.target.classList.add("selected-answer");

    //Save the text of you selected answer
    this.answerSelected = event.target.textContent;
  }

  submitAnswer() {
    //Check if the answer you selected before is equal to the correct answer of the question showed
    if (this.questionToShow.correctAnswer === this.answerSelected) {

      //Update tictac board adding the correct answer icon
      this.updateTicTacBoard("o");

      this.closeModal('questionModal');
      //Delete the question from the question Array to avoid showing the question twice
      this.questions.splice(this.randomNumber, 1);

      //Check if your good answers match with the possible winners combination
      if (this.checkGoodAnswersCombinations("o")) {
        this.winner = true;
        this.openModal('gameOverModal');
      }
    } else {
      //Delete one chance of your current chances left.
      this.chances -= 1;
      this.displayAlert = true;

      if (this.chances === 0) {
        //Update tictac board adding the wrong answer icon
        this.updateTicTacBoard("x");

        //Delete the question from the question Array to avoid showing the question twice
        this.questions.splice(this.randomNumber, 1);
        this.closeModal('questionModal');

        //Check if your wrong answers match with the possible losers combination
        if (this.checkGoodAnswersCombinations("x")) {
          this.winner = false;
          this.openModal('gameOverModal');
        }
      }
    }
  }

  //Reset the game in case you fail
  resetGame() {
    this.closeModal('questionModal');
    this.closeModal('gameOverModal');
    this.ngOnInit();
  }


  updateTicTacBoard(icon) {
    //Add the respective icon wether if the answer is good or wrong and 
    //update the array with the updated fields in this specific case the icon field
    this.tictacBoard = this.tictacBoard.map((element) => {
      if (element.square === this.currentSquare.square) {
        element.icon = icon;
      }
      return element;
    });
  }


  checkGoodAnswersCombinations(icon: string) {
    //Check if you have one of the possible winners or losers combinations, it dependes of what icon are you checking for
    let combination1: number = 0, combination2: number = 0, combination3: number = 0, combination4: number = 0, combination5: number = 0, combination6: number = 0, combination7: number = 0, combination8: number = 0;

    for (let i = 0; i < this.tictacBoard.length; i++) {
      if (this.tictacBoard[i].square === "1" && this.tictacBoard[i].icon === icon) {
        combination1 += 1;
      } else if (this.tictacBoard[i].square === "2" && this.tictacBoard[i].icon === icon) {
        combination1 += 1;
      } else if (this.tictacBoard[i].square === "3" && this.tictacBoard[i].icon === icon) {
        combination1 += 1;
      }

      if (this.tictacBoard[i].square === "4" && this.tictacBoard[i].icon === icon) {
        combination2 += 1;
      } else if (this.tictacBoard[i].square === "5" && this.tictacBoard[i].icon === icon) {
        combination2 += 1;
      } else if (this.tictacBoard[i].square === "6" && this.tictacBoard[i].icon === icon) {
        combination2 += 1;
      }


      if (this.tictacBoard[i].square === "7" && this.tictacBoard[i].icon === icon) {
        combination3 += 1;
      } else if (this.tictacBoard[i].square === "8" && this.tictacBoard[i].icon === icon) {
        combination3 += 1;
      } else if (this.tictacBoard[i].square === "9" && this.tictacBoard[i].icon === icon) {
        combination3 += 1;
      }

      if (this.tictacBoard[i].square === "1" && this.tictacBoard[i].icon === icon) {
        combination4 += 1;
      } else if (this.tictacBoard[i].square === "4" && this.tictacBoard[i].icon === icon) {
        combination4 += 1;
      } else if (this.tictacBoard[i].square === "7" && this.tictacBoard[i].icon === icon) {
        combination4 += 1;
      }

      if (this.tictacBoard[i].square === "2" && this.tictacBoard[i].icon === icon) {
        combination5 += 1;
      } else if (this.tictacBoard[i].square === "5" && this.tictacBoard[i].icon === icon) {
        combination5 += 1;
      } else if (this.tictacBoard[i].square === "8" && this.tictacBoard[i].icon === icon) {
        combination5 += 1;
      }

      if (this.tictacBoard[i].square === "3" && this.tictacBoard[i].icon === icon) {
        combination6 += 1;
      } else if (this.tictacBoard[i].square === "6" && this.tictacBoard[i].icon === icon) {
        combination6 += 1;
      } else if (this.tictacBoard[i].square === "9" && this.tictacBoard[i].icon === icon) {
        combination6 += 1;
      }

      if (this.tictacBoard[i].square === "1" && this.tictacBoard[i].icon === icon) {
        combination7 += 1;
      } else if (this.tictacBoard[i].square === "5" && this.tictacBoard[i].icon === icon) {
        combination7 += 1;
      } else if (this.tictacBoard[i].square === "9" && this.tictacBoard[i].icon === icon) {
        combination7 += 1;
      }

      if (this.tictacBoard[i].square === "3" && this.tictacBoard[i].icon === icon) {
        combination8 += 1;
      } else if (this.tictacBoard[i].square === "5" && this.tictacBoard[i].icon === icon) {
        combination8 += 1;
      } else if (this.tictacBoard[i].square === "7" && this.tictacBoard[i].icon === icon) {
        combination8 += 1;
      }

    }


    if (combination1 === 3 || combination2 === 3 || combination3 === 3 || combination4 === 3 || combination5 === 3 || combination6 === 3 || combination7 === 3 || combination8 === 3) {
      //If it's true that means you have one of the combinations, remember if you are checking the good answers you win
      //if not you lose, it dependes what icon are you checking for
      return true;
    } else {

      //If it's false, you don't have any combination yet, so you continue with the game
      return false
    }
  }

}
