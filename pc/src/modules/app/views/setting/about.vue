<style lang="scss" scoped>
  .about {

  }
</style>

<template>
  <Card style="width:80%" class="about">
    <p slot="title">
      关于
    </p>
    <Form :label-width="80">
      <FormItem label="贴图">
        <Input v-model="about.picture" placeholder="请输入贴图地址"></Input>
      </FormItem>
      <FormItem label="描述">
        <Input v-model="about.description" type="textarea" :autosize="{minRows: 2}"
               placeholder="请输入描述"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="save">保存</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {
        about: {
          picture: '',
          description: ''
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        let res = await this.$api.settingInterface.getSetting();
        let {code, msg, data = {}} = res.data;
        let info = data.info;
        let about = info.about;
        if (about) this.about = about
      },
      async save() {
        let params = {
          about: JSON.stringify(this.about)
        };
        let res = await this.$api.settingInterface.alterSetting(params);
        let {code, msg, data = []} = res.data;
        return this.$Message.info(msg)
      }
    }
  }
</script>
