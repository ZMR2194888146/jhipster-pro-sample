import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/shared/service/user.service';

import ResourceCategoryService from '../../files//resource-category/resource-category.service';
import { IResourceCategory } from '@/shared/model/files/resource-category.model';

import { IUploadFile, UploadFile } from '@/shared/model/files/upload-file.model';
import UploadFileService from './upload-file.service';

const validations: any = {
  uploadFile: {
    id: {},
    fullName: {},
    name: {},
    ext: {},
    type: {},
    url: {},
    path: {},
    folder: {},
    entityName: {},
    createAt: {},
    fileSize: {},
    referenceCount: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class UploadFileUpdateTemplate extends Vue {
  @Inject('uploadFileService') private uploadFileService: () => UploadFileService;
  public uploadFile: IUploadFile = new UploadFile();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('resourceCategoryService') private resourceCategoryService: () => ResourceCategoryService;

  public resourceCategories: IResourceCategory[] = [];
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
  public uploadFileId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.uploadFileId) {
        vm.retrieveUploadFile(to.params.uploadFileId);
      }
    });
  }
  created(): void {
    this.initRelationships();
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.uploadFile.id) {
      this.uploadFileService()
        .update(this.uploadFile)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.filesUploadFile.updated', { param: param.id }).toString();
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.uploadFileService()
        .create(this.uploadFile)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.filesUploadFile.created', { param: param.id }).toString();
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveUploadFile(uploadFileId): void {
    this.uploadFileService()
      .find(uploadFileId)
      .then(res => {
        this.uploadFile = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.resourceCategoryService()
      .tree()
      .then(res => {
        this.resourceCategories = res.data;
      });
  }

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
