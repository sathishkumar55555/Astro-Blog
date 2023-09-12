<script lang='ts'>
    import { LondonData } from "./population_london";
    
    const data = LondonData.filter(_=>_.Year == 2023)
    const density = data.map(_=>_.Population_per_square_kilometre)

  
    let scaleFactor = 200
    $: scaling = Math.max(...density) / scaleFactor
    $: heightArray = data.map(_=>_.Population_per_square_kilometre / scaling)
    $: maxHeight = Math.max(...heightArray)*1.1   

    let barwidth = 1500
    $: width = data.length * barwidth / 100
    

    let selectionIndex = 8
    $: selectedDensity = density[selectionIndex]

    function activateSelection(number){
        selectionIndex = number
    }
</script>

<h1>London Population Data 2023</h1>
<div id='flexbox'>
    
    <div>
        <svg width={data.length * barwidth / 100} height={maxHeight} >
            <g >
                {#each data as d,i}
                <rect  height={d.Population_per_square_kilometre / scaling} y={maxHeight - d.Population_per_square_kilometre / scaling} width={barwidth/100*0.8}  x={(i * barwidth / 100 * 1)} fill={(i == selectionIndex)? "black": "grey"} on:click={()=>{return activateSelection(i)}} on:keydown={()=>{}}></rect>
                {/each}
            </g>
        </svg>
    </div>
   
</div>


<style>
h1 {
    text-align: center;
}
div {
    margin: 0 15px 0 0;
}

rect {
    cursor: pointer;
}

#flexbox {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>