<style lang="scss">
  @include b(user-group-dropdown) {
    @include b(ivu-dropdown-item) {
      padding: 0;
    }
    @include b(checkbox) {
      display: inline-block;
      padding: 7px 16px;
      @include e(desc) {
        margin-left: 3px;
        display: inline-block;
      }
    }
    @include b(info) {
      margin-left: 3px;
      color: #999;
      width: 120px;
      overflow: hidden;
      display: inline-block;
      vertical-align: middle;
      @include e(item) {
        margin-right: 2px;
        height: 20px;
        line-height: 20px
      }
    }
    @include b(footer) {
      text-align: right;
      margin: 5px 10px;
    }
  }
</style>

<template>
  <Dropdown trigger="custom" :visible="visible" placement="bottom-start" class="user-group-dropdown">
    <slot name="button"></slot>
    <DropdownMenu slot="list">
      <div style="width: 250px">
        <div class="ivu-dropdown-item" v-for="(item,index) in list">
          <Checkbox class="checkbox" v-model="item.selected" @click="_setChange(index)">
            <div class="checkbox__desc">
              {{item.authGroupName}}
              [{{item.authUserInfoList.length}}]
            </div>
            <div class="info">
              <div class="clearfix info__context" style="display: flex">
                <div v-for="(group,groupIndex) in item.authUserInfoList" class="info__item"
                     style="">
                  {{group.authUserName}}<span
                  v-if="groupIndex !== item.authUserInfoList.length - 1">、</span>
                </div>
                <div v-if="!item.authUserInfoList.length">空</div>
              </div>
            </div>
          </Checkbox>
        </div>
        <div style="padding: 0 15px" v-if="showSetUser">
          <a href="javascript:;" @click="_setUserGroup">新建部门</a>
        </div>
        <div class="footer">
          <Button type="default" size="small" @click="handleClose">关闭</Button>
          <Button type="primary" size="small" @click.native="handleConfirm">确定</Button>
        </div>
      </div>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
  export default {
    name: "auther-group",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: []
      },
      showSetUser: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: this.value
      }
    },
    watch: {
      value(val) {
        this.visible = val;
      },
      visible(val) {
        this.$emit('on-visible-change', val);
      },
    },
    methods: {
      _setUserGroup() {
        this.$Modal.confirm({
          title: '新建部门',
          render: (h) => {
            return h('div', [
              h('Input', {
                style: {
                  marginTop: '10px'
                },
                props: {
                  value: this.groupName,
                  placeholder: '请输入名称'
                },
                on: {
                  input: (val) => {
                    this.groupName = val;
                  }
                }
              })
            ])
          },
          onOk: () => {
            if (!this.$Global.isBlank(this.groupName)) {
              this.$api.authUserInterface.saveAuthGroup({
                authGroupName: this.groupName
              }).then(res => {
                res = res.data;
                if (res.success) {
                  this.groupName = '';
                  this.$Message.info(res.retMsg);
                  this.visible = false;
                }
              }).catch(err => console.error(err))
            } else {
              this.$Message.info('请输入名称');
            }
          },
          onCancel: () => {
            this.groupName = '';
          }
        });
      },
      _setChange(index) {
        this.list[index].selected = !this.list[index].selected;
      },
      handleClose() {
        this.visible = false;
      },
      handleConfirm() {
        this.$emit('on-confirm', this.list);
      }
    }
  }
</script>
