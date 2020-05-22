<template>
    <div class="cr" 
        :id="'cr'+range.id" 
        :style="{background: grid}"
        @click="getClick($event)" 
        @dblclick="resetRange()">
            <div id="crBar"
                :class="{disactive: !range.isActive}" 
                :style="[{'margin-left': relativeBarPosition + '%'},{width: relativeBarLength +'%'}]">
            </div>
    </div>
</template>

<script>
export default {
    props: {
        range: { 
            type: Object,
            default: function() { return {
                id:     0,
                isActive: true,
                steps:  10,
                starts:   0,
                ends:   0,      
            }; }
        }
    },
    data() { return { 
        relativeBarPosition: 0, 
        relativeBarLength: 0, 
        grid: ''
    }; },
    created() {
        this.setUniqueID();
    },
    mounted() {             
        this.setBar(this.range.starts);
        this.setBGGrid;
    },
    computed: {
        setBGGrid() {      
            let i = (1 / this.range.steps) * 100;
            this.grid = 'repeating-linear-gradient(90deg, white, white '+i+'%, #f8f8f8 '+i+'%, #f8f8f8 '+(i*2)+'%)';
        }
    },
    methods: {
        getClick(event) {   
            let element = document.getElementById('cr'+this.range.id);   
            let length = element.clientWidth;
            let positionFromLeft = event.pageX - element.getBoundingClientRect().left;
            let clickedStep = Math.round(positionFromLeft / (length / this.range.steps));

            if (clickedStep < 0) { clickedStep = 0; } 
            if (clickedStep > this.range.steps) { clickedStep = this.range.steps; }
            this.setBar(clickedStep);
            this.setBGGrid;
        },
        setRelativeBarSize() { 
            this.relativeBarPosition = this.range.starts  / this.range.steps * 100;                 
            this.relativeBarLength = (this.range.ends-this.range.starts) / this.range.steps * 100;
        },
        setBar(clickedStep) {
            if (!this.range.isActive) {
                console.log('[component deactivated]'); 
            } else if (clickedStep > this.range.starts && this.range.ends == 0) {    
                this.range.starts = clickedStep;                  
                this.range.ends = this.range.steps;
            } else if (clickedStep < this.range.starts + ((this.range.ends-this.range.starts)/2)) {  // 1                                        
                this.range.starts = clickedStep;
            } else if (clickedStep >= this.range.starts + ((this.range.ends-this.range.starts)/2)) { // 2                     
                this.range.ends = clickedStep;                 
            } else {       
                console.log('[cr-idle-click]');
            }

            this.setRelativeBarSize();
            return;
        },
        resetRange() {    
            if (this.range.isActive) {
                this.range.starts = 0;
                this.range.ends = 0;
                this.relativeBarPosition = 0;
                this.relativeBarLength = 0;
            }
            return;
        },
        setUniqueID() {
            if (!this.range.id) {
                this.range.id = Math.round(Math.random()*10000); 
            } 
        }
    },
    watch: {
        'range.steps'() {
            this.setBGGrid;
        }     
    }
}
</script>

<style>
    .cr {
        border-width: 1px;
        border-color: #707070;
        border-style: solid;
        border-radius: 3px;
        height: 100%;
        width: 100%;
    }

    #crBar {
        background-color: #7fffd4;
        min-height: 29px;  
        font-size: 8px;
        cursor: col-resize;
    }

    #crBar.disactive {
        background-color: #d3d3d39f;
        border-width: 1px;
        border-style: solid;
        border-color: #cacaca9f;
        cursor: not-allowed;
    }

</style>