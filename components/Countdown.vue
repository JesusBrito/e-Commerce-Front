<template>
    <div class="block">
        <div class="block">
            <p class="digit">{{ Math.trunc(minutes) }}</p>
            <p class="text">Minutes</p>
        </div>
        <div class="block">
            <p class="digit">{{ Math.trunc(seconds) }}</p>
            <p class="text">Seconds</p>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            now:0,
            count:0,
            date: new Date(),
            dateRef: new Date()
        }
    },
    methods:{
        timer_loop(){
            this.count++
            this.now = Math.trunc(new Date().getTime()/1000)
            console.log("Date 5 minutes "+ this.date)
            this. dateRef= new Date()
            if(this.dateRef.getTime()<=this.date.getTime()){
                this.count <200 && setTimeout(this.timer_loop,1000) 
            }else{
                alert('Limpiar localStorage')
            }
            
        }
    },
    created: function(){
        this.date.setMinutes(this.date.getMinutes()+1)
        this.timer_loop()
    },
    computed: {
        seconds() {
            return (this.modifiedDate - this.now) % 60;
        },

        minutes() {
            return ((this.modifiedDate - this.now) / 60) % 60;
        },

        hours() {
            return ((this.modifiedDate) / 60 / 60) % 24;
        },

        days() {
            return ((this.modifiedDate) / 60 / 60 / 24);
        },
        modifiedDate:function(){
            return Math.trunc(Date.parse(this.date)/1000)
        }
    }
}
</script>



<style>

</style>
