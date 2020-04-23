<template>
  <view class="layout-wrap">
    <navbar>
      <text slot="left" class="finish-btn" @click="onFinishInput">完成</text>
      <text slot="content">新增学习记录</text>
    </navbar>
    <view class="toolbar" @tap="onFormat">
      <view
        :class="formats.bold ? 'ql-active' : ''"
        class="iconfont icon-zitijiacu"
        data-name="bold"
      ></view>
      <view
        :class="formats.italic ? 'ql-active' : ''"
        class="iconfont icon-zitixieti"
        data-name="italic"
      ></view>
      <view
        :class="formats.underline ? 'ql-active' : ''"
        class="iconfont icon-zitixiahuaxian"
        data-name="underline"
      ></view>
      <view
        :class="formats.strike ? 'ql-active' : ''"
        class="iconfont icon-zitishanchuxian"
        data-name="strike"
      ></view>
      <view class="iconfont icon-format-header-1" data-name="header" :data-value="1"></view>
      <view
        :class="formats.align === 'left'? 'ql-active' : ''"
        class="iconfont icon-zuoduiqi"
        data-name="align"
        data-value="left"
      ></view>
      <view
        :class="formats.align === 'center' ? 'ql-active' : ''"
        class="iconfont icon-juzhongduiqi"
        data-name="align"
        data-value="center"
      ></view>
      <view
        :class="formats.align === 'right' ? 'ql-active' : ''"
        class="iconfont icon-youduiqi"
        data-name="align"
        data-value="right"
      ></view>
      <view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
      <view
        :class="formats.list === 'ordered' ? 'ql-active' : ''"
        class="iconfont icon-youxupailie"
        data-name="list"
        data-value="ordered"
      ></view>
      <view
        :class="formats.list === 'bullet' ? 'ql-active' : ''"
        class="iconfont icon-wuxupailie"
        data-name="list"
        data-value="bullet"
      ></view>
      <view class="iconfont icon-undo" @tap="onUndo"></view>
      <view class="iconfont icon-redo" @tap="onRedo"></view>
      <view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
      <view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
      <view class="iconfont icon-fengexian" @tap="onInsertDivider"></view>
    </view>
    <editor
      id="editor"
      @ready="onEditorReady"
      @catchtouchend="()=>{}"
      :style="{height: editorHeight}"
      :adjust-position="false"
    ></editor>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import recordMoudule from '@/store/modules/recordMoudule';
import navbar from '@/components/navbar';

export default Vue.extend({
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorCtx: null as any,
      formats: {} as { [key: string]: any },
      editorHeight: '100%' as string
    };
  },
  computed: {
    htmlContent() {
      return recordMoudule.record.content;
    }
  },
  onReady() {
    uni.onKeyboardHeightChange(res => {
      let keyboardHeight = res.height;
      let wHeight = this.systemInfo.windowHeight;
      this.editorHeight = wHeight - keyboardHeight - 50 + 'px';
    });
  },
  methods: {
    onFinishInput() {
      this.getContentHtml().then(res => {
        this.saveHtmlContent(res.html);
        uni.navigateBack();
      });
    },
    onFormat(e: any) {
      let { name, value } = e.target.dataset;
      if (!name) return;
      this.editorCtx.format(name, value);
      let fvalue = this.formats[name];
      if (['align'].indexOf(name as never) >= 0) {
        if (fvalue == value) {
          value = '';
        }
        this.$set(this.formats, name, value);
      } else {
        this.$set(this.formats, name, !fvalue);
      }
    },
    onUndo() {
      this.editorCtx.undo();
    },
    onRedo() {
      this.editorCtx.redo();
    },
    onInsertDivider() {
      this.editorCtx.insertDivider({
        success: function() {
          console.log('insert divider success');
        }
      });
    },
    onEditorReady(e: any) {
      uni
        .createSelectorQuery()
        .in(this)
        .select('#editor')
        .context((res: any) => {
          this.editorCtx = res.context;
          this.editorCtx.setContents({
            html: this.html
          });
        })
        .exec();
    },
    getContentHtml(): Promise<string> {
      return new Promise((resolve, reject) => {
        this.editorCtx.getContents({
          success(res: any) {
            resolve(res);
          },
          fail(err: any) {
            reject(err);
          }
        });
      });
    },
    setContentHtml(html: string) {
      this.editorCtx.setContents({
        html
      });
    },
    async saveHtmlContent(content: string) {
      let XEditor = this.$refs.XEditor as any;
      recordMoudule.setRecord({
        content
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.layout-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .finish-btn {
    color: $uni-color-blue;
  }
}
.toolbar {
  width: 100%;
  display: flex;
  overflow-x: auto;
  background: #fff;
  z-index: 10;
  .iconfont {
    font-size: 38rpx;
    padding: 10rpx 20rpx;
  }
}
editor {
  height: 100%;
  padding: 20rpx 20rpx 0 20rpx;
  overflow-y: auto;
}

.ql-active {
  color: $uni-color-blue;
}

@font-face {
  font-family: 'iconfont';
  src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/editor-icon.ttf') format('truetype');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-redo:before {
  content: '\e627';
}

.icon-undo:before {
  content: '\e633';
}

.icon-indent:before {
  content: '\eb28';
}

.icon-outdent:before {
  content: '\e6e8';
}

.icon-fontsize:before {
  content: '\e6fd';
}

.icon-format-header-1:before {
  content: '\e860';
}

.icon-format-header-4:before {
  content: '\e863';
}

.icon-format-header-5:before {
  content: '\e864';
}

.icon-format-header-6:before {
  content: '\e865';
}

.icon-clearup:before {
  content: '\e64d';
}

.icon-preview:before {
  content: '\e631';
}

.icon-date:before {
  content: '\e63e';
}

.icon-fontbgcolor:before {
  content: '\e678';
}

.icon-clearedformat:before {
  content: '\e67e';
}

.icon-font:before {
  content: '\e684';
}

.icon-723bianjiqi_duanhouju:before {
  content: '\e65f';
}

.icon-722bianjiqi_duanqianju:before {
  content: '\e660';
}

.icon-text_color:before {
  content: '\e72c';
}

.icon-format-header-2:before {
  content: '\e75c';
}

.icon-format-header-3:before {
  content: '\e75d';
}

.icon--checklist:before {
  content: '\e664';
}

.icon-baocun:before {
  content: '\ec09';
}

.icon-line-height:before {
  content: '\e7f8';
}

.icon-quanping:before {
  content: '\ec13';
}

.icon-direction-rtl:before {
  content: '\e66e';
}

.icon-direction-ltr:before {
  content: '\e66d';
}

.icon-selectall:before {
  content: '\e62b';
}

.icon-fuzhi:before {
  content: '\ec7a';
}

.icon-shanchu:before {
  content: '\ec7b';
}

.icon-bianjisekuai:before {
  content: '\ec7c';
}

.icon-fengexian:before {
  content: '\ec7f';
}

.icon-dianzan:before {
  content: '\ec80';
}

.icon-charulianjie:before {
  content: '\ec81';
}

.icon-charutupian:before {
  content: '\ec82';
}

.icon-wuxupailie:before {
  content: '\ec83';
}

.icon-juzhongduiqi:before {
  content: '\ec84';
}

.icon-yinyong:before {
  content: '\ec85';
}

.icon-youxupailie:before {
  content: '\ec86';
}

.icon-youduiqi:before {
  content: '\ec87';
}

.icon-zitidaima:before {
  content: '\ec88';
}

.icon-xiaolian:before {
  content: '\ec89';
}

.icon-zitijiacu:before {
  content: '\ec8a';
}

.icon-zitishanchuxian:before {
  content: '\ec8b';
}

.icon-zitishangbiao:before {
  content: '\ec8c';
}

.icon-zitibiaoti:before {
  content: '\ec8d';
}

.icon-zitixiahuaxian:before {
  content: '\ec8e';
}

.icon-zitixieti:before {
  content: '\ec8f';
}

.icon-zitiyanse:before {
  content: '\ec90';
}

.icon-zuoduiqi:before {
  content: '\ec91';
}

.icon-zitiyulan:before {
  content: '\ec92';
}

.icon-zitixiabiao:before {
  content: '\ec93';
}

.icon-zuoyouduiqi:before {
  content: '\ec94';
}

.icon-duigoux:before {
  content: '\ec9e';
}

.icon-guanbi:before {
  content: '\eca0';
}

.icon-shengyin_shiti:before {
  content: '\eca5';
}

.icon-Character-Spacing:before {
  content: '\e964';
}
</style>