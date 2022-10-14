<template>
    <div class="p-20">
        <div class="font-30 font-weight-bold color-danger">style</div>
        <div class="flex-ju-al-center">
            <div class="border-light mr-20" style="width: 100px; height: 100px;">边框样式</div>
            <div class="border-light bg-success color-white mr-20" style="width: 100px; height: 100px;">背景样式</div>
            <div class="border-light bg-dark color-white mr-20" style="width: 100px; height: 100px;">背景样式</div>
            <div class="border-light p-20 mr-20 box-sizing" style="width: 100px; height: 100px;">内边距样式</div>
            <div class="border-light cursor-pointer mr-20" style="width: 100px; height: 100px;">鼠标指针样式</div>
            <div class="border-light radius-50 flex-al-center text-align-center" style="width: 100px; height: 100px;">边框样式</div>
            <div class="cursor-not-allowed font-12" style="width: 400px">1234</div>
        </div>
<!--        <css-ni-hong-deng></css-ni-hong-deng>-->
<!--        <gu-jia-pin></gu-jia-pin>-->
    </div>
</template>

<script>
import cssNiHongDeng from './cssNiHongDeng';
import guJiaPin from './guJiaPin';
export default {
    name: 'style-test',
    components: { cssNiHongDeng, guJiaPin }
};
</script>
