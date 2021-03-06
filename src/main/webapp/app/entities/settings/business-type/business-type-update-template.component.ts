import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import { IBusinessType, BusinessType } from '@/shared/model/settings/business-type.model';
import BusinessTypeService from './business-type.service';

const validations: any = {
  businessType: {
    id: {},
    name: {},
    code: {},
    description: {},
    icon: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class BusinessTypeUpdateTemplate extends Vue {
  @Inject('businessTypeService') private businessTypeService: () => BusinessTypeService;
  public businessType: IBusinessType = new BusinessType();
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
  public businessTypeId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.businessTypeId) {
        vm.retrieveBusinessType(to.params.businessTypeId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.businessType.id) {
      this.businessTypeService()
        .update(this.businessType)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.settingsBusinessType.updated', { param: param.id }).toString();
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.businessTypeService()
        .create(this.businessType)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.settingsBusinessType.created', { param: param.id }).toString();
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveBusinessType(businessTypeId): void {
    this.businessTypeService()
      .find(businessTypeId)
      .then(res => {
        this.businessType = res;
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
