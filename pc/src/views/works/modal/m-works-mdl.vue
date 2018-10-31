<style lang="scss">
  @include b(m-works-mdl) {
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
  <Modal v-model="showModal" ref="modal" width="400" class="m-works-mdl"
         @on-visible-change="onVisible">
    <p slot="header" class="header">
      <span class="header--title">{{modalTitle}}</span>
    </p>
    <div class="body">
      <Form :label-width="80">
        <FormItem label="作品名称：">
          <Input v-model="works.name" placeholder="请输入作品名称"></Input>
        </FormItem>
        <FormItem label="作品描述：">
          <Input v-model="works.desc" placeholder="请输入作品描述"></Input>
        </FormItem>
        <FormItem label="作品时间：">
          <Input v-model="works.time" placeholder="请输入作品时间"></Input>
        </FormItem>
        <FormItem label="作品网址：">
          <Input v-model="works.website" placeholder="请输入作品网址"></Input>
        </FormItem>
        <FormItem label="作品封面：">
          <Input v-model="works.cover" placeholder="请输入作品封面"></Input>
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
        return this.$store.getters.getSource('mWorksMdl', 'first').dataSource.modalTitle
      },
      showModal() {
        return this.$store.getters.getSource('mWorksMdl', 'first').dataSource.showModal
      },
      get() {
        return this.$store.getters.getSource('mWorksMdl', 'first')
      }
    },
    data() {
      return {
        works: {
          name: '',
          desc: '',
          time: '',
          website: '',
          cover: '',
        }
      }
    },
    created() {
      let modalType = this.$store.getters.getSource('mWorksMdl', 'first').dataSource.modalType;
      if (modalType === 1) {
        this.works.name = this.$store.getters.getSource('mWorksMdl', 'first').dataSource.worksName;
        this.works.desc = this.$store.getters.getSource('mWorksMdl', 'first').dataSource.worksDesc;
        this.works.time = this.$store.getters.getSource('mWorksMdl', 'first').dataSource.worksTime;
        this.works.website = this.$store.getters.getSource('mWorksMdl', 'first').dataSource.worksWebsite;
        this.works.cover = this.$store.getters.getSource('mWorksMdl', 'first').dataSource.worksCover;
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
          compName: ['mWorksMdl']
        });
      },
      async save() {
        let modalType = this.$store.getters.getSource('mWorksMdl', 'first').dataSource.modalType;
        let res;
        switch (modalType) {
          case 0:
            res = await this.$api.worksInterface.addWorks({
              works_name: this.works.name,
              works_desc: this.works.desc,
              works_time: this.works.time,
              works_website: this.works.website,
              works_cover: this.works.cover
            });
            break;
          case 1:
            res = await this.$api.worksInterface.alterWorks({
              _id: this.$store.getters.getSource('mWorksMdl', 'first').dataSource._id,
              works_name: this.works.name,
              works_desc: this.works.desc,
              works_time: this.works.time,
              works_website: this.works.website,
              works_cover: this.works.cover
            });
            break;
        }

        let {code, msg} = res.data;
        if (code === 200) {
          (typeof this.confirmfunc === "function") && (this.confirmfunc.call(null, true));

          this.$refs.modal.cancel()
        }

        this.$Message.info(msg)
      }
    }
  }
</script>
