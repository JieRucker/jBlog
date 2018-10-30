<style lang="scss">
  @include b(t-tags-mdl) {
    @include b(header) {
      color: #333;
      text-align: left;
      @include m(title) {
        font-size: 16px;
      }
    }

    @include b(body) {

    }
  }
</style>

<template>
  <Modal v-model="showModal" ref="modal" width="400" class="t-tags-mdl"
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
    name: "t-tags-mdl",
    props: {
      autoClose: {
        type: Boolean,
        default: true
      },
      confirmfunc: {
        type: Function,
      }
    },
    computed: {
      modalTitle() {
        return this.$store.getters.getSource('tTagsMdl', 'first').dataSource.modalTitle
      },
      showModal() {
        return this.$store.getters.getSource('tTagsMdl', 'first').dataSource.showModal
      },
      get() {
        return this.$store.getters.getSource('tTagsMdl', 'first')
      }
    },
    data() {
      return {
        tags: {
          name: '',
          desc: ''
        }
      }
    },
    created() {
      let modalType = this.$store.getters.getSource('tTagsMdl', 'first').dataSource.modalType;
      if (modalType === 1) {
        this.tags.name = this.$store.getters.getSource('tTagsMdl', 'first').dataSource.tagsName;
        this.tags.desc = this.$store.getters.getSource('tTagsMdl', 'first').dataSource.tagsDesc;
      }
    },
    methods: {
      /**
       * 关闭弹窗
       * @param value
       */
      onVisible(value) {
        value || this.$store.dispatch('setDestroy', {
          compType: 'first',
          compName: ['tTagsMdl']
        });
      },
      async save() {
        let modalType = this.$store.getters.getSource('tTagsMdl', 'first').dataSource.modalType;
        let res;
        switch (modalType) {
          case 0:
            res = await this.$api.tagsInterface.addTags({
              tags_name: this.tags.name,
              tags_desc: this.tags.desc
            });
            break;
          case 1:
            res = await this.$api.tagsInterface.alterTags({
              _id: this.$store.getters.getSource('tTagsMdl', 'first').dataSource._id,
              tags_name: this.tags.name,
              tags_desc: this.tags.desc
            });
            break;
        }

        let {code,msg} = res.data;
        if(code === 200){
          (typeof this.confirmfunc === "function") && (this.confirmfunc.call(null, true));

          this.$refs.modal.cancel()
        }

        this.$Message.info(msg)

      }
    }
  }
</script>
