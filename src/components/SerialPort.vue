<template>
    <div>
        <button v-on:click="login">Выбрать</button>
        <button v-on:click="select">Читать</button>
        <button v-on:click="close" :disabled="!open">Отключить</button>
    </div>
</template>

<script>
    const textDecoder = new TextDecoderStream();

    export default {
        name: 'SerialPort',
        data: function() {
            return {
                port: null,
                reader: null,
                readableStreamClosed: null,
                open: false
            }
        },
        methods: {
            login() {
                let self = this;
                let login = async() => {
                    if ("serial" in navigator) {
                        self.port = await navigator.serial.requestPort();
                    }
                }
                login();
            },
            select() {
                let self = this;
                let select = async() => {
                    self.open = true;
                    await self.port.open({ baudRate: 9600 });
                    self.readableStreamClosed = self.port.readable.pipeTo(textDecoder.writable);
                    self.reader = textDecoder.readable.getReader();

                    while (self.open) {
                        const { value, done } = await self.reader.read();
                        if (done) {
                            self.reader.releaseLock();
                            break;
                        }
                        // let uint8 = new Uint8Array(value);
                        console.log(value);
                    }
                }
                select();
            },
            close() {
                let self = this;
                if (this.open) {
                    this.open = false;
                    let close = async() => {
                        self.reader.cancel();
                        await self.readableStreamClosed.catch(() => { /* Ignore the error */ });
                        await self.port.close();
                    }
                    close();
                }
                
            }
        },
        mounted: function mounted() {
            this.$nextTick(function() {
                let self = this;
                navigator.serial.addEventListener("connect", async (event) => {
                    console.log('connect');
                });

                navigator.serial.addEventListener("disconnect", (event) => {
                    console.log('disconnect');
                });
            });
        }
    }
</script>
