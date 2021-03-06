import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import { IDataPermissionRule, DataPermissionRule } from '@/shared/model/system/data-permission-rule.model';
import DataPermissionRuleService from './data-permission-rule.service';

const validations: any = {
  dataPermissionRule: {
    id: {},
    permissionId: {},
    name: {},
    column: {},
    conditions: {},
    value: {},
    disabled: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class DataPermissionRuleUpdateTemplate extends Vue {
  @Inject('dataPermissionRuleService') private dataPermissionRuleService: () => DataPermissionRuleService;
  public dataPermissionRule: IDataPermissionRule = new DataPermissionRule();
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
  public dataPermissionRuleId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.dataPermissionRuleId) {
        vm.retrieveDataPermissionRule(to.params.dataPermissionRuleId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.dataPermissionRule.id) {
      this.dataPermissionRuleService()
        .update(this.dataPermissionRule)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.dataPermissionRule.updated', { param: param.id }).toString();
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.dataPermissionRuleService()
        .create(this.dataPermissionRule)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.dataPermissionRule.created', { param: param.id }).toString();
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveDataPermissionRule(dataPermissionRuleId): void {
    this.dataPermissionRuleService()
      .find(dataPermissionRuleId)
      .then(res => {
        this.dataPermissionRule = res;
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
