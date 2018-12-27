<style lang="scss">
  @include b(m-tags-mdl) {
    @include b(header) {
      color: #333;
      text-align: left;
      @include m(title) {
        font-size: 16px;
      }
    }
  }
</style>

<template>
  <Modal v-model="show" ref="modal" width="400" class="m-tags-mdl"
         @on-visible-change="onVisible">
    <p slot="header" class="header">
      <span class="header--title">{{modalTitle}}</span>
    </p>
    <div class="body">
      <Form :label-width="80">
        <FormItem label="标签名称：">
          <Input v-model="tags.name" placeholder="请输入标签名称"></Input>
        </FormItem>
        <FormItem label="标签描述：">
          <Input v-model="tags.desc" placeholder="请输入标签描述"></Input>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="text" size="large" @click.native="$refs.modal.cancel()">取消</Button>
      <Button type="primary" size="large" @click.native="save">确定</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "m-tags-mdl",
    data() {
      return {
        show: true,
        modalType: 0,
        modalTitle: '新建标签',
        tags: {
          _id: '',
          name: '',
          desc: ''
        }
      }
    },
    methods: {
      /**
       * 关闭弹窗
       * @param value
       */
      onVisible(value) {
        value || this.$jDynamic.hide({component: 'mTagsMdl'})
      },
      async save() {
        let res;
        switch (this.modalType) {
          case 0:
            res = await this.$api.tagsInterface.addTags({
              tags_name: this.tags.name,
              tags_desc: this.tags.desc
            });
            break;
          case 1:
            res = await this.$api.tagsInterface.alterTags({
              _id: this.tags._id,
              tags_name: this.tags.name,
              tags_desc: this.tags.desc
            });
            break;
        }

        let {code, msg} = res.data;
        if (code === 200) {
          (typeof this.confirmfunc === "function") && (this.confirmfunc.call(null, true));
          this.onVisible(false);
        }

        this.$Message.info(msg)
      }
    }
  }
</script>
