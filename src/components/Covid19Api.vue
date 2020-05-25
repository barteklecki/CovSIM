<template>
    <div @click="covGet">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataContainer: []
        }
    },
    methods: {
        covGet() {
            this.$http.get('https://api.covid19api.com/summary')
                .then(response => { 
                    console.log('RES: ' + response);
                    return response.json();
                })
                .then(data => { 
                    this.dataContainer = data;
                    console.log('DATA: ' + this.dataContainer);
                });
        }
    }
}
</script>

<style>

</style>