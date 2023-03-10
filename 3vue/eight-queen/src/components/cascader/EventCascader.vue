<template>
  <el-cascader
    ref="cascader"
    v-model="eventType"
    :options="getAllEventTypes"
    :show-all-levels="showAllLevels"
    :disabled="disabled"
    clearable
    :props="{
      value: 'id',
      label: 'name',
      children: 'children',
      checkStrictly,
      multiple,
    }"
    @change="_handleChange"
    @visible-change="visibleChange"
  />
</template>
<script>
import { options } from './config'
const getTreeParent = (tree, nodeId, parentIdkey, childrenKey, groupKey) => {
  if (!childrenKey) {
    childrenKey = 'children';
  }
  if (!parentIdkey) {
    parentIdkey = 'parentId';
  }
  if (!groupKey) {
    groupKey = 'groupId';
  }
  let arrRes = [];
  if (tree.length === 0) {
    if (nodeId) {
      arrRes.unshift(tree);
    }
    return arrRes;
  }
  const rev = (subTree, subNodeId) => {
    for (let i = 0, { length } = subTree; i < length; i++) {
      const node = subTree[i];
      if (node.id === subNodeId) {
        arrRes.unshift(node);
        // 如果parentId = 0, 且有分组的话，继续匹配组
        if (node[parentIdkey] === 0) { // 匹配到了区域跟节点，进一步匹配组节点
          rev(tree, node[groupKey]);
        } else {
          rev(tree, node[parentIdkey]);
        }
        break;
      } else if (node[childrenKey] && node[childrenKey].length) {
        rev(node[childrenKey], subNodeId);
      }
    }
    return arrRes;
  };
  arrRes = rev(tree, nodeId);
  return arrRes;
};
export default {
  name: 'EventTypeCascader',
  mixins: [],
  props: {
    parentType: {
      type: [Number, String],
      default: undefined
    },
    middleType: {
      type: [Number, String],
      default: undefined
    },
    childType: {
      type: [Number, String],
      default: undefined
    },
    nodeName: {
      type: String,
      default: ''
    },
    // 是否取消级联
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // 是否显示全路径
    showAllLevels: {
      type: Boolean,
      default: false
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 事件类型中是否包含隐藏项目
    showHidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      eventType: ''
    };
  },
  computed: {
    getAllEventTypes() {
      return options;
    },
  },
  watch: {
    nodeName(val) {
      // 如果事件类型清空的时候，nodeName 为空
      if (!val) {
        // 清空
        this.eventType = [];
      }
    },
  },
  created() {
    this.$nextTick(() => {
      this.updateEcho();
    });
  },
  methods: {
    updateEcho() {
      try {
        // 清空所选项，源码有 bug, 方法不能直接用
        this.$refs.cascader.$refs.panel.clearCheckedNodes();
        // 设置为空可以让节点不高亮显示
        this.$refs.cascader.$refs.panel.activePath = [];
        this.eventType = '';
      } catch (error) {
        console.log('updateEcho--error', error);
      }
      let arr = [];
      if (!this.checkStrictly) {
        // 到最后一级
        arr = getTreeParent(this.getAllEventTypes, this.childType, 'parentId', 'children');
      } else {
        // 任选一级
        const temp = this.childType || this.middleType || this.parentType;
        arr = getTreeParent(this.getAllEventTypes, temp, 'parentId', 'children');
      }
      this.eventType = arr.map((item) => item.id);
    },

    _handleChange(val) {
      const node = this.$refs.cascader.getCheckedNodes();
      console.log('node===', node);
      if (val && val.length) {
        if (val.length === 1) {
          this.$emit('update:parentType', val[0]);
          this.$emit('update:middleType', '');
          this.$emit('update:childType', '');
        } else if (val.length === 2) {
          this.$emit('update:parentType', val[0]);
          this.$emit('update:middleType', val[1]);
          this.$emit('update:childType', '');
        } else if (val.length === 3) {
          this.$emit('update:parentType', val[0]);
          this.$emit('update:middleType', val[1]);
          this.$emit('update:childType', val[2]);
        }
        this.$emit('update:nodeName', node[0].label);
      } else {
        this.$emit('update:parentType', '');
        this.$emit('update:middleType', '');
        this.$emit('update:childType', '');
      }
    },
    visibleChange(_val) {
      console.log(_val)
      this.$nextTick(() => {
        // 解决多次渲染界面卡死问题
        const $el = document.querySelectorAll('.el-cascader-panel .el-cascader-node[aria-owns]');
        Array.from($el).map((item) => item.removeAttribute('aria-owns'));
      });
    }
  }
};
</script>
