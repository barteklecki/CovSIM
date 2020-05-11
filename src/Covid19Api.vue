<template>
    <div>
        <slot></slot> {{ str}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            obj: [],
            str: ''
        }
    },
    methods: {
        covGet() {
            this.$http.get('https://api.covid19api.com/summary')
                .then(response => { return response.json();})
                .then(data => { this.obj = data });
            //console.log(this.obj.Global.TotalConfirmed);
            console.log(this.obj);
            console.log(this.obj.ok);
            if (!this.obj.ok) {
                console.log('[HTTP-ERR: Too Many Requests]');
                this.str = '[HTTP-ERR: Too Many Requests]';
            } else {
                console.log(this.obj);
            }
        // then(data => console.log(data.Global.TotalConfirmed));
        }
    },
    created() {
        //this.covGet();

    }
}
</script>

<style>

</style>