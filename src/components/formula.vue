<!-- @format -->

<template>
    <rich-text
        class="formula-wrap formula-class"
        :nodes="formulaDom"
    ></rich-text>
</template>

<script>
export default {
    name: 'formula',
    props: {
        formula: {
            type: String,
            default: 'm^2'
        }
    },
    data() {
        return {
            formulaDom: []
        };
    },
    watch: {
        formula() {
            this._refresh();
        }
    },
    mounted() {
        this._refresh();
    },
    methods: {
        _refresh: function () {
            // 默认节点
            let dom = {
                name: 'div',
                attrs: {
                    class: 'formula'
                },
                children: []
            };

            let addChar = function (c, type) {
                // 子节点为空或者最后一个子节点类型不一样时，创建对应的新节点
                if (
                    dom.children.length === 0 ||
                    dom.children[dom.children.length - 1].name !== type
                ) {
                    dom.children.push({
                        name: type,
                        attrs: {
                            class: type
                        },
                        children: [
                            {
                                type: 'text',
                                text: ''
                            }
                        ]
                    });
                }

                // 添加字符到最后一个子节点
                dom.children[dom.children.length - 1].children[0].text += c;
            };

            let formula = this.formula;
            if (formula) {
                for (let i = 0; i < formula.length; i++) {
                    let c = formula.charAt(i);
                    switch (c) {
                        case '_':
                            addChar(formula.charAt(++i), 'sub');
                            break;
                        case '^':
                            addChar(formula.charAt(++i), 'sup');
                            break;
                        default:
                            addChar(c, 'span');
                            break;
                    }
                }
            }

            this.formulaDom = [dom];
        }
    }
};
</script>

<style>
.formula-wrap {
    display: inline-block;
}
</style>
