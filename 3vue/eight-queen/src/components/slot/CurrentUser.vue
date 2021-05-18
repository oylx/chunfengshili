<template>
  <span>
    <!--  绑定在 <slot> 元素上的 attribute 被称为插槽 prop-->
    <slot :user="user">{{ user.lastName }}</slot>
  </span>
</template>

<script>
export default {
  name: 'CurrentUser',
  data() {
    return {
      user: {
        firstName: 'oy',
        lastName: 'lx',
      },
    };
  },
};
</script>

<style scoped>

</style>
