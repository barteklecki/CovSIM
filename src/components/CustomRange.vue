<template>
    <div class="ms" 
        :id="'ms'+val.id" 
        :style="{background: grid}"
        @click="getClick($event)" 
        @dblclick="resetBar()">
            <div id="msBar"
                :class="{disactive: !val.active}" 
                :style="[{'margin-left': relA + '%'},{width: relAB +'%'}]">
            </div>
    </div>
</template>

<script>
export default {
    props: {
        val: { 
            type: Object,
            default: function() { return {
                id:     0,     // unique identifier
                active: true,  // component is active
                steps:  10,    // number of discrete steps
                valA:   0,     // bar starting point
                valB:   0,     // bar ending point
                min:    0,     // lower value limiter (0=no limit)
                max:    0      // upper value limiter (0=no limit)
            }; }
        }
    },
    data() { return { 
        relA:    0,             // bar starting relative in %
        relAB:   0,             // bar lenght   relative in %
        grid:    ''             // placeholder for bg grid string
    }; },
    mounted() {             
        this.setBar(this.val.valA);
        this.getBGGrad;
    },
    computed: {
        getBGGrad() {      
            let i = (1 / this.val.steps) * 100;
            this.grid = 'repeating-linear-gradient(90deg, white, white '+i+'%, #f8f8f8 '+i+'%, #f8f8f8 '+(i*2)+'%)';
        }
    },
    methods: {
        getClick(event) {   
            let el = document.getElementById('ms'+this.val.id);   
            let length = el.clientWidth;
            let pos = event.pageX - el.getBoundingClientRect().left;
            let step = Math.round(pos / (length / this.val.steps));
            if (this.val.min && step < this.val.min) { step = this.val.min; } 
            if (this.val.max && step > this.val.max) { step = this.val.max; }
            this.setBar(step);
            this.getBGGrad;
        },
        setData() { 
            this.relA  = this.val.valA  / this.val.steps * 100;                 
            this.relAB = (this.val.valB-this.val.valA) / this.val.steps * 100;
        },
        setBar(step) {
            if (!this.val.active) {
                console.log('[component deactivated]'); 
            } else if (step > this.val.valA && this.val.valB == 0) {    
                this.val.valA  = step;                  
                this.val.valB = this.val.steps;
            } else if (step < this.val.valA + ((this.val.valB-this.val.valA)/2)) {  // 1                                        
                this.val.valA = step;
            } else if (step >= this.val.valA + ((this.val.valB-this.val.valA)/2)) { // 2                     
                this.val.valB = step;                 
            } else {       
                console.log('[ms-idle-click]');
            }
            this.setData();
            if (!this.val.id) {
                this.val.id = Math.round(Math.random()*10000); 
            } 
            return;
        },
        resetBar() {    
            if (this.val.active) {
                this.val.valA = 0;
                this.val.valB = 0;
                this.relA     = 0;
                this.relAB    = 0;
            }
            return;

        }
    },
    watch: {
        'val.steps':function() {
            this.getBGGrad;
        }     
    }
}
</script>

<style>
    .ms {
        border-width: 1px;
        border-color: #707070;
        border-style: solid;
        border-radius: 3px;
        height: 100%;
        width: 100%;
    }

    #msBar {
        background-color: #7fffd4;
        min-height: 29px;  
        font-size: 8px;
        cursor: col-resize;
    }

    #msBar.disactive {
        background-color: #d3d3d39f;
        border-width: 1px;
        border-style: solid;
        border-color: #cacaca9f;
        cursor: not-allowed;
    }

</style>