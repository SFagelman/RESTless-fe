<script>
import {currentWorkout, currentWorkoutTracker} from "../stores"

  let isPaused = false
  let countdown = 2
  // $currentWorkout.rest_timer
  let toggle = true
  let timer;
  $: {
    if (countdown === 0) {
    
        if ($currentWorkoutTracker.currentSet +1 < $currentWorkout.exercises[$currentWorkoutTracker.currentExercise].NumberOfSets) {
  
  
          if (timer) {
            $currentWorkoutTracker.currentSet +=1
            countdown = 2 
           
          }
        } else if($currentWorkoutTracker.currentExercise +1 < $currentWorkout.exercises.length) {
          $currentWorkoutTracker.currentExercise +=1
          $currentWorkoutTracker.currentSet = 0
          countdown = 2 
          isPaused = !isPaused
           
        } else { 
          clearInterval(timer); 
          timer = null; 
      }
      
   }
  }
function handleClick() {
      toggle = false
       timer = setInterval(() => {
      if(!isPaused)
            countdown -= 1;
            
    }, 1000);
;
}

    function play(){
        isPaused = false
    }
        function pause(){
        isPaused = true
    }
    
</script> 

<style>

  
</style>

<div class="basic">
    {#if toggle}
    <button  on:click|once={handleClick} >Start</button>
    {:else}	
    <button on:click={play}>Resume</button>
    {/if}
    <button on:click={pause}>Pause</button>
<h1>
    {countdown}
</h1>
  
  




</div>