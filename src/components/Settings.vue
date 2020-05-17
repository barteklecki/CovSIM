<template>
    <div class="float-center">
        <slot></slot>

        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend  input-group-sm">
                <div class="input-group-text bg-white input-group-sm">Title:</div>
            </div>
            <input type="text" id="title" class="form-control form-control-light form-control-sm" aria-describedby="title-help">
        </div>

        <!-- <small id="title-help" class="form-text text-muted">
            Title describing current simulation
        </small> -->

        <div class="form-group mt-1 form-sm">
            <label for="formControlRange">Days of simulation: <span>{{ set.days }}</span></label>
            <input v-model.lazy="set.days" type="range" class="custom-range custom-range-light mt-0" min="30" max="360" :step="15" id="rangeDays">
        </div>

        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend input-group-sm input-group-light">
                <div class="input-group-text bg-white">Day zero:</div>
            </div>
            <input v-model.lazy="set.dayZero" type="text" id="dayzero" class="form-control form-control-light form-control-sm text-right" aria-describedby="title-help">
            <div class="input-group-append" id="button-addon4">
                <button @click="set.dayZero += 1" class="btn btn-light" type="button">+</button>
                <button @click="set.dayZero -= 1" class="btn btn-light" type="button">-</button>
            </div>
        </div>

        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend  input-group-sm">
                <div class="input-group-text bg-white">Ro:</div>
            </div>
            <input v-model.lazy="set.ro" type="text" id="ro" class="form-control form-control-light form-control-sm text-right" aria-describedby="title-help">
                        <div class="input-group-append" id="button-addon4">
                <button @click="set.ro += 0.01" class="btn btn-light" type="button">+</button>
                <button @click="set.ro -= 0.01" class="btn btn-light" type="button">-</button>
            </div>
        </div>

        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend input-group-sm">
                <div class="input-group-text bg-white">IFR[%]:</div>
            </div>
            <input v-model.lazy="set.ifr" type="text" id="ifr" class="form-control form-control-light form-control-sm text-right" aria-describedby="title-help">
                        <div class="input-group-append" id="button-addon4">
                <button @click="set.ifr += 1" class="btn btn-light" type="button">+</button>
                <button @click="set.ifr -= 1" class="btn btn-light" type="button">-</button>
            </div>
        </div>

        <label for="linlog" class="mt-1">Chart Y-axis:</label>
        <div id="linlog" class="btn-group btn-group-toggle btn-block" data-toggle="buttons" aria-describedby="linlog-help">
            <label class="btn btn-outline-light btn-sm active">
                <input type="radio" name="options" id="lin" autocomplete="off" checked> Linear
            </label>
            <label class="btn btn-outline-light btn-sm">
                <input type="radio" name="options" id="log" autocomplete="off"> Logarytmic
            </label>
        </div>
        <!-- <small id="linlog-help" class="form-text text-muted">
            Chart Y-axis representation
        </small> -->
    </div>
</template>

<script>
export default {
    props: ['set']   
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