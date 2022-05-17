<template>
    <div id="app">
        <button :disabled="started" @click="start">Start</button>
        <button :disabled="!started" @click="stop">Stop</button>
        <button :disabled="!started" @click="point">Checkpoint</button>
        <button @click="reset">Reset</button>
        {{formattedElapsedTime}}
        {{checkpoint}}
    </div>
</template>

<script>
    export default {
        name: "Stopwatch",
        data() {
            return {
                time: null,
                timer: null,
                startTime: null,
                stopTime: null,
                timer: undefined,
                started: false,
                checkpoint: []
            };
        },
        computed: {
            formattedElapsedTime() {
                let time = this.time;
                let sec = parseFloat(this.time % 60).toFixed(3);
                let minite = Math.floor(this.time / 60);
                let hour = Math.floor(this.time / 3600);

                return hour + ':' + minite + ':'+ sec;
            }
        },
        methods: {
            getTime(){
                var day = new Date();
                return day.getTime();
            },
            start() {
                this.started = true;
                this.startTime = this.getTime();
                this.timer = setInterval(() => {
                    this.time = (this.getTime() - this.startTime) / 1000;
                }, 50);

            },
            point() {
                this.checkpoint.push((this.getTime() - this.startTime) / 1000);
            },
            stop() {
                this.started = false;
                this.stopTime = this.getTime();
                clearInterval(this.timer);
            },
            reset() {
                this.elapsedTime = 0;
            }
        }
    };
</script>