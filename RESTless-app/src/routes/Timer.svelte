
<script>
    import {currentWorkout} from "../stores"
    
      let isPaused = false
      let countdown = $currentWorkout.rest_timer
      let toggle = true
      let timer;
      $: {
        if (countdown === 0) {
          if (timer) {
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