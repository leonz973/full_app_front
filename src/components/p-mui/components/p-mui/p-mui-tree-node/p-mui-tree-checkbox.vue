<!-- @format -->

<template>
    <view @click.stop="">
        <u-checkbox
            @change="handleChange"
            v-model="value"
            :disabled="disabled"
        ></u-checkbox>
    </view>
</template>

<script>
export default {
    data() {
        return {
            value: false
        };
    },

    props: {
        type: {
            type: String,
            validator(t) {
                return t === 'radio' || t === 'checkbox';
            }
        },
        checked: Boolean,
        disabled: Boolean,
        indeterminate: Boolean
    },
    watch: {
        checked(checked) {
            this.value = checked;
        }
    },
    mounted() {
        this.value = this.checked;
    },
    methods: {
        handleChange() {
            this.$emit('check', this.value);
        }
    }
};
</script>

<style></style>
