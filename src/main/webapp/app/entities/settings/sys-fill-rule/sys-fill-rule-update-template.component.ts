import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import { ISysFillRule, SysFillRule } from '@/shared/model/settings/sys-fill-rule.model';
import SysFillRuleService from './sys-fill-rule.service';

const validations: any = {
  sysFillRule: {
    id: {},
    name: {},
    code: {},
    implClass: {},
    params: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class SysFillRuleUpdateTemplate extends Vue {
  @Inject('sysFillRuleService') private sysFillRuleService: () => SysFillRuleService;
  public sysFillRule: ISysFillRule = new SysFillRule();
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
  public sysFillRuleId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.sysFillRuleId) {
        vm.retrieveSysFillRule(to.params.sysFillRuleId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.sysFillRule.id) {
      this.sysFillRuleService()
        .update(this.sysFillRule)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.settingsSysFillRule.updated', { param: param.id }).toString();
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.sysFillRuleService()
        .create(this.sysFillRule)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.settingsSysFillRule.created', { param: param.id }).toString();
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveSysFillRule(sysFillRuleId): void {
    this.sysFillRuleService()
      .find(sysFillRuleId)
      .then(res => {
        this.sysFillRule = res;
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
