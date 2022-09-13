<script>
import {currentWorkout, currentWorkoutTracker} from "../stores"

  let isPaused = false
  let countdown = 5
  // $currentWorkout.rest_timer
  let toggle = true
  let timer;
  $: {
    if (countdown === 0) {
      console.log($currentWorkoutTracker.currentSet +1,"<<<<<<<1" );
      console.log($currentWorkout.exercises[$currentWorkoutTracker.currentExercise].NumberOfSets,"sets");
      if ($currentWorkoutTracker.currentSet +1 < $currentWorkout.exercises[$currentWorkoutTracker.currentExercise].NumberOfSets) {


        if (timer) {
          console.log($currentWorkoutTracker,"increasing set");
          $currentWorkoutTracker.currentSet +=1
          ////// line 19 changes code back to default timer.. should pull value down not 5
          countdown = 5 
         
        }
      } else {
        console.log( $currentWorkoutTracker.currentExercise,"changing workout");
        $currentWorkoutTracker.currentExercise +=1
        $currentWorkoutTracker.currentSet = 0
        countdown = 5 
         
        //  clearInterval(timer);
        //  timer = null;
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