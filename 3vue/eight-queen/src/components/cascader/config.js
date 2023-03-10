export const options = [
  {
    id: 'zhinan',
    name: '指南',
    parentId: 'root',
    children: [
      {
        id: 'shejiyuanze',
        name: '设计原则',
        parentId: 'zhinan',
        children: [
          {
            id: 'yizhi',
            name: '一致',
            parentId: 'shejiyuanze',
          }, {
            id: 'fankui',
            name: '反馈',
            parentId: 'shejiyuanze',
          }, {
            id: 'xiaolv',
            name: '效率',
            parentId: 'shejiyuanze',
          }, {
            id: 'kekong',
            name: '可控',
            parentId: 'shejiyuanze',
          }
        ]
      },
      {
        id: 'daohang',
        name: '导航',
        parentId: 'zhinan',
        children: [
          {
            id: 'cexiangdaohang',
            name: '侧向导航',
            parentId: 'daohang',
          }, {
            id: 'dingbudaohang',
            name: '顶部导航',
            parentId: 'daohang',
          }
        ]
      }]
  },
  {
    id: 'zujian',
    name: '组件',
    parentId: 'root',
    children: [
      {
        id: 'basic',
        name: 'Basic',
        parentId: 'zujian',
        children: [
          {
            id: 'layout',
            name: 'Layout 布局',
            parentId: 'basic'
          }, {
            id: 'color',
            name: 'Color 色彩',
            parentId: 'basic'
          }, {
            id: 'typography',
            name: 'Typography 字体',
            parentId: 'basic'
          }, {
            id: 'icon',
            name: 'Icon 图标',
            parentId: 'basic'
          }, {
            id: 'button',
            name: 'Button 按钮',
            parentId: 'basic'
          }]
      },
      {
        id: 'form',
        name: 'Form',
        parentId: 'zujian',
        children: [
          {
            id: 'radio',
            name: 'Radio 单选框',
            parentId: 'form',
          },
          {
            id: 'checkbox',
            name: 'Checkbox 多选框',
            parentId: 'form',
          }, {
            id: 'input',
            name: 'Input 输入框',
            parentId: 'form',
          }, {
            id: 'input-number',
            name: 'InputNumber 计数器',
            parentId: 'form',
          }, {
            id: 'select',
            name: 'Select 选择器',
            parentId: 'form',
          }, {
            id: 'cascader',
            name: 'Cascader 级联选择器',
            parentId: 'form',
          }, {
            id: 'switch',
            name: 'Switch 开关',
            parentId: 'form',
          }, {
            id: 'slider',
            name: 'Slider 滑块',
            parentId: 'form',
          }, {
            id: 'time-picker',
            name: 'TimePicker 时间选择器',
            parentId: 'form',
          }, {
            id: 'date-picker',
            name: 'DatePicker 日期选择器',
            parentId: 'form',
          }, {
            id: 'datetime-picker',
            name: 'DateTimePicker 日期时间选择器',
            parentId: 'form',
          }, {
            id: 'upload',
            name: 'Upload 上传',
            parentId: 'form',
          }, {
            id: 'rate',
            name: 'Rate 评分',
            parentId: 'form',
          }, {
            id: 'form',
            name: 'Form 表单',
            parentId: 'form',
          }
        ]
      },
      {
        id: 'data',
        name: 'Data',
        parentId: 'zujian',
        children: [
          {
            id: 'table',
            name: 'Table 表格',
            parentId: 'data',
          }, {
            id: 'tag',
            name: 'Tag 标签',
            parentId: 'data',
          }, {
            id: 'progress',
            name: 'Progress 进度条',
            parentId: 'data',
          }, {
            id: 'tree',
            name: 'Tree 树形控件',
            parentId: 'data',
          }, {
            id: 'pagination',
            name: 'Pagination 分页',
            parentId: 'data',
          }, {
            id: 'badge',
            name: 'Badge 标记',
            parentId: 'data',
          }
        ]
      }
    ]
  },
  {
    id: 'ziyuan',
    name: '资源',
    parentId: 'root',
    children: [
      {
        id: 'axure',
        name: 'Axure Components',
        parentId: 'ziyuan'
      }, {
        id: 'sketch',
        name: 'Sketch Templates',
        parentId: 'ziyuan'
      }, {
        id: 'jiaohu',
        name: '组件交互文档',
        parentId: 'ziyuan'
      }
    ]
  }
]
