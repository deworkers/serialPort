<template>
    <SerialPort></SerialPort>
    <Stopwatch></Stopwatch>
</template>

<script>
    import SerialPort from './components/SerialPort.vue';
    import Stopwatch from './components/Stopwatch.vue';

    export default {
        name: 'App',
        data: function() {
            return {
                
            }
        },
        components: {
            SerialPort,
            Stopwatch
        },
        computed: {
        },
        methods: {
            
        },
        mounted: function mounted() {
            
        }
    }
</script>
