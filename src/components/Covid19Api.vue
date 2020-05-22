<template>
    <div @click="covGet">
        <slot></slot> [data]
    </div>
</template>

<script>
export default {
    data() {
        return {
            obj: []
        }
    },
    methods: {
        covGet() {
            this.$http.get('https://api.covid19api.com/summary')
                .then(response => { 
                    console.log('RES: '+response);
                    return response.json();
                })
                .then(data => { 
                    this.obj = data;
                    console.log('DATA: '+data);
                    console.log('OBJ: '+this.obj);
                });
        }
    }
}
</script>

<style>

</style>