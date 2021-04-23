<script src="../../../../../Downloads/tampermonkey-backup-chrome-2021-04-20T02-50-38-681Z/baidu.com.user.js"></script>
<template>
    <div>
        <WaterMark text="水印：zhangsan"></WaterMark>
    </div>
</template>

<script>
    import WaterMark from "./components/WaterMark";
    export default {
        name: "App",
        components: {
            WaterMark
        }
    }
</script>
