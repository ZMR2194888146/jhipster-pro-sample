import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import { ISmsConfig, SmsConfig } from '@/shared/model/files/sms-config.model';
import SmsConfigService from './sms-config.service';

const validations: any = {
  smsConfig: {
    id: {},
    provider: {},
    smsCode: {},
    templateId: {},
    accessKey: {},
    secretKey: {},
    regionId: {},
    signName: {},
    remark: {},
    enabled: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class SmsConfigUpdateTemplate extends Vue {
  @Inject('smsConfigService') private smsConfigService: () => SmsConfigService;
  public smsConfig: ISmsConfig = new SmsConfig();
  public isSaving = false;
  public loading = false;
  public formJsonData = {
    list: [],
    config: {
      layout: 'horizontal',
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      hideRequiredMark: false,
      customStyle: '',
    },
  };
  public dataFormContent = [];
  public smsConfigId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.smsConfigId) {
        vm.retrieveSmsConfig(to.params.smsConfigId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.smsConfig.id) {
      this.smsConfigService()
        .update(this.smsConfig)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.filesSmsConfig.updated', { param: param.id }).toString();
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.smsConfigService()
        .create(this.smsConfig)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.filesSmsConfig.created', { param: param.id }).toString();
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveSmsConfig(smsConfigId): void {
    this.smsConfigService()
      .find(smsConfigId)
      .then(res => {
        this.smsConfig = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}

  // ??????????????????????????????????????????????????????????????????????????????????????????
  public toTreeNode(items: any, valueFieldName: string, labelFieldName: string, currentId?: any, disabledParent: boolean = false) {
    const nzTreeNode = [];
    if (!items) {
      return nzTreeNode;
    }
    items.forEach(item => {
      let disabledChildren = false;
      const option = {
        value: item[valueFieldName],
        label: item[labelFieldName],
        disabled: disabledParent, // ????????????????????????????????????????????????????????????
        children: undefined,
      };
      if (item[valueFieldName] === currentId) {
        option.disabled = true;
        disabledChildren = true;
      }
      if (item.children && item.children.length > 0) {
        option.children = this.toTreeNode(item.children, valueFieldName, labelFieldName, currentId, disabledChildren);
      }
      nzTreeNode.push(option);
    });
    console.log(nzTreeNode);
    return nzTreeNode;
  }
}
