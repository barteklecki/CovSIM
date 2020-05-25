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
                    @change="settings.casesAtBeginning=changeNumber({ num: settings.casesAtBeginning,
                                                                        addToNum: 0,
                                                                        minNum: 1,
                                                                        maxNum: 1000 })" 
                    type="text" 
                    id="cases-at-beginning" 
                    class="form-control form-control-light form-control-sm text-right"
                    maxlength="6">
            <div class="input-group-append" id="button-addon4">
                <button @click="settings.casesAtBeginning=changeNumber({ num: settings.casesAtBeginning,
                                                                        addToNum: 1,
                                                                        minNum: 1,
                                                                        maxNum: 1000 })"
                    class="btn btn-light">
                    +
                </button>
                <button @click="settings.casesAtBeginning=changeNumber({ num: settings.casesAtBeginning,
                                                                        addToNum: -1,
                                                                        minNum: 1,
                                                                        maxNum: 1000 })"
                    class="btn btn-light">
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
                    @change="settings.reproductionNumber=changeNumber({ num: settings.reproductionNumber,
                                                                        addToNum: 0,
                                                                        minNum: 0.01,
                                                                        maxNum: 20,
                                                                        decimalPlaces: 2 })"
                    type="text" 
                    id="reproduction-number" 
                    class="form-control form-control-light form-control-sm text-right" 
                    maxlength="6">
            <div class="input-group-append" id="button-addon4">
                <button @click="settings.reproductionNumber=changeNumber({ num: settings.reproductionNumber,
                                                                        addToNum: 0.01,
                                                                        minNum: 0.01,
                                                                        maxNum: 20,
                                                                        decimalPlaces: 2 })"  
                    class="btn btn-light">
                    +
                </button>
                <button @click="settings.reproductionNumber=changeNumber({ num: settings.reproductionNumber,
                                                                        addToNum: -0.01,
                                                                        minNum: 0.01,
                                                                        maxNum: 20,
                                                                        decimalPlaces: 2 })" 
                    class="btn btn-light">
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
                    @change="settings.infectionFatalityRate=changeNumber({ num: settings.infectionFatalityRate,
                                                                            addToNum: 0,
                                                                            minNum: 1,
                                                                            maxNum: 99 })"
                    type="text" 
                    id="ifr" 
                    class="form-control form-control-light form-control-sm text-right" 
                    maxlength="6">
            <div class="input-group-append" id="button-addon4">
                <button @click="settings.infectionFatalityRate=changeNumber({ num: settings.infectionFatalityRate,
                                                                            addToNum: 1,
                                                                            minNum: 1,
                                                                            maxNum: 99 })"  
                    class="btn btn-light">
                    +
                </button>
                <button @click="settings.infectionFatalityRate=changeNumber({ num: settings.infectionFatalityRate,
                                                                            addToNum: -1,
                                                                            minNum: 1,
                                                                            maxNum: 99 })" 
                    class="btn btn-light">
                    -
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        settings: {
            simTitle:               { type: String, default: '' },  
            daysOfSim:              { type: Number, default: 30 },  
            casesAtBeginning:       { type: Number, default: 10 }, 
            reproductionNumber:     { type: Number, default: 0.5 },
            incubationPeriod:       { type: Number, default: 1 },   
            hospitalisationPeriond: { type: Number, default: 1 },
            infectionFatalityRate:  { type: Number, default: 10 } 
        }
    },
    methods: {
        changeNumber({num, addToNum, minNum = 0, maxNum = 0, decimalPlaces = 0}) {
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
            return Math.round(num * multiplier) / multiplier;
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