<template>
    <div class="float-center">
        <slot></slot>
        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend input-group-sm">
                <div class="input-group-text bg-white input-group-sm">
                    Title:
                </div>
            </div>
            <input  v-model="settings.simTitle"
                    type="text" 
                    id="sim-title" 
                    class="form-control form-control-light form-control-sm text-right" 
                    maxlength="50">
        </div>
        <div class="form-group mt-1 form-sm">
            <label for="formControlRange" class="font-weight-light mb-0 mt-2">
                Duration of simulation: 
                <span  class="font-weight-bold">
                    {{ settings.daysOfSim }} days
                </span>
            </label>
            <input  v-model="settings.daysOfSim"
                    type="range"
                    id="days-of-sim"
                    class="custom-range custom-range-light my-0" 
                    min="30"
                    max="360"
                    step="15">
        </div>
        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend input-group-sm input-group-light">
                <div class="input-group-text bg-white">
                    Day zero:
                </div>
            </div>
            <input  v-model.lazy="settings.casesAtBeginning"
                    @change="settings.casesAtBeginning=changeNumber(settings.casesAtBeginning,0,1)" 
                    type="text" 
                    id="cases-at-beginning" 
                    class="form-control form-control-light form-control-sm text-right"
                    maxlength="6">
            <div class="input-group-append" id="button-addon4">
                <button @click="settings.casesAtBeginning=changeNumber(settings.casesAtBeginning,1,1)"  
                    class="btn btn-light" type="button">
                    +
                </button>
                <button @click="settings.casesAtBeginning=changeNumber(settings.casesAtBeginning,-1,1)" 
                    class="btn btn-light" type="button">
                    -
                </button>
            </div>
        </div>
        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend  input-group-sm">
                <div class="input-group-text bg-white">
                    Ro:
                </div>
            </div>
            <input  v-model.lazy="settings.reproductionNumber"
                    @change="settings.reproductionNumber=changeNumber(settings.reproductionNumber,0,0.1,20,2)" 
                    type="text" 
                    id="reproduction-number" 
                    class="form-control form-control-light form-control-sm text-right" 
                    maxlength="6">
            <div class="input-group-append" id="button-addon4">
                <button @click="settings.reproductionNumber=changeNumber(settings.reproductionNumber,0.01,0.1,20,2)"  
                    class="btn btn-light" type="button">
                    +
                </button>
                <button @click="settings.reproductionNumber=changeNumber(settings.reproductionNumber,-0.01,0.1,20,2)" 
                    class="btn btn-light" type="button">
                    -
                </button>
            </div>
        </div>
        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend input-group-sm">
                <div class="input-group-text bg-white">
                    IFR[%]:
                </div>
            </div>
            <input  v-model.lazy="settings.infectionFatalityRate" 
                    @change="settings.infectionFatalityRate=changeNumber(settings.infectionFatalityRate,0,1,100)"
                    type="text" 
                    id="ifr" 
                    class="form-control form-control-light form-control-sm text-right" 
                    maxlength="6">
            <div class="input-group-append" id="button-addon4">
                <button @click="settings.infectionFatalityRate=changeNumber(settings.infectionFatalityRate,1,1,100)"  
                    class="btn btn-light" type="button">
                    +
                </button>
                <button @click="settings.infectionFatalityRate=changeNumber(settings.infectionFatalityRate,-1,1,100)" 
                    class="btn btn-light" type="button">
                    -
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['settings'],
    methods: {
        changeNumber(num, addToNum, minNum=0, maxNum=0, decimalPlaces=0) {
            const multiplier = Math.pow(10, decimalPlaces);
            num = Number(num);
            if (isNaN(num)) { 
                num = minNum; 
            }
            num += addToNum;
            if (num < minNum) { 
                num = minNum; 
            }
            if (maxNum && (num > maxNum)) { 
                num = maxNum; 
            }
            return Math.round(num*multiplier)/multiplier;
        }
    }   
}
</script>

<style>
.custom-range::-webkit-slider-thumb {
  background: aquamarine;
}
.custom-range::-moz-range-thumb {
  background: aquamarine;
}
.custom-range::-ms-thumb {
  background: aquamarine;
}
</style>