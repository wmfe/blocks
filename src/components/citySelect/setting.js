import index from './index'
index.props['settingDefinition'] = {
    setting: {
        inputIcon: {
            type: 'el-input',
            label: 'icon信息',
            require: true,
            componentData: {
                value:''
            },
        },
        inputRef: {
            type: 'el-input',
            label: '绑定字段',
            require: true,
            componentData: {
                value:''
            },
        }
    },
    computed: {
        submitData: function() {
            return {
                inputIcon: this.inputIcon.value,
                inputRef: this.inputRef.value
            }
        }
    },
    methods:{
        backFill: function(submitData) {
            this.inputIcon.value = submitData.inputIcon,
            this.inputRef.value = submitData.inputRef
        }
    }
}
export default index