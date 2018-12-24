<template>
  <Card style="width:80%;" class="upyun">
    <p slot="title">
      upyun
    </p>
    <Form :label-width="110">
      <FormItem label="BUCKET">
        <Input v-model="upyun_cos.bucket" placeholder="请输入BUCKET"></Input>
      </FormItem>
      <FormItem label="OPERATORNAME">
        <Input v-model="upyun_cos.operatorname" placeholder="请输入OPERATORNAME"></Input>
      </FormItem>
      <FormItem label="OPERATORPWD">
        <Input v-model="upyun_cos.operatorpwd" placeholder="请输入OPERATORPWD"></Input>
      </FormItem>
      <FormItem label="ENDPOINT">
        <Input v-model="upyun_cos.endpoint" placeholder="请输入ENDPOINT"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="save">保存</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
  export default {
    name: "upyun",
    data() {
      return {
        upyun_cos: {
          bucket: '',
          operatorname: '',
          operatorpwd: '',
          endpoint: 'v0'
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
        let upyun_cos = info.upyun_cos;
        if (upyun_cos) this.upyun_cos = upyun_cos
      },
      async save() {
        let params = {
          upyun_cos: JSON.stringify(this.upyun_cos)
        };
        let res = await this.$api.settingInterface.alterSetting(params);
        let {code, msg, data = []} = res.data;
        return this.$Message.info(msg)
      }
    }
  }
</script>
