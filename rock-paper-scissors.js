let score = JSON.parse(localStorage.getItem('score'));//||{w:1};
    if(score === null){
      score = {
        Wins:0,
        Losses:0,
        Ties:0
      }
    }
    
   
    function pickComputerMove(){
      let computerMove = '';
      const randomNumber= Math.random();
      if (randomNumber>=0&&randomNumber<1/3){
        computerMove = 'Rock';
      }
      else if (randomNumber>=1/3&&randomNumber<2/3){
        computerMove = 'Paper';
      }
      else if (randomNumber>=2/3&&randomNumber<1){
        computerMove = 'Scissors';
      }
      return computerMove;
    }


    document.body.addEventListener('keydown',(event)=>{
      if(event.key==='r'){
        playGame('Rock');
      }
      else if(event.key==='p'){
        playGame('Paper');
      }
      else if(event.key==='s'){
        playGame('Scissors');
      }

    });

    function playGame(playerMove){
      const computerMove = pickComputerMove();
      let result ='';
      if(playerMove==='Scissors'){
        if(computerMove ==='Rock'){
          result = 'You lose';
        }
        else if(computerMove ==='Paper'){
          result = 'You win';
        }
        else if(computerMove ==='Scissors'){
          result = 'Tie';
        }
      }
      else if(playerMove==='Rock'){
        if(computerMove ==='Rock'){
          result = 'Tie';
        }
        else if(computerMove ==='Paper'){
          result = 'You lose';
        }
        else if(computerMove ==='Scissors'){
          result = 'You win';
        }
      }
      else if(playerMove==='Paper'){
        if(computerMove ==='Rock'){
          result = 'You win';
        }
        else if(computerMove ==='Paper'){
          result = 'Tie';
        }
        else if(computerMove ==='Scissors'){
          result = 'You lose';
        }
      }

      if(result ==='You win'){
        score.Wins += 1 ;
      }
      else if(result ==='Tie'){
        score.Ties += 1 ;
      }
      else if(result ==='You lose'){
        score.Losses +=1 ;
      }

      localStorage.setItem('score',JSON.stringify(score));

      document.querySelector('.moves').innerHTML=`🚨 Your move is <img src = "${playerMove}-emoji.png" class="move-icon"> and computer move is <img src = "${computerMove}-emoji.png" class="move-icon"> `

      document.querySelector('.resultCurrent').innerHTML=`Result = ${result}`; 

      updateScoreElement();
  
     /* alert(`🚨 Your move is ${playerMove} and computer move is ${computerMove}. 
      Result = ${result} 
      Total-Wins: ${score.Wins}
      Total-Loses: ${score.Losses}
      Total-Ties: ${score.Ties}`); */
    }
    function updateScoreElement(){
      document.querySelector('.scoreTotal').innerHTML=` 
      Total-Wins: ${score.Wins}
      Total-Loses: ${score.Losses}
      Total-Ties: ${score.Ties}`;
    }

    let isAutoPlay = false;
    let intervalId;

    function autoPlay(){
      if(!isAutoPlay){
        intervalId = setInterval(function(){
          const playerMove = pickComputerMove();
          playGame(playerMove);
        },1000);
        isAutoPlay = true;
      }
      else{
        clearInterval(intervalId);
        isAutoPlay = false;
      }
      
    }
    document.querySelector('.js-rock-button').addEventListener('click',()=>{
      playGame('Rock');
    });
    document.querySelector('.js-paper-button').addEventListener('click',()=>{
      playGame('Paper');
    }); 
    document.querySelector('.js-scissors-button').addEventListener('click',()=>{
      playGame('Scissors');
    });  